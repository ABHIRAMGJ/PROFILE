import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Server, Layers, Cpu, Code2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface RecruiterFastTrackProps {
  activeAreaId: number;
  onSelectArea: (id: number) => void;
  isDarkMode?: boolean;
}

interface RoleTrack {
  id: number;
  label: string;
  badge: string;
  icon: React.ElementType;
  color: string;
  bgLight: string;
  bgDark: string;
  accentBorder: string;
  quickFacts: string;
  targetAnchor: string;
}

export const RECRUITER_TRACKS: RoleTrack[] = [
  {
    id: -1,
    label: 'All Engineering',
    badge: '360° Overview',
    icon: Sparkles,
    color: 'text-slate-700 dark:text-slate-300',
    bgLight: 'bg-slate-100',
    bgDark: 'dark:bg-slate-800',
    accentBorder: 'hover:border-slate-400',
    quickFacts: '4 Deployed Apps · CGPA 9.31 · 160+ LeetCode · IEEE Publication',
    targetAnchor: '#about',
  },
  {
    id: 1, // Backend Systems
    label: 'SDE Backend',
    badge: 'Core Focus',
    icon: Server,
    color: 'text-amber-600 dark:text-amber-400',
    bgLight: 'bg-amber-500/10',
    bgDark: 'dark:bg-amber-500/20',
    accentBorder: 'hover:border-amber-500',
    quickFacts: 'Java, REST APIs, FastAPI, PostgreSQL, ACID Transactions & Caching',
    targetAnchor: '#skills',
  },
  {
    id: 2, // Full-Stack
    label: 'Full-Stack SDE',
    badge: 'End-to-End',
    icon: Layers,
    color: 'text-teal-600 dark:text-teal-400',
    bgLight: 'bg-teal-500/10',
    bgDark: 'dark:bg-teal-500/20',
    accentBorder: 'hover:border-teal-500',
    quickFacts: 'React, TypeScript, Tailwind, RESTful Services, Agile SDLC',
    targetAnchor: '#projects',
  },
  {
    id: 4, // Applied AI & RAG
    label: 'Applied AI & RAG',
    badge: 'Published Author',
    icon: Cpu,
    color: 'text-sky-600 dark:text-sky-400',
    bgLight: 'bg-sky-500/10',
    bgDark: 'dark:bg-sky-500/20',
    accentBorder: 'hover:border-sky-500',
    quickFacts: 'First-author IEEE RAG paper, Vector Embeddings, LLM Evaluation',
    targetAnchor: '#projects',
  },
  {
    id: 5, // Java & DSA
    label: 'Java & Algorithms',
    badge: '160+ LeetCode',
    icon: Code2,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgLight: 'bg-emerald-500/10',
    bgDark: 'dark:bg-emerald-500/20',
    accentBorder: 'hover:border-emerald-500',
    quickFacts: 'Data Structures, Binary Search, Dynamic Programming, SQL Queries',
    targetAnchor: '#experience',
  },
];

export const RecruiterFastTrack: React.FC<RecruiterFastTrackProps> = ({
  activeAreaId,
  onSelectArea,
  isDarkMode = true,
}) => {
  const currentTrack = RECRUITER_TRACKS.find((t) => t.id === activeAreaId) || RECRUITER_TRACKS[0];

  const handleSelect = (track: RoleTrack) => {
    onSelectArea(track.id);
    if (track.targetAnchor) {
      const el = document.querySelector(track.targetAnchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 py-4 relative z-20">
      <div className="p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl transition-all hover:shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Header Tag */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-slate-100">
                  Recruiter Fast-Track
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="font-sans text-[11px] text-slate-500 dark:text-slate-400">
                1-click role lens: aligns projects, architecture, and competencies
              </p>
            </div>
          </div>

          {/* Interactive Fast-Track Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {RECRUITER_TRACKS.map((track) => {
              const Icon = track.icon;
              const isSelected = activeAreaId === track.id;

              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => handleSelect(track)}
                  className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-sans font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-md scale-[1.02]'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:border-amber-500/50 hover:bg-white dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                      isSelected ? 'text-amber-400 dark:text-amber-600' : track.color
                    }`}
                  />
                  <span>{track.label}</span>
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.5 rounded-full uppercase font-bold tracking-tight ${
                      isSelected
                        ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900'
                        : `${track.bgLight} ${track.bgDark} ${track.color}`
                    }`}
                  >
                    {track.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Role Insight Summary */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase">
              Matched Evidence:
            </span>
            <span className="font-sans text-slate-700 dark:text-slate-300 font-medium">
              {currentTrack.quickFacts}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleSelect(currentTrack)}
            className="flex items-center gap-1 font-mono text-[11px] text-amber-600 dark:text-amber-400 hover:underline cursor-pointer font-bold shrink-0 self-end sm:self-auto"
          >
            <span>Jump to {currentTrack.label} Section</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
