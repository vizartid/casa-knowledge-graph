# CasaLabs - Dynamic Knowledge Mapping for Your Second Brain

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-AI-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r185-000000?style=for-the-badge&logo=three.js&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**A personal thinking space for notes, knowledge connections, and conversations with Casa** — a local-first, Zettelkasten-inspired second brain featuring an AI thinking partner, voice capture, and a live knowledge graph. Built with Next.js 16, React 19, and Google Gemini.

---

## ✨ Features

- **Intelligent Note Capture** — freely capture your thoughts and let Gemini automatically transform them into structured, atomic notes using configurable capture templates.
- **Voice Assistant ("Casa")** — interact naturally with Casa to create notes, append information, search your knowledge base, or brainstorm ideas using AI-powered voice intent recognition.
- **Interactive Knowledge Graph** — visualize relationships between notes through a force-directed graph (`react-force-graph-2d`), where connections are automatically created from `[[wikilinks]]`.
- **3D Ambient Orb** — an animated Three.js / React Three Fiber orb that reflects Casa's current state: idle, listening, processing, speaking, completed, or error.
- **Knowledge Domain Classification** — automatically scores notes across custom domains (Backend, Frontend, AI Engineering, ML Engineering, DevOps, IoT, Networking, and Instrumentation & Automation) for intuitive visual clustering.
- **Local-First Architecture** — stores all notes and templates locally in IndexedDB (`idb`), allowing the application to work completely offline after the initial load.
- **Automatic Wikilink Resolution** — simply write `[[Note Title]]` to create dynamic links between related notes in the knowledge graph.
- **Custom Capture Templates** — define reusable templates such as *Atomic Notes*, *Meeting Debrief*, or your own workflows to standardize knowledge capture.
- **AI-Powered Knowledge Chat** — ask questions grounded in your personal knowledge base and receive contextual responses from Casa.

---

## 🧱 Tech Stack

| Layer | Technology |
|--------|------------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| 3D Graphics | Three.js, React Three Fiber, `@react-three/drei`, `@react-three/postprocessing` |
| Knowledge Graph | `react-force-graph-2d` |
| Local Storage | IndexedDB (`idb`) |
| AI | Google Gemini (`gemini-2.5-flash`, fallback to `gemini-2.0-flash`) |
| Analytics | Vercel Analytics |

---

## 📊 Architecture Overview

```text
Voice / Text Input
        │
        ▼
Google Gemini
(Intent Recognition & Atomic Note Generation)
        │
        ▼
IndexedDB
(Local Storage: Notes + Templates)
        │
        ▼
Knowledge Graph
(Nodes = Notes, Edges = [[Wikilinks]])
        │
        ▼
Chat • Search • Tags • Templates • Settings
```

Casa operates entirely on the client side. Your Gemini API key is entered through **Settings** and used directly by the browser to communicate with Google's Gemini API—no backend server is required.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A free or paid **Google Gemini API Key**

### Clone the Repository

```bash
git clone https://github.com/vizartid/casa-knowledge-graph.git
cd casa-knowledge-graph
```

### Install Dependencies

```bash
npm install

# or

pnpm install
```

### Start the Development Server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

Then open **Settings** and add your Gemini API key to enable AI-powered note capture, voice interaction, and chat.

### Production Build

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```text
├── app/
│   ├── layout.tsx              # Root layout & metadata
│   ├── page.tsx                # Application entry point
│   └── globals.css
│
├── components/
│   ├── casa-sidebar.tsx        # Navigation (Search, Graph, Chat, Settings, etc.)
│   ├── casa-workspace.tsx      # Main workspace
│   ├── casa-orb.tsx            # 3D AI status orb
│   ├── note-editor.tsx         # Rich note editor
│   └── casa/
│       ├── capture-view.tsx    # AI-powered note capture
│       ├── graph-view.tsx      # Interactive knowledge graph
│       └── workspace-views.tsx # Chat, Search, Tags, Templates, Settings
│
├── lib/casa/
│   ├── types.ts                # Core data models
│   ├── db.ts                   # IndexedDB persistence
│   ├── gemini.ts               # Gemini integration
│   ├── links.ts                # Wikilink parser & resolver
│   └── colors.ts               # Knowledge domain color mapping
│
└── public/
    └── ...                     # Static assets & icons
```

---

## 🔐 Privacy

CasaLabs is designed with a **privacy-first, local-first** philosophy.

- All notes remain stored locally in your browser using **IndexedDB**.
- No application server stores or processes your personal knowledge.
- AI requests are sent directly from your browser to the **Google Gemini API**.
- Your Gemini API key is stored locally and is never transmitted to any third-party server other than Google's API endpoint during AI requests.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Muhammad Yusuf**

GitHub: **https://github.com/vizartid**
