export function ScoreBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const colorClass =
    score >= 80 ? "text-success" : score >= 60 ? "text-warn" : "text-danger";
  const glowClass =
    score >= 80 ? "shadow-[0_0_20px_rgba(16,185,129,0.15)] border-success/30 bg-success/5" : 
    score >= 60 ? "shadow-[0_0_20px_rgba(245,158,11,0.1)] border-warn/30 bg-warn/5" : 
    "shadow-[0_0_20px_rgba(244,63,94,0.1)] border-danger/30 bg-danger/5";
  
  const sizes = {
    sm: "text-[10px] px-2 py-0.5 min-w-[40px] h-6",
    md: "text-lg px-4 py-1.5 min-w-[70px] h-11",
    lg: "text-4xl px-8 py-4 min-w-[120px] h-20",
  };

  return (
    <div className={`inline-flex items-center justify-center font-mono font-black rounded-xl border backdrop-blur-xl transition-all duration-500 group relative hover:scale-[1.05] hover:-translate-y-0.5 ${glowClass} ${colorClass} ${sizes[size]}`}>
      <span className="relative z-10">{score}%</span>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export function RecommendationBadge({ recommendation }: { recommendation: string }) {
  const config: Record<string, { colors: string; label: string }> = {
    SHORTLIST: { colors: "bg-success/5 text-success border-success/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]", label: "SHORTLIST" },
    REVIEW: { colors: "bg-warn/5 text-warn border-warn/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]", label: "REVIEW" },
    REJECT: { colors: "bg-danger/5 text-danger border-danger/20 shadow-[0_0_15px_rgba(244,63,94,0.05)]", label: "REJECT" },
  };
  
  const c = config[recommendation] || { colors: "bg-white/5 text-gray-400 border-white/10", label: recommendation };
  
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border backdrop-blur-md transition-all duration-300 hover:border-white/20 ${c.colors}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
      {c.label}
    </span>
  );
}

export function MiniBar({ label, value, color = "bg-info" }: { label: string; value: number; color?: string }) {
  const normalizedValue = Math.max(0, Math.min(100, value));
  
  return (
    <div className="flex flex-col gap-1.5 min-w-[90px] group">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest transition-colors group-hover:text-gray-300">{label}</span>
        <span className="text-[10px] font-mono font-bold text-gray-400 group-hover:text-white transition-colors">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] overflow-hidden relative">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10 ${color}`} 
          style={{ width: `${normalizedValue}%` }} 
        />
        <div 
          className={`absolute inset-0 opacity-20 blur-sm ${color}`} 
          style={{ width: `${normalizedValue}%` }} 
        />
      </div>
    </div>
  );
}
