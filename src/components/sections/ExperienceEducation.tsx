import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, CheckCircle2, Sparkles, Code2, Terminal, ShieldCheck } from 'lucide-react';
import { WORK_EXPERIENCE, EDUCATION } from '../../data/portfolioData';
import { ClassicSpotlightBackdrop } from '../global/ClassicSpotlightBackdrop';

interface ExperienceEducationProps {
  activeFocusAreaId: number;
  isDarkMode?: boolean;
}

export const ExperienceEducation: React.FC<ExperienceEducationProps> = ({
  activeFocusAreaId,
  isDarkMode = true,
}) => {
  return (
    <section id="experience" className="py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden">
      {/* Classic Architectural Backdrop with Warm Studio Spotlights & Brick Texture */}
      <ClassicSpotlightBackdrop spotlights={3} intensity="medium" isDarkMode={isDarkMode} />

      {/* Expanded Container */}
      <div className="max-w-[1720px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-200/90 dark:border-slate-800/90 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase">
                Career Milestones & Path
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Experience & Education
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-amber-500" />
            <span>Chronological Engineering History</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Work Experience Timeline with Moving & Blinking Floating Cards (Col 1-7) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-500" />
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100">
                  Professional Experience
                </h3>
              </div>
              <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>3 Verified Positions</span>
              </span>
            </div>

            {/* Luminous Flight Track Line */}
            <div className="relative pl-8 sm:pl-10 space-y-8">
              {/* Glowing vertical rail track with traveling photon pulse */}
              <div className="absolute left-2.5 sm:left-3 top-3 bottom-3 w-1 rounded-full bg-slate-300 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  animate={{ y: ['-100%', '300%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-24 bg-gradient-to-b from-transparent via-amber-400 to-cyan-400 rounded-full"
                />
              </div>

              {WORK_EXPERIENCE.map((item, idx) => {
                const isMatch = activeFocusAreaId >= 0 && item.areaIds.includes(activeFocusAreaId);
                const isDimmed = activeFocusAreaId >= 0 && !isMatch;

                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 4.5 + idx * 0.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.02, y: -6, transition: { duration: 0.2 } }}
                    className={`relative group p-6 sm:p-7 rounded-3xl border transition-all duration-300 backdrop-blur-md shadow-xl laser-border-glow ${
                      item.isFeatured
                        ? 'border-amber-500/40 bg-white/90 dark:bg-slate-900/85 hover:border-amber-500 shadow-amber-500/5 hover:shadow-amber-500/20'
                        : 'border-slate-200/90 dark:border-slate-800/90 bg-white/85 dark:bg-slate-900/80 hover:border-cyan-500/50 hover:shadow-cyan-500/10'
                    } ${isDimmed ? 'opacity-35' : 'opacity-100'}`}
                  >
                    {/* Glowing Photon Milestone Bead with Synchronized Pulse */}
                    <div
                      className={`absolute -left-[35px] sm:-left-[43px] top-7 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        item.isFeatured
                          ? 'bg-amber-500 border-amber-300 dark:border-amber-400 shadow-lg shadow-amber-500/50 ring-4 ring-amber-500/20'
                          : 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-400/40'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    </div>

                    {/* Creative Terminal Header Bar with Blinking Beacon */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/20 flex items-center gap-1.5">
                          <Code2 className="w-3 h-3 text-amber-500" />
                          <span>{item.tag || 'SDE INTERN'}</span>
                        </span>
                        <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          <span>LOGGED</span>
                        </div>
                      </div>

                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/5 border border-amber-500/15">
                        {item.period}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {item.role}
                        </h4>
                        <p className="font-sans font-semibold text-sm text-slate-700 dark:text-slate-300 mt-0.5">
                          {item.organization}
                        </p>
                      </div>

                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="space-y-2 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans">
                          {item.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                              <span className="text-amber-500 font-bold shrink-0 mt-0.5">›</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Education & Academic Rigor with Floating Cards (Col 8-12) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-teal-500" />
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-slate-100">
                  Academic Record
                </h3>
              </div>
              <span className="font-mono text-[11px] text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CGPA 9.31 Verified</span>
              </span>
            </div>

            <div className="space-y-6">
              {EDUCATION.map((edu, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 5 + idx * 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
                  className="p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/85 dark:bg-slate-900/80 backdrop-blur-md shadow-xl space-y-3 hover:border-teal-500/50 hover:shadow-teal-500/10 transition-all group laser-border-glow"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {edu.period}
                    </span>
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/30 flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
                      <span>{edu.score}</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {edu.institution}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Research highlight card with animated glowing beacon */}
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.2 } }}
                className="p-6 sm:p-7 rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-white/80 dark:via-slate-900/80 to-teal-500/10 backdrop-blur-md shadow-xl space-y-3 hover:border-amber-500 transition-all group laser-border-glow"
              >
                <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                  <span className="font-mono text-xs uppercase font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Peer-Reviewed Publication</span>
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30 animate-pulse">
                    IEEE 2026
                  </span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Role-Based Resume Analysis Using Retrieval-Augmented Generation
                </h4>
                <p className="font-sans text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  First-author paper published in IEEE Conference, 2026. Evaluates vector similarity thresholds and LLM context assembly.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
