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
    <div className="flex items-center gap-1">
      {stages.map((s, i) => {
        const done = i <= activeIdx;
        const current = i === activeIdx;
        return (
          <div key={s.key} className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                current ? "bg-accent ring-2 ring-accent/30" : done ? "bg-success" : "bg-surface-2 border border-border"
              }`}
              title={s.label}
            />
            {i < stages.length - 1 && (
              <div className={`w-3 h-px ${done && i < activeIdx ? "bg-success" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function PipelineStageLabel({ stage }: { stage: Stage }) {
  const s = stages.find((x) => x.key === stage);
  return <span className="text-[10px] uppercase tracking-wider text-gray-500">{s?.label || stage}</span>;
}
