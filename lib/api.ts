import type {
  Candidate,
  ResumeSubmission,
  RecruiterDecision,
  InterviewKit,
  MockInterviewRequest,
  MockInterviewResponse,
  FeedbackRequest,
  FeedbackResponse,
} from "./types";
import { demoCandidates, demoInterviewKit, demoInterviewerOpeners, demoFeedbackReport } from "./demo-data";

const BASE_URL = process.env.NEXT_PUBLIC_N8N_URL || "";
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO === "true" || !BASE_URL;

const TIMEOUT_MS = 60_000;

async function fetchWithRetry(url: string, init: RequestInit, retries = 2): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (res.status === 429 && retries > 0) {
      await new Promise((r) => setTimeout(r, 3000));
      return fetchWithRetry(url, init, retries - 1);
    }
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetchWithRetry(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetchWithRetry(`${BASE_URL}${path}`, { method: "GET" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// In-memory demo store (persists across calls within a session)
let demoStore: Candidate[] = [...demoCandidates];

export async function getCandidates(): Promise<Candidate[]> {
  if (DEMO_MODE) {
    await delay(300);
    return [...demoStore].sort((a, b) => b.ai_score - a.ai_score);
  }
  const data = await apiGet<Candidate[] | { candidates: Candidate[] }>("/candidates");
  const arr = Array.isArray(data) ? data : data.candidates;
  return (arr || []).sort((a, b) => b.ai_score - a.ai_score);
}

export async function getCandidateById(id: string): Promise<Candidate | null> {
  const list = await getCandidates();
  return list.find((c) => c.id === id) || null;
}

export async function submitResume(data: ResumeSubmission): Promise<{ ok: true; id: string }> {
  if (DEMO_MODE) {
    await delay(2000);
    const id = `c${Date.now()}`;
    const score = 50 + Math.floor(Math.random() * 45);
    demoStore.unshift({
      id,
      candidate_name: data.candidate_name,
      role_applied: data.role_applied,
      experience_level: data.experience_level,
      ai_score: score,
      skill_match: score + Math.floor(Math.random() * 10 - 5),
      keyword_match: score + Math.floor(Math.random() * 10 - 5),
      experience_match: score + Math.floor(Math.random() * 10 - 5),
      recommendation: score > 70 ? "SHORTLIST" : score > 50 ? "REVIEW" : "REJECT",
      ai_summary: `Candidate ${data.candidate_name} applying for ${data.role_applied}. Auto-generated demo screening.`,
      ai_skills: ["TypeScript", "React", "Node.js", "SQL"],
      ai_gaps: ["Needs manual review"],
      ai_rationale: "Demo auto-screen. In production, Claude evaluates the resume against the JD.",
      recruiter_decision: "PENDING",
      stage: "screened",
      submitted_at: new Date().toISOString(),
    });
    return { ok: true, id };
  }
  return apiPost("/resume-intake", data);
}

export async function updateDecision(
  candidateId: string,
  decision: RecruiterDecision
): Promise<{ ok: true }> {
  if (DEMO_MODE) {
    await delay(200);
    demoStore = demoStore.map((c) =>
      c.id === candidateId
        ? { ...c, recruiter_decision: decision, stage: decision === "APPROVED" ? "approved" : c.stage }
        : c
    );
    return { ok: true };
  }
  return apiPost("/update-decision", { candidate_id: candidateId, decision });
}

export async function generateInterview(candidate: Candidate): Promise<InterviewKit> {
  if (DEMO_MODE) {
    await delay(1500);
    demoStore = demoStore.map((c) =>
      c.id === candidate.id
        ? { ...c, stage: "interview_generated", interview_kit: { ...demoInterviewKit, role: candidate.role_applied } }
        : c
    );
    return { ...demoInterviewKit, role: candidate.role_applied };
  }
  const res = await apiPost<InterviewKit>("/generate-interview", {
    candidate_name: candidate.candidate_name,
    role_applied: candidate.role_applied,
    experience_level: candidate.experience_level,
    ai_summary: candidate.ai_summary,
    ai_skills: candidate.ai_skills,
    ai_gaps: candidate.ai_gaps,
  });
  return res;
}

export async function sendInterviewMessage(
  req: MockInterviewRequest
): Promise<MockInterviewResponse> {
  if (DEMO_MODE) {
    await delay(900);
    const userTurns = req.session_history.filter((m) => m.role === "user").length;
    const idx = Math.min(userTurns, demoInterviewerOpeners.length - 1);
    return { reply: demoInterviewerOpeners[idx] };
  }
  return apiPost<MockInterviewResponse>("/mock-interview", req);
}

export async function generateFeedback(req: FeedbackRequest): Promise<FeedbackResponse> {
  if (DEMO_MODE) {
    await delay(2000);
    return {
      report: {
        ...demoFeedbackReport,
        candidate: req.candidate_name,
        role: req.role,
      },
    };
  }
  return apiPost<FeedbackResponse>("/generate-feedback", req);
}

export async function testConnection(): Promise<boolean> {
  if (DEMO_MODE) return true;
  try {
    const res = await fetchWithRetry(`${BASE_URL}/candidates`, { method: "GET" }, 0);
    return res.ok;
  } catch {
    return false;
  }
}
