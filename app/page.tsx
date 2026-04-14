"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/lib/context";
import CandidateTable from "@/components/CandidateTable";
import StatsCards from "@/components/StatsCards";
import { Switch } from "@/components/ui/Switch";

type Filter = "ALL" | "SHORTLIST" | "REVIEW" | "REJECT";

export default function DashboardPage() {
  const { candidates, loadingCandidates, refreshCandidates, demoMode } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("ALL");
  const [compact, setCompact] = useState(false);

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
    <div className="space-y-10 pb-20">
      {/* ... demo mode banner ... */}
      {demoMode && (
        <div className="card border-ai/20 bg-ai/[0.03] p-4 flex items-center gap-4 animate-in">
          <div className="relative">
            <span className="flex w-3 h-3 rounded-full bg-ai animate-pulse" />
            <span className="absolute inset-0 w-3 h-3 rounded-full bg-ai animate-ping opacity-40" />
          </div>
          <div>
            <span className="text-xs text-ai font-bold uppercase tracking-widest block mb-0.5">
              Environment Restricted
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Demo mode active. Connect n8n to enable live career processing.
            </span>
          </div>
        </div>
      )}

      <header className="flex items-end justify-between gap-6 flex-wrap animate-in [animation-delay:100ms]">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tighter bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
            Talent Pipeline
          </h1>
          <p className="text-gray-500 text-sm font-medium tracking-tight">
            Managing <span className="text-gray-300 font-bold">{candidates.length}</span> active candidate profiles
          </p>
        </div>
        <div className="flex items-center gap-8 bg-white/[0.02] border border-white/[0.05] p-2 rounded-2xl backdrop-blur-md">
          <Switch checked={compact} onChange={setCompact} label="Compact View" />
          <div className="w-px h-8 bg-white/10" />
          <button
            onClick={refreshCandidates}
            disabled={loadingCandidates}
            className="btn-secondary !rounded-xl !py-2 h-10"
          >
            {loadingCandidates ? "Syncing..." : "Sync Pipeline"}
          </button>
        </div>
      </header>

      <div className="animate-in [animation-delay:200ms]">
        <StatsCards candidates={candidates} />
      </div>

      <div className="card p-5 flex items-center gap-6 flex-wrap animate-in [animation-delay:300ms]">
        <div className="flex-1 min-w-[300px] relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-accent transition-colors">
            🔍
          </div>
          <input
            className="input !pl-12 !bg-white/[0.01] !border-white/[0.05] focus:!border-accent/30"
            placeholder="Search by name or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 p-1.5 bg-black/20 rounded-xl border border-white/[0.05]">
          {chips.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === c.key
                  ? "bg-accent text-white shadow-xl shadow-accent/20"
                  : `hover:bg-white/[0.05] ${c.color || "text-gray-500 hover:text-gray-300"}`
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-in [animation-delay:400ms]">
        <CandidateTable candidates={filtered} compact={compact} />
      </div>
    </div>
  );
}
