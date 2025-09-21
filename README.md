# 📑 Legal Doc Demystifier

**AI-powered contract analysis made simple.**  
Upload contracts (PDF/DOCX) → get interactive timelines, clause summaries, risk tagging, and Q&A — all in one intuitive interface.

---

## ✨ Key Features

- 📂 **Upload Contracts** → PDF/DOCX files processed securely.  
- 🔍 **Smart Parsing** → Google Vertex Document AI extracts text + metadata.  
- 🧠 **Clause Understanding** → Hosted LLaMA-3 identifies clauses, obligations, risks.  
- 🗂️ **Interactive Timeline** → deadlines & obligations visualized for quick navigation.  
- 🎯 **Risk Tagging** → color-coded (Red/Yellow/Green) for potential issues.  
- 💬 **Q&A Engine** → ask questions, get safe, regulation-only answers (via RAG + Matching Engine).  
- 🔐 **Security & Compliance** → JWT auth, AI safety filter (no legal advice).  
- 📊 **Monitoring & Usage** → built-in rate limiting, billing meters, Cloud Monitoring.

---

## 🧱 Architecture

```mermaid
flowchart TD
    A[User Browser] --> B[Frontend (React + Tailwind)]
    B --> C[Backend API (FastAPI)]
    C --> D[Vertex Document AI]
    C --> E[LLaMA-3 via API Gateway]
    C --> F[Vertex Matching Engine]
    C --> G[Cloud SQL (Postgres)]
    C --> H[Cloud Storage]
    C --> I[Redis (Rate Limiting)]
    C --> J[Cloud Logging & Monitoring]
    C --> K[AI Safety Filter]
    B -->|Interactive Timeline, Viewer, Q&A| A

```
