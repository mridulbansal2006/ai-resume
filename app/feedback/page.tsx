"use client";

import Link from "next/link";
import { useApp } from "@/lib/context";

export default function FeedbackIndexPage() {
  const { candidates } = useApp();
  const ready = candidates.filter((c) => c.stage === "feedback_ready" || c.stage === "interview_done");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">Feedback Reports</h1>
        <p className="text-gray-500 text-sm mt-1">
          Structured AI evaluations from completed mock interviews.
        </p>
      </header>

      {ready.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-white mb-2">No reports yet</h3>
          <p className="text-gray-400 text-sm mb-6">
            Finish a mock interview to generate a feedback report.
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
              href={`/feedback/${c.id}`}
              className="card card-hover p-5 block"
            >
              <h3 className="font-semibold text-white">{c.candidate_name}</h3>
              <p className="text-xs text-gray-500 mb-3">{c.role_applied}</p>
              <div className="text-xs text-success">→ View report</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
