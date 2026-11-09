import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ShieldCheck, Award, Briefcase, GraduationCap, MapPin, UserCheck, Terminal, Activity, Zap, Cpu } from 'lucide-react';
import { STATS } from '../../data/portfolioData';
import { PhilosophyAnimation } from '../global/PhilosophyAnimation';
import { AboutCalmParticles } from '../global/AboutCalmParticles';
import { ClassicSpotlightBackdrop } from '../global/ClassicSpotlightBackdrop';
import { CreativePortraitCard } from '../global/CreativePortraitCard';

interface AboutProps {
  onOpenCaseStudy?: (name: string) => void;
  isDarkMode?: boolean;
}

export const About: React.FC<AboutProps> = ({ isDarkMode = true }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <section id="about" className="py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden">
      {/* Classic Architectural Backdrop with Warm Studio Spotlights & Brick Texture */}
      <ClassicSpotlightBackdrop spotlights={3} intensity="ambient" isDarkMode={isDarkMode} />

      {/* Calm Aesthetic Particle Background System using Framer Motion */}
      <AboutCalmParticles isDarkMode={isDarkMode} />

      {/* Expanded wide container filling the viewport with balanced margins */}
      <div className="max-w-[1720px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <span className="font-mono text-xs text-sky-600 dark:text-sky-400 font-semibold uppercase tracking-wider">
              Engineering Profile & Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              About Gummaraju Jaswanth Abhiram
            </h2>
          </div>
        </div>

        {/* Spacious two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Authentic Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <p className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100 font-normal leading-relaxed">
              A Computer Science Engineering student at Mohan Babu University who prefers building the parts of a product that don't show up on screen — the API, the data model, the thing that makes the app actually work.
            </p>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Coursework and internships have centred on Java, REST API development and full-stack engineering, with backend systems as the common thread: designing endpoints, structuring databases, and reasoning about how a system behaves under real use rather than just in a demo. That's paired with a steady interest in applied AI — using large language models and retrieval-augmented generation to make software genuinely more useful, not just more automated.
            </p>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Outside of coursework, that shows up as an IEEE conference publication on resume analysis using RAG, a stretch of independent problem-solving on LeetCode (160+ problems solved in Java and SQL), and a stint as an NSS coordinator running event logistics for a few hundred people at a time — a different kind of systems thinking.
            </p>

            {/* Currently Exploring & Tightening - Creative Terminal Card with Floating Animation */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.015, y: -6, transition: { duration: 0.2 } }}
              className="p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/85 space-y-3 mt-6 shadow-xl backdrop-blur-md hover:border-amber-500/50 hover:shadow-amber-500/10 transition-all relative overflow-hidden group"
            >
              {/* Subtle Ambient Light Beam */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/70">
                <span className="font-mono text-xs uppercase font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Currently Exploring & Tightening</span>
                </span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-700 dark:text-amber-300 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                  <span>ACTIVE CYCLE</span>
                </span>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans">
                <li className="flex items-baseline gap-2">
                  <span className="font-mono text-amber-500 font-bold">01</span>
                  <span><b className="font-mono text-slate-900 dark:text-slate-100">Learning:</b> RAG evaluation techniques & retrieval quality metrics</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="font-mono text-amber-500 font-bold">02</span>
                  <span><b className="font-mono text-slate-900 dark:text-slate-100">Building:</b> A second pass on the ATS Resume Analyzer's matching engine</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="font-mono text-amber-500 font-bold">03</span>
                  <span><b className="font-mono text-slate-900 dark:text-slate-100">Practising:</b> One medium/hard LeetCode problem a day in Java and SQL</span>
                </li>
              </ul>
            </motion.div>

            {/* Engineering Profile & Technical Credentials - Creative Silicon Card with Async Floating Animation */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              whileHover={{ scale: 1.015, y: -7, transition: { duration: 0.2 } }}
              className="p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/85 space-y-4 shadow-xl backdrop-blur-md hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all mt-6 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  <span>{showDetail ? 'Verified Technical Credentials' : 'Engineering Profile & Competencies'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowDetail(!showDetail)}
                  className="font-mono text-xs text-amber-600 dark:text-amber-400 hover:underline cursor-pointer font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
                >
                  {showDetail ? '← Overview' : 'Details →'}
                </button>
              </div>

              {!showDetail ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                  <div className="py-3 grid grid-cols-12 gap-4 items-baseline">
                    <span className="col-span-4 font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      Focus
                    </span>
                    <span className="col-span-8 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      Backend engineering, REST APIs, applied AI & RAG systems
                    </span>
                  </div>

                  <div className="py-3 grid grid-cols-12 gap-4 items-baseline">
                    <span className="col-span-4 font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      Studying
                    </span>
                    <span className="col-span-8 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      B.Tech, Computer Science & Engineering — Mohan Babu University, 2022–2026 (CGPA 9.31)
                    </span>
                  </div>

                  <div className="py-3 grid grid-cols-12 gap-4 items-baseline">
                    <span className="col-span-4 font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      Strengths
                    </span>
                    <span className="col-span-8 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      Problem-solving, algorithmic thinking, cross-team systems communication
                    </span>
                  </div>

                  <div className="py-3 grid grid-cols-12 gap-4 items-baseline">
                    <span className="col-span-4 font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      Working style
                    </span>
                    <span className="col-span-8 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      Agile-familiar, comfortable with SDLC stages, tests ideas before committing
                    </span>
                  </div>

                  <div className="py-3 grid grid-cols-12 gap-4 items-baseline">
                    <span className="col-span-4 font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      Based in
                    </span>
                    <span className="col-span-8 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      Tirupati, India
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5 text-xs sm:text-sm animate-fadeIn">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
                    <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <b className="font-serif font-bold text-slate-900 dark:text-slate-100 block text-sm">4 Shipped Live Products</b>
                      <p className="text-slate-600 dark:text-slate-300 mt-0.5">AppendUs, CivicFix, Game Arena, and Daybreak, each deployed and usable today with live production URLs.</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
                    <Cpu className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <div>
                      <b className="font-serif font-bold text-slate-900 dark:text-slate-100 block text-sm">LeetCode — 160+ Problems Solved</b>
                      <p className="text-slate-600 dark:text-slate-300 mt-0.5">Data structures and algorithms problems solved with clean Java and SQL code.</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
                    <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <b className="font-serif font-bold text-slate-900 dark:text-slate-100 block text-sm">Scholarly Publication, 2026</b>
                      <p className="text-slate-600 dark:text-slate-300 mt-0.5">First-author conference paper on Role-Based Resume Analysis Using Retrieval-Augmented Generation.</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Creative 3D Portrait Component with Perspective Tilt & Holographic Badges */}
          <div className="lg:col-span-5 font-sans flex justify-center">
            <CreativePortraitCard isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* User Mandate: Six Stats Components revealing one by one going to the right as user scrolls */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>Verified Engineering Track Record</span>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.14,
                },
              },
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -45, y: 15, scale: 0.92 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                whileHover={{ y: -8, scale: 1.04, transition: { duration: 0.2 } }}
                className="relative p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/85 backdrop-blur-md shadow-xl hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/15 transition-all flex flex-col justify-between group overflow-hidden"
              >
                {/* Glowing top line indicator on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/40 via-amber-400 to-amber-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800/70">
                    <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                      Metric #{idx + 1}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <span className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight block group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {stat.customText ? stat.customText : `${stat.value}${stat.unit || ''}`}
                  </span>
                  <span className="font-sans font-semibold text-xs text-slate-700 dark:text-slate-300 mt-1 block">
                    {stat.label}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500 mt-4 block">
                  {stat.sub}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
