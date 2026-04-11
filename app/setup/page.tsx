"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { testConnection, DEMO_MODE } from "@/lib/api";

const STEPS = [
  {
    title: "Import n8n workflows",
    body: "Download the 4 workflow JSON files and import them into your n8n instance (Workflows → Import from File). You need all four: Resume Screening, Interview Generation, Mock Interview, Feedback Report.",
    cmd: "n8n import:workflow --input=./n8n-workflows/",
  },
  {
    title: "Configure Claude API credential",
    body: "In n8n, add a new Header Auth credential with header name 'x-api-key' and your Anthropic API key as the value. Name it 'Claude API'.",
    cmd: "Header Auth → Name: x-api-key → Value: sk-ant-...",
  },
  {
    title: "Configure Google Sheets OAuth2",
    body: "Add a Google Sheets OAuth2 credential in n8n. Authorize it against the Google account that owns the Candidates spreadsheet.",
  },
  {
    title: "Set GOOGLE_SHEET_ID in n8n",
    body: "Open the Candidates Google Sheet, copy its ID from the URL, and set it as an environment variable (or node parameter) in n8n.",
    cmd: "GOOGLE_SHEET_ID=1AbC...xyz",
  },
  {
    title: "Set NEXT_PUBLIC_N8N_URL in .env.local",
    body: "Create .env.local at the project root with your n8n webhook base URL. Also set NEXT_PUBLIC_DEMO=false to use real data.",
    cmd: "NEXT_PUBLIC_N8N_URL=https://your-instance.app.n8n.cloud/webhook\nNEXT_PUBLIC_DEMO=false",
  },
  {
    title: "Activate all 4 workflows in n8n",
    body: "Turn on the toggle for each workflow. The app will fail webhooks until workflows are active.",
  },
];

export default function SetupPage() {
  const { n8nConnected, checkConnection } = useApp();
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<"idle" | "ok" | "fail">("idle");

  const runTest = async () => {
    setTesting(true);
    setResult("idle");
    const ok = await testConnection();
    setResult(ok ? "ok" : "fail");
    await checkConnection();
    setTesting(false);
  };

  const envUrl = process.env.NEXT_PUBLIC_N8N_URL || "(not set)";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">Setup</h1>
        <p className="text-gray-500 text-sm mt-1">
          Wire up the 4 n8n workflows behind this app.
        </p>
      </header>

      {/* Env status */}
      <div className="card p-5 space-y-3">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 font-bold">
          Environment Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div>
            <div className="text-gray-500">NEXT_PUBLIC_N8N_URL</div>
            <div className="text-gray-200 truncate">{envUrl}</div>
          </div>
          <div>
            <div className="text-gray-500">Demo Mode</div>
            <div className={DEMO_MODE ? "text-ai" : "text-success"}>
              {DEMO_MODE ? "enabled" : "disabled"}
            </div>
          </div>
          <div>
            <div className="text-gray-500">n8n Connection</div>
            <div
              className={
                n8nConnected === null
                  ? "text-gray-500"
                  : n8nConnected
                  ? "text-success"
                  : "text-danger"
              }
            >
              {n8nConnected === null ? "unknown" : n8nConnected ? "✓ connected" : "✕ offline"}
            </div>
          </div>
        </div>
        <div className="pt-3 border-t border-border flex items-center gap-3">
          <button onClick={runTest} disabled={testing} className="btn-primary">
            {testing ? "Testing…" : "→ Test connection"}
          </button>
          {result === "ok" && (
            <span className="text-success text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-success/20 text-success flex items-center justify-center">
                ✓
              </span>
              Connection successful
            </span>
          )}
          {result === "fail" && (
            <span className="text-danger text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-danger/20 text-danger flex items-center justify-center">
                ✕
              </span>
              Could not reach /webhook/candidates
            </span>
          )}
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 font-bold">
          Setup Steps
        </h2>
        {STEPS.map((step, i) => (
          <div key={i} className="card p-5 flex gap-4">
            <div className="w-8 h-8 rounded-full bg-accent/15 text-accent border border-accent/30 flex items-center justify-center font-bold flex-shrink-0 font-mono">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed">{step.body}</p>
              {step.cmd && (
                <pre className="mt-3 bg-bg border border-border rounded-lg p-3 text-xs font-mono text-info overflow-x-auto whitespace-pre-wrap">
                  {step.cmd}
                </pre>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Webhook reference */}
      <div className="card p-5">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3">
          Webhook Endpoints Expected
        </h2>
        <ul className="font-mono text-xs space-y-2">
          {[
            { method: "POST", path: "/webhook/resume-intake", desc: "Resume screening" },
            { method: "GET", path: "/webhook/candidates", desc: "Ranked list" },
            { method: "POST", path: "/webhook/update-decision", desc: "Recruiter decision" },
            { method: "POST", path: "/webhook/generate-interview", desc: "Interview kit" },
            { method: "POST", path: "/webhook/mock-interview", desc: "Chat turn" },
            { method: "POST", path: "/webhook/generate-feedback", desc: "Feedback report" },
          ].map((e) => (
            <li key={e.path} className="flex items-center gap-3">
              <span
                className={`badge border font-bold ${
                  e.method === "POST"
                    ? "bg-accent/10 text-accent border-accent/30"
                    : "bg-info/10 text-info border-info/30"
                }`}
              >
                {e.method}
              </span>
              <span className="text-gray-200">{e.path}</span>
              <span className="text-gray-500 text-[11px] ml-auto">{e.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
