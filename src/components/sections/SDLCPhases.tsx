import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileCheck,
  Kanban,
  Layout,
  Code2,
  ShieldCheck,
  CloudUpload,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  FolderGit2,
  HelpCircle,
  Wrench,
  Boxes,
  Compass,
} from 'lucide-react';
import { SDLC3DStepsStage, SDLC_SIX_PHASES } from '../3d/SDLC3DStepsStage';
import { ClassicSpotlightBackdrop } from '../global/ClassicSpotlightBackdrop';

export interface SDLCPhaseData {
  id: string;
  stepNum: string;
  name: string;
  tagline: string;
  headline: string;
  howItHelps: string;
  howIDidIt: string[];
  whereIUsedIt: Array<{ module: string; role: string }>;
  keyDeliverables: string[];
  tooling: string[];
}

export const SDLC_SIX_PHASES_DATA: SDLCPhaseData[] = [
  {
    id: 'requirement',
    stepNum: '01',
    name: 'Requirement gathering',
    headline: 'Requirement gathering',
    tagline: 'User Needs · Clear Specifications · Project Goals · Feature Scope',
    howItHelps:
      'Requirements gathering ensures a crystal-clear understanding of what needs to be built before coding begins. It defines user needs, core features, and success criteria so the team builds exactly what matters without confusion or wasted effort.',
    howIDidIt: [
      'Problem Definition: Focused on helping job seekers receive clear, actionable feedback on their resumes matched against specific job descriptions.',
      'Core Functional Needs: Outlined requirements for uploading resumes (PDF/DOCX), extracting skills, and comparing them against target job descriptions.',
      'Clear Success Criteria: Defined key milestones for response time, accurate keyword matching, and easy-to-read recommendation summaries.',
      'User Privacy Protection: Ensured user resumes are securely processed with personal contact details sanitized and kept private.',
    ],
    whereIUsedIt: [
      { module: 'specs/resume_requirements.md', role: 'Feature checklist and acceptance criteria for resume analysis' },
      { module: 'src/utils/sanitizer.ts', role: 'Input cleaning and personal details protection' },
      { module: 'src/contracts/scoringRules.ts', role: 'Clear scoring criteria comparing skills to job requirements' },
    ],
    keyDeliverables: [
      'Project requirements document and feature checklist',
      'User journey and expected input/output specifications',
      'Privacy rules ensuring sensitive user info is kept private',
      'Defined success criteria for score accuracy and fast response',
    ],
    tooling: ['Linear', 'Confluence', 'Mermaid.js', 'Postman Specs'],
  },
  {
    id: 'planning',
    stepNum: '02',
    name: 'Planning',
    headline: 'Planning',
    tagline: 'Architecture · Feature Roadmap · Milestones · Task Breakdown',
    howItHelps:
      'Planning organizes the project into structured steps, milestones, and technical choices before development starts. It keeps the project focused, on schedule, and aligned with goals.',
    howIDidIt: [
      'AI & Feature Planning: Planned the architecture for integrating Google Gemini AI and vector search to match resumes with job descriptions efficiently.',
      'Step-by-Step Roadmap: Organised project flow from file upload and text extraction to vector comparison and AI feedback generation.',
      'Resource & API Planning: Planned API usage limits, response caching, and prompt templates to ensure fast and reliable responses.',
      'Milestone Scheduling: Divided the project into achievable phases with clear deadlines for frontend, backend, and testing.',
    ],
    whereIUsedIt: [
      { module: 'docs/project_roadmap.md', role: 'Feature roadmap, architecture diagram, and task breakdown' },
      { module: 'Sprint Planning', role: 'Task priority and phased feature delivery' },
      { module: 'src/services/apiPlan.ts', role: 'API route design and request/response flow' },
    ],
    keyDeliverables: [
      'Project milestone roadmap with step-by-step feature breakdown',
      'System data flow diagram connecting frontend, backend, and AI',
      'API rate limits and response caching strategy',
      'Sprint timeline ensuring on-time project completion',
    ],
    tooling: ['Linear', 'GitHub Projects', 'Mermaid Architecture', 'Notion'],
  },
  {
    id: 'design',
    stepNum: '03',
    name: 'Designing',
    headline: 'Designing',
    tagline: 'UI/UX Layouts · Clean Components · Responsive Flow · Visual Feedback',
    howItHelps:
      'Design creates a clean, intuitive, and user-friendly interface. It ensures users can easily navigate, understand their analysis results, and take action without feeling overwhelmed.',
    howIDidIt: [
      'Clean Side-by-Side View: Designed an intuitive dual-pane layout showing the uploaded resume on one side and AI recommendations on the other.',
      'Clear Visual Indicators: Used simple, intuitive color highlights: green for matched skills, yellow for partial matches, and red for missing qualifications.',
      'Visual Score Cards: Designed easy-to-read radial score badges and progress indicators for match percentage and skill alignment.',
      'Responsive & Accessible: Ensured clean typography, high contrast, and smooth viewing on mobile, tablet, and desktop screens.',
    ],
    whereIUsedIt: [
      { module: 'src/components/ResumeViewer.tsx', role: 'Clean side-by-side resume comparison layout' },
      { module: 'src/components/ScoreGauge.tsx', role: 'Visual match score gauge and skill cards' },
      { module: 'src/theme/colors.ts', role: 'Consistent color system for light and dark modes' },
    ],
    keyDeliverables: [
      'Clean UI wireframes and responsive desktop/mobile layouts',
      'Intuitive color-coded match indicators (green, yellow, red)',
      'Readable visual cards for candidate strengths and gaps',
      'Smooth, accessible interactions across devices',
    ],
    tooling: ['Figma', 'Tailwind CSS', 'Lucide Icons'],
  },
  {
    id: 'development',
    stepNum: '04',
    name: 'Development',
    headline: 'Development',
    tagline: 'Clean Code · Frontend & Backend · TypeScript · API Integration',
    howItHelps:
      'Development turns plans and designs into working software. Clean, modular code ensures the app runs smoothly, is easy to maintain, and can grow with new features.',
    howIDidIt: [
      'Frontend & Backend: Developed a responsive React frontend with Vite and a Node.js/Express backend API.',
      'AI & Semantic Matching: Integrated Google Gemini API and vector comparison to analyze resumes against job descriptions with high accuracy.',
      'Type Safety: Wrote clean, strict TypeScript code across all components and API routes to eliminate runtime errors.',
      'Modular Architecture: Structured code into reusable components, services, and utilities for easy maintenance.',
    ],
    whereIUsedIt: [
      { module: 'src/services/aiService.ts', role: 'Gemini AI integration for resume evaluation and tips' },
      { module: 'src/services/matcher.ts', role: 'Semantic comparison between resume skills and job requirements' },
      { module: 'src/components/', role: 'Modular UI components with clean TypeScript types' },
    ],
    keyDeliverables: [
      'Working full-stack web application with React, Vite, and Node.js',
      'AI integration generating accurate resume analysis and tips',
      'Clean, strictly typed TypeScript codebase with zero runtime errors',
      'Modular service layer for easy feature extensions',
    ],
    tooling: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS'],
  },
  {
    id: 'testing',
    stepNum: '05',
    name: 'Testing',
    headline: 'Testing',
    tagline: 'Unit Tests · Integration Tests · Edge Cases · Quality Assurance',
    howItHelps:
      'Testing verifies that every feature works as intended before reaching users. It catches bugs early, confirms accuracy of scores, and ensures dependable performance.',
    howIDidIt: [
      'Unit Testing: Tested skill scoring calculations, resume text parsers, and utility functions to verify accurate results.',
      'Integration Testing: Tested the entire user flow from file upload through AI analysis and report generation.',
      'Edge Case Handling: Tested with different resume formats (PDF, DOCX, text), long documents, and empty fields to prevent errors.',
      'Automated Checks: Ran automated test scripts and TypeScript checks before every build to prevent regressions.',
    ],
    whereIUsedIt: [
      { module: 'src/tests/scoring.test.ts', role: 'Tests for skill matching formulas and score calculation' },
      { module: 'src/tests/parser.test.ts', role: 'Tests for handling multiple file formats and edge cases' },
      { module: 'npm test', role: 'Automated test suite checking all critical paths' },
    ],
    keyDeliverables: [
      'Comprehensive unit tests validating scoring accuracy',
      'Integration tests confirming end-to-end user workflows',
      'Edge case validation for varied file formats and inputs',
      'Automated quality checks running before builds',
    ],
    tooling: ['Vitest', 'Postman', 'GitHub Actions'],
  },
  {
    id: 'deployment',
    stepNum: '06',
    name: 'Deployment',
    headline: 'Deployment',
    tagline: 'Live Release · Cloud Hosting · Fast Performance · SSL Security',
    howItHelps:
      'Deployment makes the project live and accessible on the web. It ensures fast loading times, secure HTTPS connections, and dependable availability for users.',
    howIDidIt: [
      'Live Cloud Hosting: Deployed the live web application to cloud hosting with continuous deployment from GitHub.',
      'Optimized Build: Configured production bundling with code-splitting and asset compression for fast loading.',
      'Secure HTTPS: Enabled SSL/TLS encryption for secure data transfer and user privacy.',
      'Uptime & Monitoring: Set up health checks and status monitoring to ensure smooth, uninterrupted service.',
    ],
    whereIUsedIt: [
      { module: 'Cloud Hosting', role: 'Live website hosting with automatic deployment on git push' },
      { module: 'vite.config.ts', role: 'Production build optimization and asset bundling' },
      { module: 'Live Domain & SSL', role: 'Secure HTTPS certificate and custom domain routing' },
    ],
    keyDeliverables: [
      'Live production deployment accessible to users worldwide',
      'Automatic continuous deployment triggered on code updates',
      'Secure HTTPS encryption ensuring privacy and data protection',
      'Fast-loading optimized assets with smooth performance',
    ],
    tooling: ['Cloud Hosting', 'GitHub', 'Vite', 'HTTPS / SSL'],
  },
];

