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

      <header className="flex items-end justify-between gap-6 flex-wrap animate-in">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-shimmer">
            Talent Pipeline
          </h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.2em]">
            Managing <span className="text-white">{candidates.length}</span> active candidate profiles
          </p>
        </div>
        <div className="flex items-center gap-6 bg-white/[0.02] border border-white/[0.05] p-2 rounded-2xl backdrop-blur-2xl shadow-glow">
          <div className="px-4">
            <Switch checked={compact} onChange={setCompact} label="Compact" />
          </div>
          <div className="w-px h-10 bg-white/10" />
          <button
            onClick={refreshCandidates}
            disabled={loadingCandidates}
            className="btn-primary !py-2 !px-6 h-11"
          >
            {loadingCandidates ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Syncing...
              </span>
            ) : (
              "Sync Pipeline"
            )}
          </button>
        </div>
      </header>

      <div className="animate-in [animation-delay:100ms]">
        <StatsCards candidates={candidates} />
      </div>

      <div className="card-premium p-6 flex items-center gap-8 flex-wrap animate-in [animation-delay:200ms]">
        <div className="flex-1 min-w-[320px] relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-accent transition-colors duration-300 text-lg">
            🔍
          </div>
          <input
            className="input !pl-14 !bg-white/[0.01] !border-white/[0.05] focus:!border-accent/30 text-base"
            placeholder="Search by name, role or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2.5 p-1.5 bg-black/40 rounded-2xl border border-white/[0.05] backdrop-blur-xl">
          {chips.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                filter === c.key
                  ? "bg-accent text-white shadow-glow-lg scale-[1.05]"
                  : `hover:bg-white/[0.05] ${c.color || "text-gray-500 hover:text-gray-300"}`
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-in [animation-delay:300ms] overflow-hidden rounded-3xl border border-white/[0.05] shadow-glow">
        <CandidateTable candidates={filtered} compact={compact} />
      </div>
    </div>
  );
}
