import type { Candidate } from "@/lib/types";

export default function StatsCards({ candidates }: { candidates: Candidate[] }) {
  const total = candidates.length;
  const avgScore =
    total === 0 ? 0 : Math.round(candidates.reduce((a, c) => a + c.ai_score, 0) / total);
  const shortlisted = candidates.filter((c) => c.recommendation === "SHORTLIST").length;
  const completed = candidates.filter((c) => c.stage === "feedback_ready").length;

  const stats = [
    { label: "Total Pipeline", value: total, color: "text-info", icon: "👥", bg: "bg-info/5" },
    { label: "Quality Score", value: `${avgScore}%`, color: "text-accent", icon: "💎", bg: "bg-accent/5" },
    { label: "Shortlisted", value: shortlisted, color: "text-success", icon: "🔥", bg: "bg-success/5" },
    { label: "Done Interv.", value: completed, color: "text-ai", icon: "⚡", bg: "bg-ai/5" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div 
          key={s.label} 
          className="card-premium card-hover p-6 !rounded-[2.5rem] group overflow-hidden relative"
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          {/* Decorative Background Blob */}
          <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-[0.03] group-hover:opacity-10 transition-opacity duration-1000 blur-3xl ${s.bg.replace('/5', '')}`} />
          
          <div className="flex justify-between items-start mb-6">
            <div className={`w-12 h-12 rounded-2xl ${s.bg} border border-white/5 flex items-center justify-center text-xl shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
              {s.icon}
            </div>
            <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">
              Metric 0{i + 1}
            </div>
          </div>
          
          <div className="space-y-1 relative z-10">
            <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
              {s.label}
            </div>
            <div className={`font-mono text-4xl font-black tracking-tighter ${s.color} transition-all duration-500 group-hover:translate-x-1`}>
              {s.value}
            </div>
          </div>
          
          <div className="mt-6 h-1 w-full bg-white/[0.03] rounded-full overflow-hidden relative border border-white/5">
            <div className={`absolute inset-0 bg-current opacity-20 group-hover:opacity-40 transition-opacity ${s.color}`} />
            <div 
              className={`h-full bg-current rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${s.color}`} 
              style={{ width: '65%', animationDelay: `${i * 100}ms` }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
}
