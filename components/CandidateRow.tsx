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
  compact?: boolean;
}

export default function CandidateRow({
  candidate,
  rank,
  onView,
  onGenerateInterview,
  onUpdateDecision,
  busy,
  compact = false,
}: Props) {
  const c = candidate;
  const hasInterviewKit = c.stage === "interview_generated" || c.stage === "interview_done" || c.stage === "feedback_ready";
  const canStartInterview = hasInterviewKit;
  const canViewFeedback = c.stage === "feedback_ready" || c.stage === "interview_done";

  return (
    <tr className={`border-b border-border/50 hover:bg-white/[0.02] transition-colors group relative ${compact ? 'py-1' : 'py-4'}`}>
      <td className={`${compact ? 'py-2' : 'py-4'} px-3 text-xs font-mono text-gray-500 w-12 opacity-50 group-hover:opacity-100 transition-opacity`}>#{rank}</td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-3 min-w-[200px]`}>
        <button onClick={onView} className="text-left group transition-all">
          <div className={`${compact ? 'text-xs' : 'text-sm'} font-bold text-gray-100 group-hover:text-accent group-hover:translate-x-1 transition-all flex items-center gap-2`}>
            {c.candidate_name}
          </div>
          {!compact && <div className="text-[10px] text-gray-600 font-mono mt-0.5 uppercase tracking-tighter">{c.id}</div>}
        </button>
      </td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-3 min-w-[160px]`}>
        <div className="flex flex-col">
          <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-400 font-medium`}>{c.role_applied}</span>
          <span className="text-[9px] uppercase tracking-wider text-gray-600 font-bold mt-0.5">{c.experience_level}</span>
        </div>
      </td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-3`}>
        <ScoreBadge score={c.ai_score} size={compact ? "sm" : "md"} />
      </td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-3`}>
        <RecommendationBadge recommendation={c.recommendation} />
      </td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-3`}>
        <div className={`flex ${compact ? 'gap-1' : 'gap-3'}`}>
          <MiniBar label="Skill" value={c.skill_match} color="bg-info" />
          <MiniBar label="Match" value={c.keyword_match} color="bg-ai" />
          {!compact && <MiniBar label="Exp" value={c.experience_match} color="bg-accent" />}
        </div>
      </td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-3`}>
        <PipelineStage stage={c.stage} />
      </td>
      <td className={`${compact ? 'py-1' : 'py-4'} px-3`}>
        <select
          value={c.recruiter_decision}
          onChange={(e) => onUpdateDecision(e.target.value as RecruiterDecision)}
          className={`bg-surface-2 border border-border rounded-lg text-[10px] ${compact ? 'py-1 px-1 min-w-[100px]' : 'py-1.5 px-2 min-w-[120px]'} focus:outline-none focus:ring-1 focus:ring-accent/40`}
          disabled={busy}
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="HOLD">Hold</option>
        </select>
      </td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-3`}>
        <div className={`flex items-center ${compact ? 'gap-1' : 'gap-2'} flex-wrap`}>
          {!compact && (
            <button onClick={onView} className="p-1.5 rounded-lg bg-surface-2 border border-border text-gray-400 hover:text-white hover:border-accent/40 transition-all hover:scale-105 active:scale-95" title="View details">
               👀
            </button>
          )}
          <button
            onClick={onGenerateInterview}
            disabled={busy || hasInterviewKit}
            className={`${compact ? 'px-2 py-1' : 'px-3 py-1.5'} rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 ${
              hasInterviewKit 
                ? "bg-success/10 text-success border border-success/30" 
                : "bg-surface-2 border border-border text-gray-300 hover:border-accent/40"
            }`}
          >
            {hasInterviewKit ? (compact ? "Kit" : "Kit Ready") : (compact ? "Gen" : "Gen Kit")}
          </button>
          <Link
            href={`/interview/${c.id}`}
            className={`${compact ? 'px-2 py-1' : 'px-3 py-1.5'} rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 ${
              canStartInterview
                ? "bg-ai/10 text-ai border border-ai/30 hover:bg-ai/20"
                : "opacity-20 pointer-events-none bg-surface-2 text-gray-500 border border-border"
            }`}
          >
            {compact ? "Int" : "Interview"}
          </Link>
          <Link
            href={`/feedback/${c.id}`}
            className={`${compact ? 'px-2 py-1' : 'px-3 py-1.5'} rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 ${
              canViewFeedback
                ? "bg-success/10 text-success border border-success/30 hover:bg-success/20"
                : "opacity-20 pointer-events-none bg-surface-2 text-gray-500 border border-border"
            }`}
          >
            {compact ? "Feed" : "Feedback"}
          </Link>
        </div>
      </td>
    </tr>
  );
}
