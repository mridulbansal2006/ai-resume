"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { submitResume } from "@/lib/api";
import type { ExperienceLevel } from "@/lib/types";

const ROLE_SUGGESTIONS = [
  "Senior Backend Engineer",
  "Frontend Engineer",
  "Full Stack Engineer",
  "ML Engineer",
  "DevOps Engineer",
  "Data Engineer",
  "Product Manager",
  "Mobile Engineer",
];

export default function SubmitPage() {
  const router = useRouter();
  const { notify, refreshCandidates } = useApp();
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [form, setForm] = useState({
    candidate_name: "",
    role_applied: "",
    experience_level: "Mid" as ExperienceLevel,
    job_description: "",
    resume_text: "",
  });

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const pasteFromClipboard = async (field: "job_description" | "resume_text") => {
    try {
      const text = await navigator.clipboard.readText();
      update(field, text);
      notify("info", "Pasted from clipboard");
    } catch {
      notify("error", "Clipboard access denied");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.candidate_name || !form.role_applied || !form.resume_text) {
      notify("warning", "Please fill in required fields");
      return;
    }
    setLoading(true);
    try {
      await submitResume(form);
      notify("success", `${form.candidate_name} submitted for screening`);
      await refreshCandidates();
      setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">Submit Resume</h1>
        <p className="text-gray-500 text-sm mt-1">
          Paste resume text and job description — Claude will score the candidate automatically.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
              Candidate Name <span className="text-danger">*</span>
            </label>
            <input
              className="input"
              value={form.candidate_name}
              onChange={(e) => update("candidate_name", e.target.value)}
              placeholder="e.g. Aarav Sharma"
              required
              disabled={loading}
            />
          </div>
          <div className="relative">
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
              Role Applied <span className="text-danger">*</span>
            </label>
            <input
              className="input"
              value={form.role_applied}
              onChange={(e) => update("role_applied", e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="e.g. Senior Backend Engineer"
              required
              disabled={loading}
            />
            {showSuggestions && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-surface-2 border border-border rounded-lg overflow-hidden z-10 shadow-xl">
                {ROLE_SUGGESTIONS.filter((r) =>
                  r.toLowerCase().includes(form.role_applied.toLowerCase())
                )
                  .slice(0, 6)
                  .map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        update("role_applied", r);
                        setShowSuggestions(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-accent/10 hover:text-accent"
                    >
                      {r}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
            Experience Level <span className="text-danger">*</span>
          </label>
          <div className="flex gap-2">
            {(["Intern", "Junior", "Mid", "Senior"] as ExperienceLevel[]).map((lvl) => (
              <button
                type="button"
                key={lvl}
                onClick={() => update("experience_level", lvl)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                  form.experience_level === lvl
                    ? "bg-accent/15 text-accent border-accent/40"
                    : "bg-surface-2 text-gray-400 border-border hover:border-accent/30"
                }`}
                disabled={loading}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold">
              Job Description
            </label>
            <button
              type="button"
              onClick={() => pasteFromClipboard("job_description")}
              className="text-xs text-info hover:text-info/80"
              disabled={loading}
            >
              📋 Paste from clipboard
            </button>
          </div>
          <textarea
            className="input font-mono text-xs leading-relaxed"
            rows={4}
            value={form.job_description}
            onChange={(e) => update("job_description", e.target.value)}
            placeholder="Paste the full job description here…"
            disabled={loading}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold">
              Resume Text <span className="text-danger">*</span>
            </label>
            <button
              type="button"
              onClick={() => pasteFromClipboard("resume_text")}
              className="text-xs text-info hover:text-info/80"
              disabled={loading}
            >
              📋 Paste from clipboard
            </button>
          </div>
          <textarea
            className="input font-mono text-xs leading-relaxed"
            rows={10}
            value={form.resume_text}
            onChange={(e) => update("resume_text", e.target.value)}
            placeholder="Paste the candidate's resume as plain text…"
            required
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Link href="/" className="btn-ghost text-sm">
            ← Cancel
          </Link>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Screening with Claude…
              </>
            ) : (
              "→ Submit for AI screening"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
