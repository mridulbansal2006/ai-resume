"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/lib/context";
import CandidateTable from "@/components/CandidateTable";
import StatsCards from "@/components/StatsCards";

type Filter = "ALL" | "SHORTLIST" | "REVIEW" | "REJECT";

export default function DashboardPage() {
  const { candidates, loadingCandidates, refreshCandidates, demoMode } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("ALL");

  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      if (filter !== "ALL" && c.recommendation !== filter) return false;
      if (query && !c.candidate_name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [candidates, filter, query]);

  const chips: { key: Filter; label: string; color: string }[] = [
    { key: "ALL", label: "All", color: "" },
    { key: "SHORTLIST", label: "Shortlisted", color: "text-success" },
    { key: "REVIEW", label: "Review", color: "text-warn" },
    { key: "REJECT", label: "Rejected", color: "text-danger" },
  ];

  return (
    <div className="space-y-6">
      {demoMode && (
        <div className="card border-ai/30 bg-ai/5 p-3 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-ai animate-pulse" />
          <span className="text-xs text-ai font-semibold uppercase tracking-wider">
            Demo Mode
          </span>
          <span className="text-xs text-gray-400">
            Using sample data — set NEXT_PUBLIC_N8N_URL and NEXT_PUBLIC_DEMO=false to connect to your n8n workflows.
          </span>
        </div>
      )}

      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            AI-screened candidates ranked by match score
          </p>
        </div>
        <button
          onClick={refreshCandidates}
          disabled={loadingCandidates}
          className="btn-secondary"
        >
          {loadingCandidates ? "Refreshing…" : "↻ Refresh"}
        </button>
      </header>

      <StatsCards candidates={candidates} />

      <div className="card p-4 flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[240px]">
          <input
            className="input"
            placeholder="Search candidates…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5">
          {chips.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                filter === c.key
                  ? "bg-accent/15 text-accent border-accent/40"
                  : `bg-surface-2 border-border hover:border-accent/30 ${c.color || "text-gray-400"}`
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <CandidateTable candidates={filtered} />
    </div>
  );
}
