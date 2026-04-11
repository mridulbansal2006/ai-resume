"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { sendInterviewMessage, generateFeedback, generateInterview } from "@/lib/api";
import type { ChatMessage as Msg, Candidate, InterviewKit } from "@/lib/types";
import ChatMessage, { TypingIndicator } from "@/components/ChatMessage";
import { ScoreBadge } from "@/components/ScoreBadge";
import { demoInterviewKit } from "@/lib/demo-data";

export default function InterviewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { candidates, notify } = useApp();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [ending, setEnding] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    const c = candidates.find((x) => x.id === id) || null;
    setCandidate(c);
  }, [id, candidates]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  // Kick off interview with opening message
  useEffect(() => {
    if (!candidate || initRef.current) return;
    initRef.current = true;
    (async () => {
      setSending(true);
      try {
        const kit: InterviewKit =
          candidate.interview_kit ||
          (await generateInterview(candidate)) ||
          { ...demoInterviewKit, role: candidate.role_applied };
        const res = await sendInterviewMessage({
          candidate_id: candidate.id,
          role: candidate.role_applied,
          interview_kit: kit,
          session_history: [],
        });
        setMessages([{ role: "assistant", content: res.reply, timestamp: new Date().toISOString() }]);
      } catch (e) {
        notify("error", e instanceof Error ? e.message : "Failed to start interview");
      } finally {
        setSending(false);
      }
    })();
  }, [candidate, notify]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !candidate || sending) return;
    const userMsg: Msg = { role: "user", content: input.trim(), timestamp: new Date().toISOString() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const kit: InterviewKit =
        candidate.interview_kit || { ...demoInterviewKit, role: candidate.role_applied };
      const res = await sendInterviewMessage({
        candidate_id: candidate.id,
        role: candidate.role_applied,
        interview_kit: kit,
        session_history: next,
      });
      setMessages([...next, { role: "assistant", content: res.reply, timestamp: new Date().toISOString() }]);
    } catch (e) {
      notify("error", e instanceof Error ? e.message : "Message failed");
    } finally {
      setSending(false);
    }
  };

  const handleEnd = async () => {
    if (!candidate) return;
    setEnding(true);
    try {
      const transcript = messages
        .map((m) => `${m.role === "user" ? "Candidate" : "Interviewer"}: ${m.content}`)
        .join("\n\n");
      await generateFeedback({
        candidate_name: candidate.candidate_name,
        role: candidate.role_applied,
        transcript,
      });
      notify("success", "Feedback report generated");
      router.push(`/feedback/${candidate.id}`);
    } catch (e) {
      notify("error", e instanceof Error ? e.message : "Failed to generate feedback");
      setEnding(false);
    }
  };

  if (!candidate) {
    return (
      <div className="card p-12 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-white mb-2">Candidate not found</h3>
        <Link href="/" className="btn-primary mt-4">
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  const userTurns = messages.filter((m) => m.role === "user").length;
  const totalQuestions = 8;
  const currentQuestion = Math.min(userTurns + 1, totalQuestions);

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col lg:flex-row gap-4">
      {/* Left: Candidate info */}
      <aside className="lg:w-[30%] flex-shrink-0 card p-5 space-y-4 overflow-y-auto">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
            Candidate
          </div>
          <h2 className="text-xl font-bold text-white mt-1">{candidate.candidate_name}</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {candidate.role_applied} · {candidate.experience_level}
          </p>
        </div>
        <div>
          <ScoreBadge score={candidate.ai_score} size="lg" />
        </div>
        <div>
          <h3 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
            Skills
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {candidate.ai_skills.map((s) => (
              <span
                key={s}
                className="badge border border-info/30 bg-info/10 text-info font-mono"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
            Summary
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">{candidate.ai_summary}</p>
        </div>
        <div className="pt-3 border-t border-border">
          <Link href="/" className="btn-ghost text-xs">
            ← Back to dashboard
          </Link>
        </div>
      </aside>

      {/* Right: Chat */}
      <section className="flex-1 card flex flex-col min-h-0">
        <header className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              Mock interview
            </div>
            <div className="text-sm text-white font-semibold">
              Question {currentQuestion} of {totalQuestions}
            </div>
            <div className="progress-bar w-48 mt-2">
              <div
                className="progress-fill bg-ai"
                style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
          <button
            onClick={handleEnd}
            disabled={ending || messages.length < 2}
            className="btn-secondary border-danger/30 text-danger hover:bg-danger/10"
          >
            {ending ? "Generating feedback…" : "End interview"}
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 min-h-0">
          {messages.map((m, i) => (
            <ChatMessage key={i} message={m} />
          ))}
          {sending && <TypingIndicator />}
        </div>

        <form
          onSubmit={handleSend}
          className="p-4 border-t border-border flex items-end gap-2"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            rows={2}
            placeholder="Type your answer… (Enter to send, Shift+Enter for newline)"
            className="input resize-none"
            disabled={sending || ending}
          />
          <button
            type="submit"
            className="btn-primary h-[44px]"
            disabled={sending || ending || !input.trim()}
          >
            Send →
          </button>
        </form>
      </section>
    </div>
  );
}
