import type { Candidate, InterviewKit, FeedbackReport } from "./types";

export const demoCandidates: Candidate[] = [
  {
    id: "c1",
    candidate_name: "Aarav Sharma",
    role_applied: "Senior Backend Engineer",
    experience_level: "Senior",
    ai_score: 87,
    skill_match: 92,
    keyword_match: 85,
    experience_match: 84,
    recommendation: "SHORTLIST",
    ai_summary:
      "8 years of distributed systems experience. Strong Go and Kafka background. Led payments platform at previous fintech.",
    ai_skills: ["Go", "Kafka", "PostgreSQL", "Kubernetes", "gRPC", "Redis"],
    ai_gaps: ["Limited frontend exposure", "No public cloud certifications"],
    ai_rationale:
      "Candidate exceeds required experience and has direct domain match with payments/fintech. Strong technical depth in message queues and distributed databases.",
    recruiter_decision: "APPROVED",
    stage: "interview_generated",
    submitted_at: "2026-04-06T10:00:00Z",
  },
  {
    id: "c2",
    candidate_name: "Priya Iyer",
    role_applied: "Frontend Engineer",
    experience_level: "Mid",
    ai_score: 76,
    skill_match: 80,
    keyword_match: 78,
    experience_match: 70,
    recommendation: "SHORTLIST",
    ai_summary:
      "4 years of React and TypeScript. Shipped design system for SaaS product. Strong accessibility focus.",
    ai_skills: ["React", "TypeScript", "Next.js", "Tailwind", "a11y", "Figma"],
    ai_gaps: ["No Next.js App Router", "Limited testing background"],
    ai_rationale:
      "Solid mid-level frontend engineer with product sensibility. Some upskilling needed on modern Next.js patterns.",
    recruiter_decision: "PENDING",
    stage: "screened",
    submitted_at: "2026-04-06T11:30:00Z",
  },
  {
    id: "c3",
    candidate_name: "Rohan Mehta",
    role_applied: "ML Engineer",
    experience_level: "Senior",
    ai_score: 64,
    skill_match: 70,
    keyword_match: 60,
    experience_match: 62,
    recommendation: "REVIEW",
    ai_summary:
      "6 years in ML. Strong research background but limited production ML pipelines. PhD in NLP.",
    ai_skills: ["Python", "PyTorch", "NLP", "Transformers", "Pandas"],
    ai_gaps: ["No MLOps experience", "Limited cloud deployment", "No feature stores"],
    ai_rationale:
      "Research-heavy profile. Would need ramp up on production ML infrastructure. Consider for research-adjacent roles.",
    recruiter_decision: "HOLD",
    stage: "screened",
    submitted_at: "2026-04-07T09:15:00Z",
  },
  {
    id: "c4",
    candidate_name: "Ananya Reddy",
    role_applied: "Senior Backend Engineer",
    experience_level: "Mid",
    ai_score: 72,
    skill_match: 75,
    keyword_match: 72,
    experience_match: 68,
    recommendation: "SHORTLIST",
    ai_summary:
      "5 years at high-growth startup. Built order management and inventory systems. Strong SQL and API design.",
    ai_skills: ["Node.js", "PostgreSQL", "AWS", "REST APIs", "TypeScript"],
    ai_gaps: ["No Go experience", "Limited Kafka exposure"],
    ai_rationale:
      "Strong mid-level profile with growth potential. Tech stack has some mismatch but fundamentals are sound.",
    recruiter_decision: "PENDING",
    stage: "feedback_ready",
    submitted_at: "2026-04-05T14:20:00Z",
  },
  {
    id: "c5",
    candidate_name: "Vikram Singh",
    role_applied: "DevOps Engineer",
    experience_level: "Junior",
    ai_score: 42,
    skill_match: 45,
    keyword_match: 40,
    experience_match: 41,
    recommendation: "REJECT",
    ai_summary:
      "1 year of experience. Familiar with Docker basics. No Kubernetes or IaC experience.",
    ai_skills: ["Docker", "Linux", "Bash"],
    ai_gaps: ["No Kubernetes", "No Terraform", "No CI/CD ownership", "Limited cloud"],
    ai_rationale:
      "Experience level below requirement. Lacks core platform engineering skills needed for the role.",
    recruiter_decision: "REJECTED",
    stage: "screened",
    submitted_at: "2026-04-04T16:00:00Z",
  },
];

