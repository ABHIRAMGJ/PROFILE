import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowUpRight, Cpu, Database, Sparkles, Server, Globe, Terminal, Activity } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { ClassicSpotlightBackdrop } from '../global/ClassicSpotlightBackdrop';

interface StackNetworkProps {
  onOpenCaseStudy?: (projectName: string) => void;
  isDarkMode?: boolean;
}

const CORE_TECHS = [
  { name: 'React', category: 'Frontend', projects: ['AppendUs', 'CivicFix', 'Daybreak'] },
  { name: 'FastAPI', category: 'Backend', projects: ['AppendUs', 'AI-Powered ATS Resume Analyzer'] },
  { name: 'Node.js', category: 'Backend', projects: ['CertificateFlow', 'Game Arena', 'Full-Stack User Management System'] },
  { name: 'PostgreSQL', category: 'Database', projects: ['AppendUs', 'CivicFix', 'CertificateFlow'] },
  { name: 'Gemini API', category: 'AI / LLM', projects: ['AppendUs', 'CivicFix', 'CertificateFlow', 'Daybreak', 'AI-Powered ATS Resume Analyzer'] },
  { name: 'RAG', category: 'AI / LLM', projects: ['AppendUs', 'AI-Powered ATS Resume Analyzer'] },
  { name: 'MongoDB', category: 'Database', projects: ['AI-Powered ATS Resume Analyzer', 'Full-Stack User Management System'] },
  { name: 'WebSockets', category: 'Real-time', projects: ['Game Arena'] },
  { name: 'GitHub Actions', category: 'DevOps', projects: ['CivicFix'] },
];

export const StackNetwork: React.FC<StackNetworkProps> = ({ onOpenCaseStudy, isDarkMode = true }) => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedProj, setSelectedProj] = useState<string | null>(null);

  const activeTechObj = CORE_TECHS.find((t) => t.name === selectedTech);
  const activeProjObj = PROJECTS.find((p) => p.name === selectedProj);

  return (
    <section id="stack" className="py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden">
      {/* Classic Architectural Backdrop with Warm Studio Spotlights & Brick Texture */}
      <ClassicSpotlightBackdrop spotlights={3} intensity="medium" isDarkMode={isDarkMode} />

      <div className="max-w-[1720px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-slate-200/90 dark:border-slate-800/90 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase">
                Technology Stack & Systems Map
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Projects × Tech Stack
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-sans max-w-2xl">
              Interactive connection matrix illustrating how core technologies map directly to shipped production systems.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-400 dark:text-slate-500 flex items-center gap-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800">
            <Activity className="w-3.5 h-3.5 text-amber-500" />
            <span>HOVER TO TRACE DEPENDENCIES</span>
          </div>
        </div>

        {/* Matrix Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Tech Nodes (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold block flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              <span>Core Technologies (Click to isolate)</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CORE_TECHS.map((tech, idx) => {
                const isSelected = selectedTech === tech.name;
                const isConnectedToSelectedProj =
                  selectedProj && activeProjObj?.stack.includes(tech.name);

                return (
                  <motion.button
                    key={tech.name}
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 4.5 + (idx % 3) * 0.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.15 } }}
                    onMouseEnter={() => {
                      setSelectedTech(tech.name);
                      setSelectedProj(null);
                    }}
                    onClick={() => {
                      setSelectedTech(tech.name);
                      setSelectedProj(null);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 font-mono text-xs flex flex-col justify-between backdrop-blur-md shadow-md cursor-pointer ${
                      isSelected || isConnectedToSelectedProj
                        ? 'border-amber-500 bg-amber-500/15 text-amber-900 dark:text-amber-200 font-bold shadow-xl shadow-amber-500/20 ring-2 ring-amber-400'
                        : selectedTech && !isSelected
                        ? 'opacity-40 border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400'
                        : 'border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {tech.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {(isSelected || isConnectedToSelectedProj) && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                        )}
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold border border-slate-200 dark:border-slate-700">
                          {tech.projects.length}
                        </span>
                      </div>
                    </div>
                    <span className="font-sans font-bold text-base mt-2 text-slate-900 dark:text-slate-100">
                      {tech.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Shipped Systems Connected (Col 6-12) */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold block flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-500" />
              <span>Shipped Systems Powered By Stack</span>
            </span>

            <div className="space-y-3.5">
              {PROJECTS.map((proj, idx) => {
                const isSelected = selectedProj === proj.name;
                const isConnectedToSelectedTech =
                  selectedTech && activeTechObj?.projects.includes(proj.name);

                return (
                  <motion.div
                    key={proj.id}
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 5 + (idx % 2) * 1.1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.015, y: -4, transition: { duration: 0.15 } }}
                    onMouseEnter={() => {
                      setSelectedProj(proj.name);
                      setSelectedTech(null);
                    }}
                    className={`p-5 rounded-2xl border transition-all duration-200 backdrop-blur-md shadow-lg ${
                      isSelected || isConnectedToSelectedTech
                        ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-950/30 shadow-xl shadow-amber-500/15 ring-2 ring-amber-400'
                        : selectedTech && !isConnectedToSelectedTech
                        ? 'opacity-35 border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60'
                        : 'border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/80 hover:border-slate-400 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>{proj.name}</span>
                          {proj.liveUrl && (
                            <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 font-bold px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
                              <span>Live</span>
                            </span>
                          )}
                        </h4>
                        <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {proj.title}
                        </p>
                      </div>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {proj.stack.map((t) => {
                          const isHighlighted = selectedTech === t;
                          return (
                            <span
                              key={t}
                              className={`font-mono text-[11px] px-2.5 py-0.5 rounded-md border transition-all ${
                                isHighlighted
                                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-xs'
                                  : 'bg-slate-100/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              {t}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
