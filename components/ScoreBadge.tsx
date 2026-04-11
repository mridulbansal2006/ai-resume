export function ScoreBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const color =
    score > 70 ? "text-success" : score >= 50 ? "text-warn" : "text-danger";
  const bg =
    score > 70 ? "bg-success/10 border-success/30" : score >= 50 ? "bg-warn/10 border-warn/30" : "bg-danger/10 border-danger/30";
  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-lg px-3 py-1",
    lg: "text-3xl px-4 py-2",
  };
  return (
    <div className={`inline-flex items-center font-mono font-bold rounded-lg border ${bg} ${color} ${sizes[size]}`}>
      {score}
    </div>
  );
}

export function RecommendationBadge({ recommendation }: { recommendation: string }) {
  const config: Record<string, { bg: string; label: string }> = {
    SHORTLIST: { bg: "bg-success/15 text-success border-success/30", label: "SHORTLIST" },
    REVIEW: { bg: "bg-warn/15 text-warn border-warn/30", label: "REVIEW" },
    REJECT: { bg: "bg-danger/15 text-danger border-danger/30", label: "REJECT" },
    HIRE: { bg: "bg-success/15 text-success border-success/30", label: "HIRE" },
    MAYBE: { bg: "bg-warn/15 text-warn border-warn/30", label: "MAYBE" },
    NO_HIRE: { bg: "bg-danger/15 text-danger border-danger/30", label: "NO HIRE" },
  };
  const c = config[recommendation] || { bg: "bg-gray-500/15 text-gray-400 border-gray-500/30", label: recommendation };
  return <span className={`badge border ${c.bg}`}>{c.label}</span>;
}

export function MiniBar({ label, value, color = "bg-info" }: { label: string; value: number; color?: string }) {
  return (
    <div className="flex flex-col gap-1 min-w-[70px]">
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-gray-500 uppercase tracking-wider">{label}</span>
        <span className="text-[10px] font-mono text-gray-300">{value}</span>
      </div>
      <div className="progress-bar">
        <div className={`progress-fill ${color}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}
