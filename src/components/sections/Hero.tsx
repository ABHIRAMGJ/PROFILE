import React from 'react';
import { ArrowDown, Download, ExternalLink, Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { HeroSculpture } from '../3d/HeroSculpture';
import { PhilosophyAnimation } from '../global/PhilosophyAnimation';
import { ClassicSpotlightBackdrop } from '../global/ClassicSpotlightBackdrop';

interface HeroProps {
  isDarkMode: boolean;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ isDarkMode, onOpenResume }) => {
  return (
    <section
      id="top"
      className="relative min-h-[calc(100vh-4rem)] flex items-center py-12 lg:py-16 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80"
    >
      {/* Classic Architectural Backdrop with Warm Studio Spotlights & Brick Texture */}
      <ClassicSpotlightBackdrop spotlights={3} intensity="ambient" isDarkMode={isDarkMode} />
      {/* 
        CINEMATIC & CREATIVE BACKGROUND (IMAGE 4: Screenshot_2026-11-01_160721_3b132442.png)
        User instruction: "4 add bg good looking,creative and professial and i need more creative"
        Layered cosmic crystalline monolith with dual-tone gold & cyan stardust flares,
        architectural millimeter grid, and atmospheric depth preserving pristine typography legibility.
      */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Primary Artwork Layer with Creative Vibrancy */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
          style={{
            backgroundImage: `url('/assets/aistudio/Screenshot_2026-11-01_160721_3b132442.png')`,
            opacity: isDarkMode ? 0.65 : 0.45,
            filter: isDarkMode
              ? 'contrast(1.25) saturate(1.35) brightness(0.92)'
              : 'contrast(1.18) saturate(1.25) brightness(1.02)',
          }}
        />

        {/* Dual Cosmic Energy Flares: Golden Sun on left, Cyan Crystal Stardust on right */}
        <div
          className="absolute -top-24 -left-24 w-[650px] h-[650px] rounded-full blur-[120px] transition-opacity duration-700 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'radial-gradient(circle, rgba(212, 175, 55, 0.32) 0%, rgba(212, 175, 55, 0.08) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(212, 175, 55, 0.22) 0%, rgba(212, 175, 55, 0.05) 50%, transparent 75%)',
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[700px] h-[700px] rounded-full blur-[130px] transition-opacity duration-700 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'radial-gradient(circle, rgba(45, 212, 191, 0.35) 0%, rgba(56, 189, 248, 0.12) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(20, 184, 166, 0.22) 0%, rgba(14, 165, 233, 0.08) 50%, transparent 75%)',
          }}
        />

        {/* Ambient directional gradient balanced for high typography legibility without washing out art */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            isDarkMode
              ? 'bg-gradient-to-r from-[#0D0F13]/92 via-[#0D0F13]/72 to-[#0D0F13]/35'
              : 'bg-gradient-to-r from-[#F4F1EA]/90 via-[#F4F1EA]/68 to-[#F4F1EA]/30'
          }`}
        />

        {/* Floating Stardust Energy Particles */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[18%] left-[22%] w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping opacity-75" />
          <div className="absolute top-[35%] left-[48%] w-1 h-1 rounded-full bg-teal-400 animate-pulse" />
          <div className="absolute top-[68%] left-[15%] w-1 h-1 rounded-full bg-amber-300 animate-pulse" />
          <div className="absolute top-[28%] right-[25%] w-2 h-2 rounded-full bg-cyan-400 blur-[0.5px] animate-pulse" />
          <div className="absolute top-[55%] right-[18%] w-1 h-1 rounded-full bg-amber-400 animate-ping opacity-60" />
          <div className="absolute top-[75%] right-[32%] w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
        </div>

        {/* Subtle Architectural Precision Grid Overlay */}
        <div
          className={`absolute inset-0 opacity-25 ${
            isDarkMode
              ? 'bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)]'
              : 'bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)]'
          } bg-[size:64px_64px]` }
        />
      </div>

      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Narrative Editorial Profile (Exact match to Image 6) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Availability Pill & Location */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 text-slate-800 dark:text-slate-200 font-mono text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                <span>Open to Work</span>
              </span>
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                · Tirupati, India
              </span>
            </div>

            {/* Kicker */}
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="w-5 h-px bg-slate-400 dark:bg-slate-600 inline-block"></span>
              <span>Portfolio of a software engineer</span>
            </p>

            {/* Display Name (Exact match to Image 6) */}
            <div className="space-y-1">
              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-slate-100 uppercase leading-[1.05]">
                GUMMARAJU JASWANTH
              </h1>
              <div className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#24467A] dark:text-[#8DAEE8] font-normal leading-[1.05]">
                ABHIRAM
              </div>
            </div>

            {/* Engineering Philosophy Cadence: Think. Build. Break. Improve. Repeat. */}
            <PhilosophyAnimation variant="hero" />

            {/* Professional Title & Sub-role */}
            <div className="space-y-1.5 pt-1">
              <h2 className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100 font-medium leading-snug">
                Software Engineer Building Intelligent Digital Products.
              </h2>
              <p className="font-mono text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                — Full-Stack Development · Backend Engineering · Applied AI
              </p>
            </div>

            {/* Hero Copy Narrative */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-sans">
              I design and build reliable applications, backend services and APIs, and practical AI-powered features, from an AI career platform to a civic-issue workflow system. Four live products shipped, and an IEEE-published paper on RAG-based resume analysis.
            </p>

            {/* Capability Strip */}
            <div
              className="inline-flex flex-wrap border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 rounded-xs text-xs font-mono text-slate-700 dark:text-slate-300"
              aria-label="Capabilities"
            >
              <span className="px-3 py-1.5 border-r border-slate-300 dark:border-slate-700">Full-Stack</span>
              <span className="px-3 py-1.5 border-r border-slate-300 dark:border-slate-700">Backend</span>
              <span className="px-3 py-1.5 border-r border-slate-300 dark:border-slate-700">APIs</span>
              <span className="px-3 py-1.5">Applied AI</span>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xs border border-slate-900 dark:border-slate-100 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-mono text-xs font-semibold shadow-sm transition-all"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href={`/${PERSONAL_INFO.resumeFileName}`}
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xs border border-slate-400 dark:border-slate-600 hover:border-slate-900 dark:hover:border-slate-100 text-slate-800 dark:text-slate-200 font-mono text-xs font-medium transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-mono text-xs font-medium transition-all"
              >
                <span>Preview résumé</span>
              </button>
            </div>

            {/* Enhanced Creative Social Profile Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 font-mono text-xs">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-300 shadow-2xs transition-all hover:scale-105"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="font-semibold">GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-sky-500/50 hover:text-sky-600 dark:hover:text-sky-400 text-slate-700 dark:text-slate-300 shadow-2xs transition-all hover:scale-105"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                <span className="font-semibold">LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 text-slate-700 dark:text-slate-300 shadow-2xs transition-all hover:scale-105"
              >
                <Code2 className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold">LeetCode</span>
              </a>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=${encodeURIComponent('Software Engineering Opportunity — Gummaraju Jaswanth Abhiram')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-teal-500/50 hover:text-teal-600 dark:hover:text-teal-400 text-slate-700 dark:text-slate-300 shadow-2xs transition-all hover:scale-105"
                title={`Send direct email to ${PERSONAL_INFO.email}`}
              >
                <Mail className="w-3.5 h-3.5 text-teal-500" />
                <span className="font-semibold">Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Three.js Mechanical Orbital Sculpture (Image 2 & 3) */}
          <div className="lg:col-span-6 flex justify-center items-center w-full min-h-[580px] lg:min-h-[720px] p-2 sm:p-6 lg:p-8 overflow-visible">
            <HeroSculpture isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </section>
  );
};
