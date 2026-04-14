"use client";

import { useState } from "react";
import type { Candidate, RecruiterDecision } from "@/lib/types";
import CandidateRow from "./CandidateRow";
import DetailPanel from "./DetailPanel";
import { useApp } from "@/lib/context";
import { updateDecision, generateInterview } from "@/lib/api";

export default function CandidateTable({ 
  candidates, 
  compact = false 
}: { 
  candidates: Candidate[]; 
  compact?: boolean; 
}) {
  const { refreshCandidates, notify } = useApp();
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleDecision = async (c: Candidate, decision: RecruiterDecision) => {
    setBusyId(c.id);
    try {
      await updateDecision(c.id, decision);
      notify("success", `Decision updated for ${c.candidate_name}`);
      await refreshCandidates();
    } catch (e) {
      notify("error", e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  const handleGenerateInterview = async (c: Candidate) => {
    setBusyId(c.id);
    try {
      await generateInterview(c);
      notify("success", `Interview kit generated for ${c.candidate_name}`);
      await refreshCandidates();
    } catch (e) {
      notify("error", e instanceof Error ? e.message : "Generation failed");
    } finally {
      setBusyId(null);
    }
  };

  if (candidates.length === 0) {
    return (
      <div className="card-premium p-16 text-center animate-in">
        <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-4xl mx-auto mb-6 shadow-glow transition-transform hover:scale-110 duration-500">
          📥
        </div>
        <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">Pipeline Empty</h3>
        <p className="text-gray-500 text-sm mb-8 font-bold uppercase tracking-widest">
          No candidate profiles processed yet.
        </p>
        <a href="/submit" className="btn-primary">
          → Initiate First Screening
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="card-premium overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-white/[0.04] bg-white/[0.01]">
              <th className="py-4 px-4 text-[10px] uppercase font-black tracking-[0.2em] text-gray-600">Row</th>
              <th className="py-4 px-4 text-[10px] uppercase font-black tracking-[0.2em] text-gray-600">Candidate Profiling</th>
              <th className="py-4 px-4 text-[10px] uppercase font-black tracking-[0.2em] text-gray-600">Expertise / Lv</th>
              <th className="py-4 px-4 text-[10px] uppercase font-black tracking-[0.2em] text-gray-600">AI Audit</th>
              <th className="py-4 px-4 text-[10px] uppercase font-black tracking-[0.2em] text-gray-600">Consensus</th>
              <th className="py-4 px-4 text-[10px] uppercase font-black tracking-[0.2em] text-gray-600">Metrics Breakdown</th>
              <th className="py-4 px-4 text-[10px] uppercase font-black tracking-[0.2em] text-gray-600">Workflow State</th>
              <th className="py-4 px-4 text-[10px] uppercase font-black tracking-[0.2em] text-gray-600">Executive Action</th>
              <th className="py-4 px-4 text-[10px] uppercase font-black tracking-[0.1em] text-gray-600">Operations</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c, i) => (
              <CandidateRow
                key={c.id}
                candidate={c}
                rank={i + 1}
                compact={compact}
                onView={() => setSelected(c)}
                onGenerateInterview={() => handleGenerateInterview(c)}
                onUpdateDecision={(d) => handleDecision(c, d)}
                busy={busyId === c.id}
              />
            ))}
          </tbody>
        </table>
      </div>

      <DetailPanel candidate={selected} onClose={() => setSelected(null)} />
    </>
  );
}
