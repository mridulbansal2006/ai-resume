import type { PipelineStage as Stage } from "@/lib/types";

const stages: { key: Stage; label: string }[] = [
  { key: "screened", label: "Screened" },
  { key: "approved", label: "Approved" },
  { key: "interview_generated", label: "Interview Gen" },
  { key: "interview_done", label: "Done" },
  { key: "feedback_ready", label: "Feedback" },
];

export default function PipelineStage({ stage }: { stage: Stage }) {
  const activeIdx = stages.findIndex((s) => s.key === stage);
  return (
    <div className="flex items-center gap-1.5 p-1 bg-black/20 rounded-full border border-white/5 backdrop-blur-sm w-fit">
      {stages.map((s, i) => {
        const done = i <= activeIdx;
        const current = i === activeIdx;
        return (
          <div key={s.key} className="relative group">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                current 
                  ? "bg-accent scale-125 shadow-glow ring-2 ring-accent/30" 
                  : done 
                  ? "bg-success shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
            />
            {/* Tooltip hint */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#0d0f14] border border-white/10 rounded-md text-[8px] font-black uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-50">
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PipelineStageLabel({ stage }: { stage: Stage }) {
  const s = stages.find((x) => x.key === stage);
  return <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-gray-300 transition-colors">{s?.label || stage}</span>;
}
