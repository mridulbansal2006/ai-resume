"use client";

import Link from "next/link";
import type { Candidate, RecruiterDecision } from "@/lib/types";
import { ScoreBadge, RecommendationBadge, MiniBar } from "./ScoreBadge";
import PipelineStage from "./PipelineStage";

interface Props {
  candidate: Candidate;
  rank: number;
  onView: () => void;
  onGenerateInterview: () => void;
  onUpdateDecision: (d: RecruiterDecision) => void;
  busy?: boolean;
}

export default function CandidateRow({
  candidate,
  rank,
  onView,
  onGenerateInterview,
  onUpdateDecision,
  busy,
}: Props) {
  const c = candidate;
  const hasInterviewKit = c.stage === "interview_generated" || c.stage === "interview_done" || c.stage === "feedback_ready";
  const canStartInterview = hasInterviewKit;
  const canViewFeedback = c.stage === "feedback_ready" || c.stage === "interview_done";

  return (
    <tr className="border-b border-border hover:bg-surface-2/40 transition group">
      <td className="py-3 px-3 text-xs font-mono text-gray-500 w-12">#{rank}</td>
      <td className="py-3 px-3 min-w-[180px]">
        <button onClick={onView} className="text-left group-hover:text-accent transition">
          <div className="font-semibold text-white">{c.candidate_name}</div>
          <div className="text-[11px] text-gray-500 font-mono">{c.id}</div>
        </button>
      </td>
      <td className="py-3 px-3 text-sm text-gray-300 min-w-[160px]">{c.role_applied}</td>
      <td className="py-3 px-3">
        <span className="badge border border-border bg-surface-2 text-gray-300 font-mono">
          {c.experience_level}
        </span>
      </td>
      <td className="py-3 px-3">
        <ScoreBadge score={c.ai_score} />
      </td>
      <td className="py-3 px-3">
        <RecommendationBadge recommendation={c.recommendation} />
      </td>
      <td className="py-3 px-3">
        <div className="flex gap-2">
          <MiniBar label="Skill" value={c.skill_match} color="bg-info" />
          <MiniBar label="KW" value={c.keyword_match} color="bg-ai" />
          <MiniBar label="Exp" value={c.experience_match} color="bg-accent" />
        </div>
      </td>
      <td className="py-3 px-3">
        <PipelineStage stage={c.stage} />
      </td>
      <td className="py-3 px-3">
        <select
          value={c.recruiter_decision}
          onChange={(e) => onUpdateDecision(e.target.value as RecruiterDecision)}
          className="input text-xs py-1 min-w-[110px]"
          disabled={busy}
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="HOLD">Hold</option>
        </select>
      </td>
      <td className="py-3 px-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={onView} className="btn-ghost text-xs px-2 py-1" title="View details">
            👁 View
          </button>
          <button
            onClick={onGenerateInterview}
            disabled={busy || hasInterviewKit}
            className="btn-secondary text-xs px-2 py-1"
            title="Generate interview kit"
          >
            {hasInterviewKit ? "✓ Kit" : "Gen Interview"}
          </button>
          <Link
            href={`/interview/${c.id}`}
            className={`btn text-xs px-2 py-1 ${
              canStartInterview
                ? "bg-ai/15 text-ai border border-ai/30 hover:bg-ai/25"
                : "opacity-40 pointer-events-none bg-surface-2 text-gray-500 border border-border"
            }`}
          >
            Start
          </Link>
          <Link
            href={`/feedback/${c.id}`}
            className={`btn text-xs px-2 py-1 ${
              canViewFeedback
                ? "bg-success/15 text-success border border-success/30 hover:bg-success/25"
                : "opacity-40 pointer-events-none bg-surface-2 text-gray-500 border border-border"
            }`}
          >
            Feedback
          </Link>
        </div>
      </td>
    </tr>
  );
}
