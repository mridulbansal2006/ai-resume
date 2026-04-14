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
    <tr className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-all duration-300 group relative ${compact ? 'py-1' : 'py-4'}`}>
      <td className={`${compact ? 'py-2' : 'py-4'} px-4 text-[10px] font-mono text-gray-600 w-12 opacity-40 group-hover:opacity-100 transition-opacity`}>#{rank}</td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-4 min-w-[200px]`}>
        <button onClick={onView} className="text-left group/name transition-all">
          <div className={`${compact ? 'text-sm' : 'text-base'} font-black text-gray-200 group-hover/name:text-accent group-hover/name:translate-x-1 transition-all duration-300 flex items-center gap-2`}>
            {c.candidate_name}
          </div>
          {!compact && (
            <div className="text-[9px] text-gray-600 font-black mt-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              ID: {c.id.slice(0, 8)}...
            </div>
          )}
        </button>
      </td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-4 min-w-[160px]`}>
        <div className="flex flex-col">
          <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-300 font-bold tracking-tight`}>{c.role_applied}</span>
          <span className="text-[9px] uppercase tracking-[0.1em] text-gray-600 font-black mt-1">{c.experience_level}</span>
        </div>
      </td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-4`}>
        <ScoreBadge score={c.ai_score} size={compact ? "sm" : "md"} />
      </td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-4`}>
        <RecommendationBadge recommendation={c.recommendation} />
      </td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-4`}>
        <div className={`flex ${compact ? 'gap-2' : 'gap-4'}`}>
          <MiniBar label="Skill" value={c.skill_match} color="bg-info" />
          <MiniBar label="Match" value={c.keyword_match} color="bg-accent" />
          {!compact && <MiniBar label="Exp" value={c.experience_match} color="bg-ai" />}
        </div>
      </td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-4`}>
        <PipelineStage stage={c.stage} />
      </td>
      <td className={`${compact ? 'py-1' : 'py-4'} px-4`}>
        <select
          value={c.recruiter_decision}
          onChange={(e) => onUpdateDecision(e.target.value as RecruiterDecision)}
          className={`bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest ${compact ? 'py-1 px-2 min-w-[110px]' : 'py-2 px-3 min-w-[130px]'} focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all hover:bg-white/[0.06]`}
          disabled={busy}
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="HOLD">Hold</option>
        </select>
      </td>
      <td className={`${compact ? 'py-2' : 'py-4'} px-4`}>
        <div className={`flex items-center ${compact ? 'gap-1.5' : 'gap-2.5'} flex-wrap`}>
          {!compact && (
            <button onClick={onView} className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:border-accent/40 transition-all duration-300 hover:scale-110 active:scale-95" title="View details">
               👀
            </button>
          )}
          <button
            onClick={onGenerateInterview}
            disabled={busy || hasInterviewKit}
            className={`${compact ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 ${
              hasInterviewKit 
                ? "bg-success/5 text-success border border-success/20" 
                : "bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            {hasInterviewKit ? "Kit Ready" : "Gen Kit"}
          </button>
          <Link
            href={`/interview/${c.id}`}
            className={`${compact ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 ${
              canStartInterview
                ? "bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-white"
                : "opacity-20 pointer-events-none bg-white/[0.02] text-gray-600 border border-white/5"
            }`}
          >
            Interview
          </Link>
        </div>
      </td>
    </tr>
  );
}