interface SDLCPhasesProps {
  isDarkMode?: boolean;
}

export const SDLCPhases: React.FC<SDLCPhasesProps> = ({ isDarkMode = true }) => {
  // Currently displayed phase index (updates instantly on mouse hover or click)
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'code' | 'deliverables'>('walkthrough');

  const activePhase = SDLC_SIX_PHASES_DATA[activePhaseIndex] || SDLC_SIX_PHASES_DATA[0];

  return (
    <section id="sdlc" className="py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden">
      {/* Architectural Backdrop with Studio Spotlights */}
      <ClassicSpotlightBackdrop spotlights={3} intensity="medium" isDarkMode={isDarkMode} />

      <div className="max-w-[1720px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Full Software Development Lifecycle</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              SDLC — From Idea to Impact
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-sans text-sm sm:text-base mt-2 max-w-2xl">
              How I developed my flagship project <span className="font-semibold text-slate-900 dark:text-slate-100">AppendUs (AI Career Intelligence & RAG)</span> across the 6 core SDLC phases. Hover over or click any block on the 3D stage to inspect the technical implementation.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold self-start shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Interactive 3D Stage Active</span>
          </div>
        </div>

        {/* Lifecycle Phase Flow Meter Strip */}
        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Continuous Execution Pipeline</span>
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              <span className="text-blue-600 dark:text-blue-400 font-bold">Phase 0{activePhaseIndex + 1} of 06</span>: {activePhase.name} ({Math.round(((activePhaseIndex + 1) / 6) * 100)}% Complete)
            </div>
          </div>

          {/* Connected Step Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {SDLC_SIX_PHASES_DATA.map((phase, idx) => {
              const isCurrent = idx === activePhaseIndex;
              const isPast = idx < activePhaseIndex;

              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    isCurrent
                      ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                      : isPast
                      ? 'bg-slate-100 dark:bg-slate-800/80 border-blue-500/30 text-slate-700 dark:text-slate-300'
                      : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-white text-blue-700'
                        : isPast
                        ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {phase.stepNum}
                  </span>
                  <span className="font-sans text-xs font-semibold truncate">
                    {phase.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Grid: Left 3D Isometric Stepped Stage + Right Reactive Inspector Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 3D Isometric Stepped Stage with names on every block (Cols 1-6) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <SDLC3DStepsStage
              activeIndex={activePhaseIndex}
              onHoverIndex={(idx) => setActivePhaseIndex(idx)}
              onSelectIndex={(idx) => setActivePhaseIndex(idx)}
              isDarkMode={isDarkMode}
            />

            {/* Quick Interactive Step Navigator Buttons */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {SDLC_SIX_PHASES_DATA.map((p, idx) => {
                const isActive = idx === activePhaseIndex;
                return (
                  <button
                    key={p.id}
                    onMouseEnter={() => setActivePhaseIndex(idx)}
                    onClick={() => setActivePhaseIndex(idx)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      isActive
                        ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/25 scale-105 ring-2 ring-blue-400/40'
                        : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                    }`}
                  >
                    <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-blue-100' : 'text-blue-600 dark:text-blue-400'}`}>
                      {p.stepNum}
                    </span>
                    <span className="font-sans text-[11px] font-semibold leading-tight line-clamp-1">
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Phase Inspector focused directly on "How I Developed the Project" (Cols 7-12) */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 shadow-xl backdrop-blur-md space-y-6 transition-all duration-300 laser-border-glow">
            {/* Phase Badge & Headline */}
            <div className="space-y-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                    PHASE {activePhase.stepNum}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                    {activePhase.name} Phase
                  </span>
                </div>

                {/* Sub-Tabs for focused inspection */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setActiveTab('walkthrough')}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-semibold transition-all cursor-pointer ${
                      activeTab === 'walkthrough'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Walkthrough
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('code')}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-semibold transition-all cursor-pointer ${
                      activeTab === 'code'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Code & Files
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('deliverables')}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-semibold transition-all cursor-pointer ${
                      activeTab === 'deliverables'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Deliverables
                  </button>
                </div>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                {activePhase.headline}
              </h3>

              <div className="font-mono text-xs text-blue-600 dark:text-blue-400 font-medium">
                {activePhase.tagline}
              </div>
            </div>

            {/* Dynamic Content based on Active Tab */}
            <AnimatePresence mode="wait">
              {activeTab === 'walkthrough' && (
                <motion.div
                  key="walkthrough"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* 1. How this phase helps in project building */}
                  <div className="space-y-2 p-4 rounded-2xl border border-blue-500/20 bg-blue-50/60 dark:bg-blue-950/25">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>How {activePhase.name} Helps in Project Building:</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-sans text-xs sm:text-sm leading-relaxed">
                      {activePhase.howItHelps}
                    </p>
                  </div>

                  {/* 2. How I did it in my project (AppendUs) */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      <Code2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>How I Did It in My Project (AppendUs):</span>
                    </div>
                    <ul className="space-y-2">
                      {activePhase.howIDidIt.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'code' && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Where I used it in the project */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      <FolderGit2 className="w-4 h-4 text-purple-500 shrink-0" />
                      <span>Modules & Architectural Implementation:</span>
                    </div>
                    <div className="space-y-2">
                      {activePhase.whereIUsedIt.map((loc, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                        >
                          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                            {loc.module}
                          </span>
                          <span className="text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs">
                            {loc.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tooling & Frameworks */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300">
                      <Wrench className="w-3.5 h-3.5 text-slate-400" />
                      <span>Tooling & Frameworks:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activePhase.tooling.map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/60 font-mono text-xs text-slate-700 dark:text-slate-300 font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'deliverables' && (
                <motion.div
                  key="deliverables"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-slate-800 dark:text-slate-200">
                      <Boxes className="w-4 h-4 text-emerald-500" />
                      <span>Key Production Deliverables:</span>
                    </div>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {activePhase.keyDeliverables.map((deliv, dIdx) => (
                        <li key={dIdx} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-medium leading-relaxed">{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 font-mono text-xs flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Every deliverable was authored with automated linting, test suites, and strict Git versioning.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step Navigation Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between font-mono text-xs">
              <button
                type="button"
                onClick={() => setActivePhaseIndex((prev) => (prev > 0 ? prev - 1 : SDLC_SIX_PHASES_DATA.length - 1))}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer flex items-center gap-1 font-semibold transition-colors"
              >
                <span>← Prev Step</span>
              </button>
              <span className="text-slate-400 font-medium">
                Step 0{activePhaseIndex + 1} of 06
              </span>
              <button
                type="button"
                onClick={() => setActivePhaseIndex((prev) => (prev < SDLC_SIX_PHASES_DATA.length - 1 ? prev + 1 : 0))}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 cursor-pointer flex items-center gap-1 font-semibold transition-colors shadow-xs"
              >
                <span>Next Step →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
