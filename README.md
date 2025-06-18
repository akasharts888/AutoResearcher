# 🧠 AutoResearcher

AutoResearcher is an intelligent, agentic AI system that performs **automated topic research**. You give it a research query or topic, and it plans, searches, summarizes, critiques, and reflects using multiple autonomous agents. It then returns a high-quality final report with sources.

---

## 📌 Key Features

- ✍️ Topic-based research planning
- 🌐 Web research using Tavily API
- 🧠 Hybrid memory (MongoDB + Pinecone) for contextual reuse
- 📄 Summarization with chunking and merging
- 🔁 Self-reflection and review-based improvement
- 📲 Fullstack app with React + Node.js + FastAPI
- 📚 Modular LangGraph architecture for agents

---

## 🧰 Tech Stack

| Layer         | Technology                      |
|--------------|----------------------------------|
| Frontend     | React.js, TailwindCSS, Vite      |
| Backend (API)| Node.js (middleware)             |
| LLM Layer    | Python (FastAPI + LangGraph)     |
| Memory       | MongoDB (long-term) + Pinecone   |
| Web Search   | Tavily API                       |
| LLM Provider | Groq (LLaMA3 8B)                 |

---

## 🚀 Architecture Overview


