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
      {stats.map((s) => (
        <div key={s.label} className={`card-hover card p-6 !rounded-3xl border-white/[0.05] group overflow-hidden relative ${s.bg}`}>
          <div className="absolute top-0 right-0 p-4 text-2xl opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500">
            {s.icon}
          </div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
            {s.label}
          </div>
          <div className={`font-mono text-4xl font-black mt-2 tracking-tighter ${s.color}`}>
            {s.value}
          </div>
          <div className={`absolute bottom-0 left-0 h-1 bg-current opacity-20 w-0 group-hover:w-full transition-all duration-700 ${s.color}`} />
        </div>
      ))}
    </div>
  );
}