export const demoInterviewKit: InterviewKit = {
  role: "Senior Backend Engineer",
  questions: [
    {
      id: "q1",
      category: "System Design",
      question:
        "Walk me through how you would design a payment processing system that handles 10,000 transactions per second with strong consistency guarantees.",
      expected_signals: ["Sharding", "Idempotency keys", "Two-phase commit vs saga", "Write-ahead logs"],
      rubric: "5: Covers idempotency, consistency model, failure modes. 3: Basic architecture. 1: Surface level.",
    },
    {
      id: "q2",
      category: "Distributed Systems",
      question:
        "Explain how you would handle exactly-once delivery semantics in a Kafka-based event pipeline.",
      expected_signals: ["Transactional producers", "Idempotent consumers", "Offset management"],
      rubric: "5: Deep understanding of Kafka internals. 3: Knows idempotency. 1: Confuses at-least-once.",
    },
    {
      id: "q3",
      category: "Coding",
      question:
        "Design a rate limiter that supports per-user and global limits. What data structures would you use?",
      expected_signals: ["Sliding window", "Token bucket", "Redis Lua scripts"],
      rubric: "5: Multiple algorithms discussed. 3: One working approach. 1: Vague ideas.",
    },
    {
      id: "q4",
      category: "Debugging",
      question:
        "You're seeing intermittent 500 errors only in production, only during peak hours. How do you investigate?",
      expected_signals: ["Structured logs", "Tracing", "Resource monitoring", "Correlation"],
      rubric: "5: Systematic approach. 3: Knows key tools. 1: Guesses blindly.",
    },
    {
      id: "q5",
      category: "Databases",
      question:
        "Your PostgreSQL query is slow. Walk me through your optimization process.",
      expected_signals: ["EXPLAIN ANALYZE", "Indexes", "Query rewriting", "Partitioning"],
      rubric: "5: Data-driven approach. 3: Knows indexes. 1: Generic advice.",
    },
    {
      id: "q6",
      category: "Behavioral",
      question:
        "Tell me about a time you made a technical decision that turned out to be wrong. What did you learn?",
      expected_signals: ["Ownership", "Reflection", "Concrete example"],
      rubric: "5: Honest, specific, growth mindset. 3: Decent story. 1: Deflects blame.",
    },
    {
      id: "q7",
      category: "Architecture",
      question:
        "How would you migrate a monolith to microservices without a full rewrite?",
      expected_signals: ["Strangler pattern", "Incremental extraction", "Contract testing"],
      rubric: "5: Pragmatic and phased. 3: Knows strangler. 1: Advocates rewrite.",
    },
    {
      id: "q8",
      category: "Leadership",
      question:
        "How do you approach mentoring junior engineers on your team?",
      expected_signals: ["Code reviews", "Pairing", "Growth frameworks"],
      rubric: "5: Shows genuine investment. 3: Basic practices. 1: Not engaged.",
    },
  ],
};

export const demoInterviewerOpeners = [
  "Hi! Thanks for making time today. Let's start with a system design question. Walk me through how you would design a payment processing system that handles 10,000 transactions per second with strong consistency guarantees.",
  "Great, that's a solid framing. Let's dig deeper — how would you handle exactly-once delivery semantics in a Kafka-based event pipeline?",
  "Let's switch gears to coding. Design a rate limiter that supports per-user and global limits. What data structures would you use?",
  "Good. Now a debugging scenario: you're seeing intermittent 500 errors only in production, only during peak hours. How do you investigate?",
  "Nice. Say your PostgreSQL query is slow — walk me through your optimization process.",
  "Let's get a bit behavioral. Tell me about a time you made a technical decision that turned out to be wrong. What did you learn?",
  "How would you migrate a monolith to microservices without a full rewrite?",
  "Last one — how do you approach mentoring junior engineers on your team?",
  "Thanks! That wraps up our session. I'll compile your feedback shortly.",
];

export const demoFeedbackReport: FeedbackReport = {
  candidate: "Aarav Sharma",
  role: "Senior Backend Engineer",
  overall_score: 82,
  recommendation: "HIRE",
  confidence: 87,
  strengths: [
    "Deep expertise in distributed systems and Kafka internals",
    "Strong systematic debugging approach",
    "Pragmatic architecture decisions informed by past incidents",
    "Clear communication and well-structured answers",
  ],
  improvements: [
    "Could improve on discussing tradeoffs of NoSQL alternatives",
    "Limited exposure to cloud-native deployment patterns",
    "Should sharpen behavioral storytelling with metrics",
  ],
  per_question: [
    { question_id: "q1", question: "Payment system at 10K TPS", score: 5, feedback: "Excellent coverage of idempotency, sharding, and failure modes." },
    { question_id: "q2", question: "Kafka exactly-once", score: 5, feedback: "Very strong — discussed transactional producers and consumer offsets accurately." },
    { question_id: "q3", question: "Rate limiter design", score: 4, feedback: "Good — mentioned both sliding window and token bucket with Redis." },
    { question_id: "q4", question: "Intermittent 500s", score: 4, feedback: "Methodical approach. Would benefit from mentioning distributed tracing explicitly." },
    { question_id: "q5", question: "Postgres query tuning", score: 4, feedback: "Strong — used EXPLAIN ANALYZE and discussed indexes and partitioning." },
    { question_id: "q6", question: "Wrong decision story", score: 3, feedback: "Decent story but lacked specific metrics. Showed ownership." },
    { question_id: "q7", question: "Monolith migration", score: 5, feedback: "Clear strangler pattern answer with phased rollout." },
    { question_id: "q8", question: "Mentoring juniors", score: 4, feedback: "Genuine investment. Mentioned pairing and code reviews." },
  ],
};
