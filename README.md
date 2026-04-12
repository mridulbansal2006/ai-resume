# RecruitAI

AI-Assisted Resume Screening & Interview Preparation Platform. A Next.js 14 App Router frontend that orchestrates 4 n8n workflows powered by Claude.

## Getting started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open http://localhost:3000

## Demo Mode

The app ships with `NEXT_PUBLIC_DEMO=true` so every flow works immediately with sample data — no n8n required. Set `NEXT_PUBLIC_DEMO=false` and `NEXT_PUBLIC_N8N_URL=<your-webhook-base-url>` to connect to real workflows.

## Pages

- `/` — Dashboard with ranked candidates, pipeline status, recruiter decisions
- `/submit` — Submit resume + job description for AI screening
- `/interview/[id]` — Mock interview chatbot powered by Claude via n8n
- `/feedback/[id]` — Structured feedback report with per-question breakdown
- `/setup` — Setup guide + connection test

## n8n Webhooks consumed

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/webhook/resume-intake` | Submit resume for screening |
| GET  | `/webhook/candidates` | Fetch ranked list |
| POST | `/webhook/update-decision` | Recruiter decision |
| POST | `/webhook/generate-interview` | Interview kit |
| POST | `/webhook/mock-interview` | Chat turn |
| POST | `/webhook/generate-feedback` | Feedback report |
# ai-resume

## Google Form & Sheet Integration

- Implemented a Google Form for collecting user input  
- Connected responses to Google Sheets for data storage  
- Automated processing using Google Apps Script  
 
Google Form Link: (https://forms.gle/YpQw6ufxWp6g7KDH8)  
Google Sheet Link: (https://docs.google.com/spreadsheets/d/1xuo5OP1ieSX8pwMp094dbJp6zyOLqGErDyAsgSk0Uq8/edit?usp=sharing)