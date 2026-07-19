# 🏏 FantasyPilot AI
### AI-Powered Fantasy Cricket Recommendation System

> **STATIFY 2.0 Hackathon Submission**

FantasyPilot AI is an AI-powered Fantasy Cricket recommendation system that leverages Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), live cricket APIs, and a custom fantasy evaluation algorithm to assist users in making informed fantasy cricket team selections.

The project follows an agent-based architecture where a LangGraph ReAct Agent intelligently utilizes multiple external tools, contextual knowledge, and a custom scoring mechanism to generate fantasy cricket recommendations.

---

# 📌 Project Overview

Fantasy cricket team selection depends on several dynamic factors such as:

- Player performance
- Recent form
- Match conditions
- Weather
- Pitch behaviour
- Injury updates
- Player availability
- Cricket knowledge and historical insights

FantasyPilot AI aims to consolidate all these factors into a single AI-powered recommendation engine capable of providing intelligent fantasy cricket insights.

---

# 🏗️ Architectural Approach

The application follows a modular AI-agent architecture.

```
                        ┌────────────────────────────┐
                        │      Next.js Frontend      │
                        └─────────────┬──────────────┘
                                      │
                                REST API Calls
                                      │
                                      ▼
                        ┌────────────────────────────┐
                        │      FastAPI Backend       │
                        └─────────────┬──────────────┘
                                      │
                                      ▼
                         LangGraph ReAct AI Agent
                                      │
            ┌──────────────┬──────────────┬──────────────┐
            │              │              │              │
            ▼              ▼              ▼              ▼
        CricAPI      Weather API      DuckDuckGo       RAG
                                          Search
            │              │              │              │
            └──────────────┴──────────────┴──────────────┘
                                      │
                                      ▼
                     Secret Recipe Fantasy Evaluation
                                      │
                                      ▼
                       Fantasy Cricket Recommendation
```

The system is designed around a tool-calling architecture where the AI Agent decides which external tools should be invoked depending on the user's request.

---

# 🤖 AI Agent Architecture

The backend uses a **LangGraph ReAct Agent** powered by **Qwen 2.5-7B Instruct**.

The agent is capable of:

- Reasoning over multiple information sources
- Calling external tools when required
- Using Retrieval-Augmented Generation (RAG)
- Combining structured API responses with contextual knowledge
- Producing intelligent fantasy cricket recommendations

---

# 📚 Retrieval-Augmented Generation (RAG)

To improve factual consistency and reduce hallucinations, the project incorporates a Retrieval-Augmented Generation (RAG) pipeline.

### RAG Components

- LangChain
- ChromaDB
- HuggingFace Embeddings
- MiniLM-L6-v2 Embedding Model
- Cricket Knowledge Base (PDF Documents)

### RAG Workflow

```
Knowledge PDFs
        │
        ▼
Document Loader
        │
        ▼
Text Splitter
        │
        ▼
Embedding Model
        │
        ▼
ChromaDB Vector Database
        │
        ▼
Retriever
        │
        ▼
Relevant Context
        │
        ▼
LLM Response Generation
```

The retrieved contextual information is supplied to the AI agent before generating recommendations.

---

# 🔌 API Integration

## CricAPI

CricAPI is integrated to obtain live cricket information.

Current integrations include:

- Upcoming Matches
- Live Matches
- Player Statistics
- Match Fantasy Performance

---

## Open-Meteo API

Weather conditions are retrieved using Open-Meteo.

Information includes:

- Temperature
- Humidity
- Rainfall
- Wind Speed
- Weather Conditions

---

## DuckDuckGo Search

DuckDuckGo Search is used for gathering real-time cricket information.

Integrated modules include:

- Cricket News
- Injury Updates
- Player Availability
- Pitch Reports

---

# 🧠 Custom Fantasy Logic

A custom fantasy evaluation algorithm, internally referred to as the **Secret Recipe**, forms the core decision-making component of the recommendation engine.

The evaluation considers multiple contextual factors including:

- Player statistics
- Recent fantasy form
- Match context
- Weather conditions
- Pitch characteristics
- Cricket knowledge retrieved through RAG

The generated evaluation is then utilized by the AI agent to support fantasy team recommendations.

---

# 💻 Technology Stack

## Frontend

- Next.js
- React
- Tailwind CSS

## Backend

- FastAPI
- Python

## AI Frameworks

- LangGraph
- LangChain
- HuggingFace
- ChromaDB

## Embedding Model

- sentence-transformers/all-MiniLM-L6-v2

## LLM

- Qwen 2.5-7B Instruct

---

# 📂 Project Structure

```
FantasyPilot-AI/
│
├── backend/
│   ├── app.py
│   ├── agent.py
│   ├── tools.py
│   ├── schemas.py
│   ├── chroma_db/
│   ├── knowledge/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── ...
│
└── README.md
```

---

# ⚙️ Local Setup & Execution

## 1. Clone the Repository

```bash
git clone https://github.com/<username>/<repository-name>.git

cd <repository-name>
```

---

## 2. Backend Setup

Create a virtual environment.

```bash
python -m venv .venv
```

Activate it.

### Windows

```powershell
.venv\Scripts\activate
```

### Linux / macOS

```bash
source .venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Create a `.env` file.

```env
HF_TOKEN=YOUR_HUGGINGFACE_TOKEN

CRIC_API_KEY=YOUR_CRICAPI_KEY
```

Run the backend.

```bash
uvicorn app:app --reload
```

---

## 3. Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

---

# 🌐 Live Deployment

### Frontend

```
<YOUR_FRONTEND_DEPLOYMENT_URL>
```

### Backend

```
<YOUR_BACKEND_DEPLOYMENT_URL>
```

---

# 🚧 Project Status

This repository represents the implementation completed during the **STATIFY 2.0 Hackathon**.

Core architectural components—including the LangGraph agent, Retrieval-Augmented Generation (RAG), API integrations, and the custom fantasy evaluation pipeline—have been developed.

Further refinement and end-to-end workflow optimization are planned as future enhancements.

---

# 🔮 Future Enhancements

- Complete end-to-end Fantasy XI recommendation workflow
- Improve AI agent orchestration
- Enhanced player squad management
- Intelligent response caching
- Support for additional fantasy cricket platforms
- Expanded cricket knowledge base
- Performance optimizations

---

# 👥 Team

**Team Name:** Stellar Stack

### Team Members

- Member 1 – AI Agent & LangGraph Integration
- Member 2 – API Tools
- Member 3 – RAG & Knowledge Base
- Member 4- Website making & Integration with Fast API

---

# 🏆 Hackathon

Submitted for **STATIFY 2.0 Hackathon**

---

# 📄 License

This repository was developed as part of the **STATIFY 2.0 Hackathon** submission.
