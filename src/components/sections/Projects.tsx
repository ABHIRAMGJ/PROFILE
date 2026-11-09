import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitBranch, ArrowUpRight, BookOpen, Layers, CheckCircle, Zap, Sparkles, Terminal } from 'lucide-react';
import { PROJECTS, TAG_TO_AREA_MAP } from '../../data/portfolioData';
import { ProjectItem } from '../../types/portfolio';
import { filterProjectsByCategory, projectMatchesFocusArea } from '../../utils/portfolioLogic';
import { ClassicSpotlightBackdrop } from '../global/ClassicSpotlightBackdrop';

interface ProjectsProps {
  activeFocusAreaId: number;
  onOpenCaseStudy: (project: ProjectItem) => void;
  isDarkMode?: boolean;
}

// Point 1: 3D Holographic Gyroscope Cards with Specular Depth & Point 11 Voxel Particle Shimmer
const Tilt3DCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = '', id }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [glint, setGlint] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((centerY - y) / centerY) * 8;
    const rotY = ((x - centerX) / centerX) * 8;

    setTransform(`perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(12px)`);
    setGlint({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
    setGlint((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.15s ease-out' }}
      className={`relative will-change-transform transform-gpu laser-border-glow ${className}`}
    >
      {/* Specular Sheen Glint Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle at ${glint.x}% ${glint.y}%, rgba(56, 189, 248, ${glint.opacity}), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({
  activeFocusAreaId,
  onOpenCaseStudy,
  isDarkMode = true,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ai' | 'full' | 'web'>('all');

  const filteredProjects = filterProjectsByCategory(PROJECTS, selectedFilter);
  const featuredProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden">
      {/* Classic Architectural Backdrop with Warm Studio Spotlights & Brick Texture */}
      <ClassicSpotlightBackdrop spotlights={3} intensity="medium" isDarkMode={isDarkMode} />

      {/* Increased horizontal padding across entire website */}
      <div className="max-w-[1720px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase">
              Production Systems & Case Studies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Selected Projects
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-sans">
              Real software systems with active deployments, robust APIs, and empirical evaluations.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 font-mono text-xs" role="tablist" aria-label="Filter projects">
            {(['all', 'ai', 'full', 'web'] as const).map((filterKey) => {
              const label =
                filterKey === 'all'
                  ? 'All Projects'
                  : filterKey === 'ai'
                  ? 'AI / RAG'
                  : filterKey === 'full'
                  ? 'Full-Stack'
                  : 'Web Apps';
              const isActive = selectedFilter === filterKey;
              return (
                <button
                  key={filterKey}
                  onClick={() => setSelectedFilter(filterKey)}
                  className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold border-slate-900 dark:border-slate-100 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Point 1 & Point 11: Featured Project Showcase with 3D Holographic Gyroscope Tilt (AppendUs) */}
        {selectedFilter === 'all' && featuredProject && (
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.015, y: -8, transition: { duration: 0.25 } }}
            className="w-full"
          >
            <Tilt3DCard className="p-8 sm:p-10 rounded-3xl border border-amber-500/40 bg-white/90 dark:bg-slate-900/85 backdrop-blur-md shadow-2xl space-y-6 overflow-hidden hover:border-amber-500 hover:shadow-amber-500/20 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                    <span>Featured Production Product</span>
                  </span>
                  <span className="font-mono text-xs text-teal-600 dark:text-teal-400 flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20">
                    <Zap className="w-3.5 h-3.5" />
                    <span>25% Faster Load</span>
                  </span>
                </div>
                <span className="font-mono text-xs text-slate-400">12+ Modular Workflows</span>
              </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {featuredProject.name}
                </h3>
                <p className="font-mono text-sm text-slate-600 dark:text-slate-300">
                  {featuredProject.title}
                </p>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {featuredProject.description}
                </p>

                {/* Key functionality bullet highlights */}
                <ul className="space-y-2 pt-2 text-sm text-slate-700 dark:text-slate-300">
                  {featuredProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredProject.stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Column */}
              <div className="lg:col-span-4 flex flex-col gap-3 pt-2">
                {featuredProject.liveUrl && (
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-amber-600 dark:bg-slate-100 dark:hover:bg-amber-400 text-white dark:text-slate-900 dark:hover:text-slate-950 font-mono text-xs font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <span>Launch Live Platform</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold transition-all cursor-pointer"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}

                {featuredProject.caseStudy && (
                  <button
                    onClick={() => onOpenCaseStudy(featuredProject)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10 font-mono text-xs font-semibold transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Explore 3D Case Study</span>
                  </button>
                )}
              </div>
            </div>
          </Tilt3DCard>
        </motion.div>
      )}

        {/* Regular Shipped Projects Grid with Point 1 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regularProjects.map((project, idx) => {
            const matchesFocus = projectMatchesFocusArea(
              project.stack,
              activeFocusAreaId,
              TAG_TO_AREA_MAP
            );
            const isDimmed = activeFocusAreaId >= 0 && !matchesFocus;

            return (
              <motion.div
                key={project.id}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 5 + (idx % 2) * 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.02, y: -6, transition: { duration: 0.2 } }}
                className="w-full"
              >
                <Tilt3DCard
                  id={project.id}
                  className={`p-7 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between backdrop-blur-md shadow-xl ${
                    matchesFocus && activeFocusAreaId >= 0
                      ? 'border-amber-500 bg-amber-500/10 dark:bg-amber-950/25 shadow-amber-500/20 ring-1 ring-amber-500'
                      : isDimmed
                      ? 'opacity-40 border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60'
                      : 'border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/85 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/10'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Header with Blinking Indicator */}
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800/70">
                      <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>{project.categories.includes('ai') ? 'Applied AI System' : 'Full-Stack Platform'}</span>
                      </span>
                      {project.liveUrl && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-teal-600 dark:text-teal-400 font-bold px-2.5 py-0.5 rounded-full border border-teal-500/30 bg-teal-500/10 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
                          <span>PRODUCTION LIVE</span>
                        </span>
                      )}
                    </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {project.name}
                    </h3>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {project.title}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="space-y-1.5 pt-1 text-xs text-slate-600 dark:text-slate-300">
                      {project.highlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">›</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Links */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.statusNote && (
                      <span className="text-amber-600 dark:text-amber-400 italic">
                        {project.statusNote}
                      </span>
                    )}
                  </div>

                  {project.caseStudy && (
                    <button
                      onClick={() => onOpenCaseStudy(project)}
                      className="text-amber-600 dark:text-amber-400 hover:underline font-semibold cursor-pointer"
                    >
                      Case Study →
                    </button>
                  )}
                </div>
              </Tilt3DCard>
            </motion.div>
          );
          })}
        </div>
      </div>
    </section>
  );
};
