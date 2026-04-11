"use client";

import { useState } from "react";
import type { Candidate, RecruiterDecision } from "@/lib/types";
import CandidateRow from "./CandidateRow";
import DetailPanel from "./DetailPanel";
import { useApp } from "@/lib/context";
import { updateDecision, generateInterview } from "@/lib/api";

export default function CandidateTable({ candidates }: { candidates: Candidate[] }) {
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
      <div className="card p-12 text-center">
        <div className="text-5xl mb-4">📥</div>
        <h3 className="text-xl font-semibold text-white mb-2">No candidates yet</h3>
        <p className="text-gray-400 text-sm mb-6">
          Submit a resume to get AI-powered screening and shortlisting.
        </p>
        <a href="/submit" className="btn-primary">
          → Submit your first resume
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-border">
              <th className="py-3 px-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">#</th>
              <th className="py-3 px-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Candidate</th>
              <th className="py-3 px-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Role</th>
              <th className="py-3 px-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Level</th>
              <th className="py-3 px-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Score</th>
              <th className="py-3 px-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Rec</th>
              <th className="py-3 px-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Breakdown</th>
              <th className="py-3 px-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Pipeline</th>
              <th className="py-3 px-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Decision</th>
              <th className="py-3 px-3 text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c, i) => (
              <CandidateRow
                key={c.id}
                candidate={c}
                rank={i + 1}
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
