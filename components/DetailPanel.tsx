"use client";

import type { Candidate } from "@/lib/types";
import { ScoreBadge, RecommendationBadge, MiniBar } from "./ScoreBadge";

export default function DetailPanel({
  candidate,
  onClose,
}: {
  candidate: Candidate | null;
  onClose: () => void;
}) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <aside className="w-full max-w-lg bg-surface border-l border-border overflow-y-auto animate-slide-in">
        <div className="p-6 border-b border-border flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
              Candidate details
            </div>
            <h2 className="text-2xl font-bold text-white mt-1 truncate">
              {candidate.candidate_name}
            </h2>
            <div className="text-sm text-gray-400 mt-1">
              {candidate.role_applied} · {candidate.experience_level}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <ScoreBadge score={candidate.ai_score} />
              <RecommendationBadge recommendation={candidate.recommendation} />
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <MiniBar label="Skills" value={candidate.skill_match} color="bg-info" />
            <MiniBar label="Keywords" value={candidate.keyword_match} color="bg-ai" />
            <MiniBar label="Experience" value={candidate.experience_match} color="bg-accent" />
          </div>

          <section>
            <h3 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
              AI Summary
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">{candidate.ai_summary}</p>
          </section>

          <section>
            <h3 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
              Matched Skills
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
          </section>

          <section>
            <h3 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
              Gaps
            </h3>
            <ul className="space-y-1">
              {candidate.ai_gaps.map((g, i) => (
                <li key={i} className="text-sm text-gray-400 flex gap-2">
                  <span className="text-warn mt-0.5">•</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
              AI Rationale
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed italic border-l-2 border-ai/50 pl-3">
              {candidate.ai_rationale}
            </p>
          </section>

          <section>
            <h3 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
              Metadata
            </h3>
            <dl className="text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <dt className="text-gray-500">ID</dt>
                <dd className="text-gray-300">{candidate.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Submitted</dt>
                <dd className="text-gray-300">
                  {new Date(candidate.submitted_at).toLocaleString()}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Stage</dt>
                <dd className="text-gray-300">{candidate.stage}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Decision</dt>
                <dd className="text-gray-300">{candidate.recruiter_decision}</dd>
              </div>
            </dl>
          </section>
        </div>
      </aside>
    </div>
  );
}
