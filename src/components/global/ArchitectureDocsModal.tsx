import React, { useState } from 'react';
import {
  X,
  BookOpen,
  FileText,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Terminal,
  Sparkles,
  ArrowRight,
  Code2,
  Workflow,
  Globe,
  Award,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ArchitectureDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

export const ArchitectureDocsModal: React.FC<ArchitectureDocsModalProps> = ({
  isOpen,
  onClose,
  isDarkMode = true,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sdlc' | 'architecture' | 'apis' | 'ieee'>('overview');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border border-slate-300 dark:border-slate-700/80 bg-white dark:bg-[#0c1017] shadow-2xl overflow-hidden text-slate-800 dark:text-slate-200 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  Engineering Specs
                </span>
                <span className="font-mono text-xs text-slate-400">v2.4.0 · Production Ready</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-0.5">
                Architecture & System Documentation
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#sdlc"
              onClick={onClose}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-mono font-medium transition-colors"
            >
              <span>View 6-Phase SDLC</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
              aria-label="Close Documentation Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 py-2.5 border-b border-slate-200 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-900/40 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            01. System Overview
          </button>
          <button
            onClick={() => setActiveTab('sdlc')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'sdlc'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            02. 6-Phase SDLC Workflow
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            03. Architecture & Data Flow
          </button>
          <button
            onClick={() => setActiveTab('apis')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'apis'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            04. REST APIs & Contracts
          </button>
          <button
            onClick={() => setActiveTab('ieee')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'ieee'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            05. IEEE Research Paper
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm leading-relaxed">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 space-y-3">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Flagship Project: AppendUs (AI Career Intelligence)</span>
                </span>
                <p className="text-slate-700 dark:text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                  AppendUs bridges applicant resumes and modern applicant tracking systems (ATS) using semantic vector search and Google Gemini AI. Rather than relying on simple keyword matching, it parses multi-format resumes, extracts verifiable skills, and evaluates semantic similarity against job requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1.5">
                  <span className="font-mono text-xs text-amber-500 font-semibold uppercase">Core Stack</span>
                  <div className="font-bold text-slate-900 dark:text-slate-100">React · Node.js · Express</div>
                  <p className="text-xs text-slate-500">Strict TypeScript throughout frontend and backend services.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1.5">
                  <span className="font-mono text-xs text-teal-500 font-semibold uppercase">AI & Vector Search</span>
                  <div className="font-bold text-slate-900 dark:text-slate-100">Gemini AI · pgvector</div>
                  <p className="text-xs text-slate-500">Sub-50ms cosine similarity indexing across resume chunks.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-1.5">
                  <span className="font-mono text-xs text-blue-500 font-semibold uppercase">Publication</span>
                  <div className="font-bold text-slate-900 dark:text-slate-100">IEEE Conf. 2024</div>
                  <p className="text-xs text-slate-500">Co-authored empirical research on RAG for resume alignment.</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                  Key Architectural Principles
                </h3>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-xs">Zero-PII Vector Sanitization:</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Candidate phone numbers, emails, and street addresses are stripped before any vector embedding occurs.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-xs">Grounded Prompt Assembly:</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">LLM prompts are grounded strictly with verified text excerpts, preventing AI hallucinations and false qualifications.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-xs">Deterministic Scoring Matrix:</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Mathematical normalization combines hard skill weights and semantic closeness into an auditable 0–100 match score.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sdlc' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                    Standard 6-Phase SDLC Methodology
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Clear, disciplined engineering progression without over-complicated container overhead.
                  </p>
                </div>
                <a
                  href="#sdlc"
                  onClick={onClose}
                  className="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Interactive 3D Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {[
                  {
                    num: '01',
                    name: 'Requirement',
                    color: 'text-cyan-500',
                    border: 'border-cyan-500/30',
                    summary: 'Defines user needs, acceptance criteria, and project boundaries before code is written.',
                  },
                  {
                    num: '02',
                    name: 'Planning',
                    color: 'text-amber-500',
                    border: 'border-amber-500/30',
                    summary: 'Organizes architecture, AI integration steps, task breakdowns, and milestone roadmaps.',
                  },
                  {
                    num: '03',
                    name: 'Design',
                    color: 'text-purple-500',
                    border: 'border-purple-500/30',
                    summary: 'Creates clean side-by-side UI layouts, visual match score cards, and accessible typography.',
                  },
                  {
                    num: '04',
                    name: 'Development',
                    color: 'text-blue-500',
                    border: 'border-blue-500/30',
                    summary: 'Full-stack implementation in React, Vite, Node.js, and TypeScript with Gemini API integration.',
                  },
                  {
                    num: '05',
                    name: 'Testing',
                    color: 'text-emerald-500',
                    border: 'border-emerald-500/30',
                    summary: 'Automated unit tests, integration suites, and edge case validation across file formats.',
                  },
                  {
                    num: '06',
                    name: 'Deployment',
                    color: 'text-pink-500',
                    border: 'border-pink-500/30',
                    summary: 'Live cloud release with automated git builds, fast CDN asset delivery, and secure SSL.',
                  },
                ].map((phase) => (
                  <div
                    key={phase.num}
                    className={`p-4 rounded-2xl border ${phase.border} bg-white dark:bg-slate-900/60 space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs font-bold ${phase.color}`}>
                        PHASE {phase.num}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-slate-400">
                        SDLC Block
                      </span>
                    </div>
                    <div className="font-serif text-base font-bold text-slate-900 dark:text-slate-100">
                      {phase.name}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      {phase.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                End-to-End System Data Flow
              </h3>
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-3">
                <div className="text-slate-400 font-sans text-xs">
                  [1. User Upload] (PDF / DOCX)
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;↓
                  <br />
                  [2. Text Extraction & PII Sanitizer] → [Zero-PII String Tokenizer]
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;↓
                  <br />
                  [3. Chunking & Embeddings] → [Google Gemini / Text-Embedding-004]
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;↓
                  <br />
                  [4. Vector Database] → [PostgreSQL pgvector IVFFlat Cosine Similarity Search]
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;↓
                  <br />
                  [5. Grounded Prompt Assembly] → [Gemini 1.5 Pro / Flash Model]
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;↓
                  <br />
                  [6. Deterministic Score Normalization] → [JSON Payload to React Client]
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;↓
                  <br />
                  [7. Interactive Split-Screen UI] → [Radial Gauges + Highlighted Recommendations]
                </div>
              </div>
            </div>
          )}

          {activeTab === 'apis' && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                Primary API Route Specifications
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">
                      POST
                    </span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">/api/v1/resume/parse</span>
                  </div>
                  <p className="font-sans text-xs text-slate-600 dark:text-slate-400">
                    Uploads multi-format resume documents, sanitizes candidate PII, and returns structured entity JSON.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold">
                      POST
                    </span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">/api/v1/resume/evaluate</span>
                  </div>
                  <p className="font-sans text-xs text-slate-600 dark:text-slate-400">
                    Runs cosine similarity vector evaluation and returns semantic match score, strengths, and missing requirements.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-600 dark:text-purple-400 font-bold">
                      GET
                    </span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold">/api/v1/health</span>
                  </div>
                  <p className="font-sans text-xs text-slate-600 dark:text-slate-400">
                    Production health probe checking database connectivity and API uptime.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ieee' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>IEEE Conference Publication</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100">
                  "Evaluating Retrieval-Augmented Generation for Automated Resume Screening and Candidate Feedback"
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  Published in IEEE International Conference on Smart Computing and Systems (2024). Authored by Gummaraju Jaswanth Abhiram and research advisors at Mohan Babu University.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    Peer-Reviewed
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    IEEE Xplore Indexed
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60 font-mono text-xs">
          <div className="text-slate-500 dark:text-slate-400">
            Author: <span className="font-semibold text-slate-900 dark:text-slate-100">Gummaraju Jaswanth Abhiram</span> · Mohan Babu University
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub Repos</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
