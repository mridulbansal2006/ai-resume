export function ScoreBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const colorClass =
    score >= 80 ? "text-success" : score >= 60 ? "text-warn" : "text-danger";
  const glowClass =
    score >= 80 ? "shadow-[0_0_15px_rgba(34,197,94,0.3)] border-success/40 bg-success/5" : 
    score >= 60 ? "shadow-[0_0_15px_rgba(234,179,8,0.2)] border-warn/40 bg-warn/5" : 
    "shadow-[0_0_15px_rgba(239,68,68,0.2)] border-danger/40 bg-danger/5";
  
  const sizes = {
    sm: "text-xs px-2 py-0.5 min-w-[32px] h-6",
    md: "text-xl px-4 py-1.5 min-w-[64px] h-10",
    lg: "text-4xl px-6 py-3 min-w-[100px] h-16",
  };

  return (
    <div className={`inline-flex items-center justify-center font-mono font-black rounded-xl border backdrop-blur-md transition-all duration-300 group hover:scale-110 ${glowClass} ${colorClass} ${sizes[size]}`}>
      <span className="relative z-10">{score}%</span>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-current opacity-20 group-hover:opacity-40 transition-opacity" />
    </div>
  );
}

export function RecommendationBadge({ recommendation }: { recommendation: string }) {
  const config: Record<string, { colors: string; label: string; icon?: string }> = {
    SHORTLIST: { colors: "bg-success/10 text-success border-success/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]", label: "SHORTLIST" },
    REVIEW: { colors: "bg-warn/10 text-warn border-warn/30 shadow-[0_0_10px_rgba(234,179,8,0.1)]", label: "REVIEW" },
    REJECT: { colors: "bg-danger/10 text-danger border-danger/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]", label: "REJECT" },
    HIRE: { colors: "bg-success/10 text-success border-success/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]", label: "HIRE" },
    MAYBE: { colors: "bg-warn/10 text-warn border-warn/30 shadow-[0_0_10px_rgba(234,179,8,0.1)]", label: "MAYBE" },
    NO_HIRE: { colors: "bg-danger/10 text-danger border-danger/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]", label: "NO HIRE" },
  };
  
  const c = config[recommendation] || { colors: "bg-gray-500/10 text-gray-400 border-gray-500/30", label: recommendation };
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border backdrop-blur-sm transition-transform hover:scale-105 ${c.colors}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_5px_currentColor]" />
      {c.label}
    </span>
  );
}

export function MiniBar({ label, value, color = "bg-info" }: { label: string; value: number; color?: string }) {
  const normalizedValue = Math.max(0, Math.min(100, value));
  
  return (
    <div className="flex flex-col gap-1.5 min-w-[80px] group">
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter transition-colors group-hover:text-gray-200">{label}</span>
        <span className="text-[11px] font-mono font-bold text-gray-200">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-2/50 border border-white/5 overflow-hidden p-[1px]">
        <div 
          className={`h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_currentColor] ${color}`} 
          style={{ 
            width: `${normalizedValue}%`,
            boxShadow: `0 0 8px ${color.includes('bg-') ? '' : color}` 
          }} 
        />
      </div>
    </div>
  );
}
