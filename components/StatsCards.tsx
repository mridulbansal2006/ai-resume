import type { Candidate } from "@/lib/types";

export default function StatsCards({ candidates }: { candidates: Candidate[] }) {
  const total = candidates.length;
  const avgScore =
    total === 0 ? 0 : Math.round(candidates.reduce((a, c) => a + c.ai_score, 0) / total);
  const shortlisted = candidates.filter((c) => c.recommendation === "SHORTLIST").length;
  const completed = candidates.filter((c) => c.stage === "feedback_ready").length;

  const stats = [
    { label: "Total Candidates", value: total, color: "text-info", accent: "border-info/30" },
    { label: "Avg Score", value: avgScore, color: "text-accent", accent: "border-accent/30" },
    { label: "Shortlisted", value: shortlisted, color: "text-success", accent: "border-success/30" },
    { label: "Interviews Done", value: completed, color: "text-ai", accent: "border-ai/30" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div key={s.label} className={`card p-4 border ${s.accent}`}>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
            {s.label}
          </div>
          <div className={`font-mono text-3xl font-bold mt-1 ${s.color}`}>{s.value}</div>
        </div>
      ))}
    </div>
  );
}
