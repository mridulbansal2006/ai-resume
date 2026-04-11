"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { generateFeedback } from "@/lib/api";
import type { Candidate, FeedbackReport } from "@/lib/types";
import { RecommendationBadge } from "@/components/ScoreBadge";

function CircularGauge({ score }: { score: number }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444";

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#1e2230"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-mono font-bold text-white">{score}</div>
        <div className="text-[10px] uppercase tracking-wider text-gray-500">Overall</div>
      </div>
    </div>
  );
}

function QuestionCard({
  q,
}: {
  q: { question_id: string; question?: string; answer?: string; score: number; feedback: string };
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
            {q.question_id}
          </div>
          <div className="text-sm text-white font-semibold truncate">
            {q.question || "Question"}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`text-sm ${s <= q.score ? "text-warn" : "text-gray-700"}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-gray-500">{open ? "−" : "+"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border pt-3 space-y-2">
          {q.answer && (
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">
                Candidate's answer
              </div>
              <p className="text-xs text-gray-400 italic">{q.answer}</p>
            </div>
          )}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1">
              Feedback
            </div>
            <p className="text-sm text-gray-300">{q.feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FeedbackPage() {
  const params = useParams();
  const id = params.id as string;
  const { candidates, notify } = useApp();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [report, setReport] = useState<FeedbackReport | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const c = candidates.find((x) => x.id === id) || null;
    setCandidate(c);
    // Auto-load report if candidate has feedback_ready stage
    if (c && c.stage === "feedback_ready" && !report && !loading) {
      generateReport(c);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, candidates]);

  const generateReport = async (c: Candidate) => {
    setLoading(true);
    try {
      const res = await generateFeedback({
        candidate_name: c.candidate_name,
        role: c.role_applied,
        transcript: "Interview transcript placeholder",
      });
      setReport(res.report);
    } catch (e) {
      notify("error", e instanceof Error ? e.message : "Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  if (!candidate) {
    return (
      <div className="card p-12 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-white mb-2">Candidate not found</h3>
        <Link href="/" className="btn-primary mt-4">
          ← Back
        </Link>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white">Feedback Report</h1>
          <p className="text-gray-500 text-sm mt-1">{candidate.candidate_name}</p>
        </header>
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-white mb-2">No report yet</h3>
          <p className="text-gray-400 text-sm mb-6">
            Generate a feedback report using the current interview transcript.
          </p>
          <button
            onClick={() => generateReport(candidate)}
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Generating…" : "→ Generate report"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="flex items-start justify-between gap-4 no-print">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Feedback Report</h1>
          <p className="text-gray-500 text-sm mt-1">
            {report.candidate} · {report.role}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="btn-secondary">
            📄 Export PDF
          </button>
          <Link href="/" className="btn-ghost">
            ← Back
          </Link>
        </div>
      </header>

      {/* Summary */}
      <div className="card p-6 flex flex-col md:flex-row gap-6 items-center">
        <CircularGauge score={report.overall_score} />
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <RecommendationBadge recommendation={report.recommendation} />
            <span className="text-xs text-gray-500">
              Confidence:{" "}
              <span className="font-mono text-white">{report.confidence}%</span>
            </span>
          </div>
          <div className="progress-bar max-w-xs mx-auto md:mx-0">
            <div
              className="progress-fill bg-ai"
              style={{ width: `${report.confidence}%` }}
            />
          </div>
          <p className="text-sm text-gray-400">
            Structured evaluation across all {report.per_question.length} interview questions.
          </p>
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="text-xs uppercase tracking-wider text-success font-bold mb-3">
            ✓ Strengths
          </h3>
          <ul className="space-y-2">
            {report.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-300">
                <span className="text-success mt-0.5">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <h3 className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            ↑ Improvements
          </h3>
          <ul className="space-y-2">
            {report.improvements.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-300">
                <span className="text-accent mt-0.5">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Per-question */}
      <section className="space-y-3">
        <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold">
          Per-question breakdown
        </h3>
        <div className="space-y-2">
          {report.per_question.map((q) => (
            <QuestionCard key={q.question_id} q={q} />
          ))}
        </div>
      </section>
    </div>
  );
}
