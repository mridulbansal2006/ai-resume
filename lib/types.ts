export type ExperienceLevel = "Intern" | "Junior" | "Mid" | "Senior";

export type Recommendation = "SHORTLIST" | "REVIEW" | "REJECT";
export type HireRecommendation = "HIRE" | "MAYBE" | "NO_HIRE";
export type RecruiterDecision = "PENDING" | "APPROVED" | "REJECTED" | "HOLD";

export type PipelineStage =
  | "screened"
  | "approved"
  | "interview_generated"
  | "interview_done"
  | "feedback_ready";

export interface ResumeSubmission {
  candidate_name: string;
  role_applied: string;
  experience_level: ExperienceLevel;
  job_description: string;
  resume_text: string;
}

export interface Candidate {
  id: string;
  candidate_name: string;
  role_applied: string;
  experience_level: ExperienceLevel;
  ai_score: number;
  skill_match: number;
  keyword_match: number;
  experience_match: number;
  recommendation: Recommendation;
  ai_summary: string;
  ai_skills: string[];
  ai_gaps: string[];
  ai_rationale: string;
  recruiter_decision: RecruiterDecision;
  stage: PipelineStage;
  interview_kit?: InterviewKit;
  submitted_at: string;
}

export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  expected_signals: string[];
  rubric: string;
}

export interface InterviewKit {
  role: string;
  questions: InterviewQuestion[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface MockInterviewRequest {
  candidate_id: string;
  role: string;
  interview_kit: InterviewKit;
  session_history: ChatMessage[];
}

export interface MockInterviewResponse {
  reply: string;
}

export interface FeedbackRequest {
  candidate_name: string;
  role: string;
  transcript: string;
}

export interface PerQuestionFeedback {
  question_id: string;
  question?: string;
  answer?: string;
  score: number;
  feedback: string;
}

export interface FeedbackReport {
  candidate: string;
  role: string;
  per_question: PerQuestionFeedback[];
  overall_score: number;
  strengths: string[];
  improvements: string[];
  recommendation: HireRecommendation;
  confidence: number;
}

export interface FeedbackResponse {
  report: FeedbackReport;
}

export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
}
