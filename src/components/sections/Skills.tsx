import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Grid, Box, Cpu, Sparkles, ArrowLeft, Clock, Pause, Play, Terminal, Layers } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { SkillsConstellation3D } from '../3d/SkillsConstellation3D';
import { SystemArchitectureView } from '../3d/SystemArchitectureView';
import { ArchitectureBlueprint3D } from '../3d/ArchitectureBlueprint3D';
import { ClassicSpotlightBackdrop } from '../global/ClassicSpotlightBackdrop';

interface SkillsProps {
  isDarkMode: boolean;
  activeFocusAreaId: number;
}

export const Skills: React.FC<SkillsProps> = ({ isDarkMode, activeFocusAreaId }) => {
  // Always default to Standard Grid
  const [viewMode, setViewMode] = useState<'grid' | '3d' | 'architecture'>('grid');
  const [autoReturnSeconds, setAutoReturnSeconds] = useState<number>(15);
  const [isAutoPaused, setIsAutoPaused] = useState<boolean>(false);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-return timer to Standard Grid when user clicks 3D or Architecture
  useEffect(() => {
    if (viewMode === 'grid') {
      setAutoReturnSeconds(15);
      return;
    }

    if (isAutoPaused) return;

    const timer = setInterval(() => {
      setAutoReturnSeconds((prev) => {
        if (prev <= 1) {
          setViewMode('grid');
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [viewMode, isAutoPaused]);

  // When switching modes manually
  const handleSwitchMode = (mode: 'grid' | '3d' | 'architecture') => {
    setViewMode(mode);
    setAutoReturnSeconds(15);
    setIsAutoPaused(false);
  };

  // When a skill is clicked in 3D or Architecture, automatically go back to Standard Grid and highlight it
  const handleSelectSkillFrom3D = (skillName: string) => {
    setHighlightedSkill(skillName);
    setViewMode('grid');
    // Clear highlight after a few seconds
    setTimeout(() => {
      setHighlightedSkill(null);
    }, 4500);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden"
    >
      {/* Classic Architectural Backdrop with Warm Studio Spotlights & Brick Texture */}
      <ClassicSpotlightBackdrop isDarkMode={isDarkMode} spotlights={3} intensity="medium" />

      <div className="max-w-[1720px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-12 relative z-10">
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-slate-200/90 dark:border-slate-800/90 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase">
                Technical Capabilities & Stack
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Skills <span className="font-sans font-light text-amber-600 dark:text-amber-400">&</span> Architecture
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-sans">
              Technologies marked (basic) represent working knowledge. The rest are verified in production systems.
            </p>
          </div>

          {/* View Mode Segmented Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div
              className="flex items-center p-1 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md font-mono text-xs shadow-md"
              role="group"
              aria-label="Skills View Switcher"
            >
              <button
                type="button"
                onClick={() => handleSwitchMode('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Grid className="w-3.5 h-3.5 text-amber-500" />
                <span>Standard Grid (Default)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchMode('3d')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-teal-600 text-white font-bold shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D Constellation</span>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchMode('architecture')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  viewMode === 'architecture'
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>System Architecture</span>
              </button>
            </div>
          </div>
        </div>

        {/* Auto-Return Countdown HUD when user views 3D or Architecture */}
        {viewMode !== 'grid' && (
          <div className="p-4 rounded-3xl bg-gradient-to-r from-teal-500/10 via-slate-900/60 to-blue-500/10 border border-teal-500/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono animate-fadeIn shadow-xl">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>
                Viewing {viewMode === '3d' ? '3D Constellation' : 'System Architecture'} — Auto-returning to Standard Grid in{' '}
                <b className="text-teal-600 dark:text-teal-300 text-sm font-bold">{autoReturnSeconds}s</b>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAutoPaused(!isAutoPaused)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer flex items-center gap-1.5 text-xs transition-colors"
              >
                {isAutoPaused ? <Play className="w-3.5 h-3.5 text-emerald-500" /> : <Pause className="w-3.5 h-3.5 text-amber-500" />}
                <span>{isAutoPaused ? 'Resume Auto-Timer' : 'Pause Timer'}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Standard Grid Now</span>
              </button>
            </div>
          </div>
        )}

        {/* Creative Silicon Architecture Chips Grid with Moving/Blinking Animations */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.name}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 4.8 + (idx % 4) * 0.7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.2 } }}
                className="p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/85 backdrop-blur-md shadow-xl flex flex-col justify-between transition-all hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/10 group"
              >
                <div>
                  {/* Micro-Terminal Header with Blinking Port LED */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="space-y-0.5">
                      <h3 className="font-serif font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {cat.name}
                      </h3>
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
                        Architecture Layer
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>ONLINE</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => {
                      const isHighlighted =
                        (activeFocusAreaId >= 0 && skill.areaIds.includes(activeFocusAreaId)) ||
                        highlightedSkill === skill.name;
                      const isDimmed = activeFocusAreaId >= 0 && !isHighlighted;

                      return (
                        <button
                          type="button"
                          key={skill.name}
                          onClick={() => setHighlightedSkill(highlightedSkill === skill.name ? null : skill.name)}
                          className={`font-mono text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                            isHighlighted
                              ? 'border-amber-500 bg-amber-500/25 text-amber-900 dark:text-amber-200 font-bold scale-105 shadow-md shadow-amber-500/20 ring-2 ring-amber-400'
                              : isDimmed
                              ? 'opacity-40 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400'
                              : 'border-slate-200/90 dark:border-slate-800/90 bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:scale-105'
                          }`}
                        >
                          {skill.name}
                          {skill.isBasic && (
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-1">
                              (basic)
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between font-mono text-[11px] text-slate-400">
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">{cat.skills.length} Capabilities</span>
                  <span>Active In Production</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {viewMode === '3d' && (
          <div className="animate-fadeIn relative">
            <SkillsConstellation3D
              isDarkMode={isDarkMode}
              onSelectSkill={(skillName) => handleSelectSkillFrom3D(skillName)}
            />
          </div>
        )}

        {viewMode === 'architecture' && (
          <div className="animate-fadeIn relative space-y-8">
            <ArchitectureBlueprint3D isDarkMode={isDarkMode} />
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="font-mono text-xs uppercase font-bold text-amber-600 dark:text-amber-400 block mb-4">
                Component Topology & Service Interactions
              </span>
              <SystemArchitectureView />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
