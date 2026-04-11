"use client";

import Link from "next/link";
import { useApp } from "@/lib/context";

export default function InterviewIndexPage() {
  const { candidates } = useApp();
  const ready = candidates.filter(
    (c) => c.stage === "interview_generated" || c.stage === "interview_done" || c.stage === "feedback_ready"
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">Mock Interviews</h1>
        <p className="text-gray-500 text-sm mt-1">
          Select a candidate with a generated interview kit to start their mock interview.
        </p>
      </header>

      {ready.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-white mb-2">No interviews ready</h3>
          <p className="text-gray-400 text-sm mb-6">
            Generate an interview kit from the dashboard to begin.
          </p>
          <Link href="/" className="btn-primary">
            → Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ready.map((c) => (
            <Link
              key={c.id}
              href={`/interview/${c.id}`}
              className="card card-hover p-5 block"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-white">{c.candidate_name}</h3>
                  <p className="text-xs text-gray-500">{c.role_applied}</p>
                </div>
                <span className="font-mono text-lg text-accent">{c.ai_score}</span>
              </div>
              <div className="text-xs text-ai mt-4">→ Start interview</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
