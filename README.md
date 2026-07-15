# CasaLabs - Dynamic Knowledge Mapping for Your Second Brain

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-AI-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r185-000000?style=for-the-badge&logo=three.js&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**Ruang berpikir personal untuk catatan, koneksi, dan percakapan dengan Casa** — a local-first, Zettelkasten-style second brain with an AI thinking partner, voice capture, and a live knowledge graph. Built with Next.js 16, React 19, and Google Gemini.

## ✨ Features

- **Atomic Note Capture** — dump raw thoughts and let Gemini split them into atomic, well-tagged second-brain notes, following a configurable capture template
- **Voice Interface ("Casa")** — talk to Casa to create a new note, append to the active note, search existing notes, or just brainstorm — powered by a voice-intent classifier backed by Gemini
- **Knowledge Graph View** — an interactive force-directed graph (`react-force-graph-2d`) visualizing notes as nodes, connected via `[[wikilinks]]`, colored by field/domain and sized by connection density
- **3D Ambient Orb** — a Three.js/React Three Fiber orb that reflects Casa's state (idle, listening, processing, speaking, done, error)
- **Field Taxonomy Scoring** — every note is scored across a custom taxonomy (Backend, Frontend, AI Engineering, ML Engineering, DevOps, IoT, Network, Instrumentation & Automation) to visually cluster related knowledge
- **Local-First Storage** — all notes and templates are persisted in the browser via IndexedDB (`idb`), so your knowledge base works fully offline once loaded
- **Wikilink Auto-Linking** — write `[[Note Title]]` inside any note and Casa automatically resolves it into a graph connection
- **Capture Templates** — reusable prompts (e.g. "Atomic Notes", "Meeting Debrief") to control how raw input gets split into notes
- **Chat with AI** — ask Casa questions grounded in your own notes

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| 3D/Graphics | Three.js, React Three Fiber, `@react-three/drei`, `@react-three/postprocessing` |
| Graph Visualization | `react-force-graph-2d` |
| Local Storage | IndexedDB via `idb` |
| AI | Google Gemini (`gemini-2.5-flash`, falls back to `gemini-2.0-flash`) |
| Analytics | Vercel Analytics |

## 📊 How It Works

```
Voice / Text Capture
        │
        ▼
Gemini (split into atomic notes, classify voice intent)
        │
        ▼
IndexedDB (local-first storage: notes + templates)
        │
        ▼
Knowledge Graph View ── nodes = notes, edges = [[wikilinks]]
        │
        ▼
Chat / Search / Tags / Templates / Settings
```

Casa's Gemini API key is entered directly in **Settings** and used client-side to call the Gemini API — no backend server is required; everything runs in the browser.

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS)
- A [Google Gemini API key](https://ai.google.dev/) (free tier available)

### Installation

```bash
git clone https://github.com/vizartid/casa-knowledge-graph.git
cd casa-knowledge-graph
npm install
# or: pnpm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then add your Gemini API key under **Settings** to enable capture, voice, and chat features.

### Build for production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout, metadata ("Casa — Second Brain")
│   ├── page.tsx                # Entry point
│   └── globals.css
├── components/
│   ├── casa-sidebar.tsx        # Navigation: Search, Files, Graph, Chat, Tags, Templates, Settings
│   ├── casa-workspace.tsx      # Main workspace shell
│   ├── casa-orb.tsx            # 3D ambient orb reflecting Casa's state
│   ├── note-editor.tsx         # Note editing surface
│   └── casa/
│       ├── capture-view.tsx    # Raw-input capture → AI note splitting
│       ├── graph-view.tsx      # Force-directed knowledge graph
│       └── workspace-views.tsx # Search, tags, templates, settings, chat views
├── lib/casa/
│   ├── types.ts                # Note, CaptureDraft, FieldScores, CasaIntent, etc.
│   ├── db.ts                   # IndexedDB persistence (notes, templates, seed data)
│   ├── gemini.ts                # Gemini API calls: summarize, split capture, voice intent
│   ├── links.ts                # Wikilink extraction/resolution
│   └── colors.ts               # Field-taxonomy → node color blending
└── public/                     # Icons & static assets
```

## 🔐 Notes on Privacy & Storage

- All notes live in your browser's IndexedDB — nothing is sent to a server except direct calls to the Gemini API when you use AI features.
- Your Gemini API key is stored locally (in Settings) and used only for client-side requests to Google's API.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👤 Author

**Muhammad Yusuf** ([@vizartid](https://github.com/vizartid))
