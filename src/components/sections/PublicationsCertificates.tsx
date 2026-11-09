import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, CheckCircle, ExternalLink, ShieldCheck, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { PUBLICATION, CERTIFICATES } from '../../data/portfolioData';
import { CertificateItem } from '../../types/portfolio';
import { ClassicSpotlightBackdrop } from '../global/ClassicSpotlightBackdrop';

interface PublicationsCertificatesProps {
  isDarkMode?: boolean;
}

export const PublicationsCertificates: React.FC<PublicationsCertificatesProps> = ({ isDarkMode = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'programming' | 'ai_ds_cyber' | 'professional'>('all');
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  const filteredCerts =
    selectedCategory === 'all'
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === selectedCategory);

  return (
    <section id="certificates" className="py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden">
      {/* Classic Architectural Backdrop with Warm Studio Spotlights & Brick Texture */}
      <ClassicSpotlightBackdrop spotlights={3} intensity="medium" isDarkMode={isDarkMode} />

      <div className="max-w-[1720px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-16 relative z-10">
        {/* Research Publication Card */}
        <div id="publications" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-200/90 dark:border-slate-800/90 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase">
                  Scholarly Publications & Research
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Published Research
              </h2>
            </div>
            <span className="font-mono text-xs text-teal-600 dark:text-teal-400 font-semibold px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
              <span>IEEE Conference Publication — 2026</span>
            </span>
          </div>

          <motion.div
            whileHover={{ scale: 1.01, y: -4, transition: { duration: 0.25 } }}
            className="p-8 sm:p-10 rounded-3xl border border-amber-500/30 bg-white/90 dark:bg-slate-900/85 backdrop-blur-md shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden group laser-border-glow"
          >
            {/* Specular Ambient Sheen */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Visual Icon Mark */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-600/5 border border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-inner">
              <span className="font-serif text-5xl font-bold">§</span>
              <span className="font-mono text-[11px] font-semibold mt-1">IEEE 2026</span>
            </div>

            {/* Paper Details */}
            <div className="lg:col-span-10 space-y-4">
              <div>
                <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>First Author Proceedings</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1 leading-snug">
                  {PUBLICATION.title}
                </h3>
                <p className="font-mono text-xs text-slate-400 mt-1">
                  {PUBLICATION.venue} · {PUBLICATION.authors.join(', ')}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {PUBLICATION.summary}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                {PUBLICATION.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 shadow-2xs"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-teal-500" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certificates Gallery with Moving, Blinking Holographic Cards */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-slate-200/90 dark:border-slate-800/90 pb-6">
            <div>
              <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase">
                Industry Certifications & Credentials
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
                Certificates <span className="font-sans font-light text-amber-600 dark:text-amber-400">&</span> Industry Simulations
              </h3>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {[
                { id: 'all', label: 'All (12)' },
                { id: 'programming', label: 'Programming (4)' },
                { id: 'ai_ds_cyber', label: 'AI & Security (4)' },
                { id: 'professional', label: 'Professional (4)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold border-slate-900 dark:border-slate-100 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Holographic Moving & Blinking Credential Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCerts.map((cert, idx) => (
              <motion.div
                key={cert.id}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4.2 + (idx % 4) * 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.03, y: -6, transition: { duration: 0.2 } }}
                onClick={() => setActiveCert(cert)}
                className="relative p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/85 backdrop-blur-md shadow-xl hover:border-amber-500/70 hover:shadow-2xl hover:shadow-amber-500/15 transition-all cursor-pointer flex flex-col justify-between group overflow-hidden laser-border-glow"
              >
                {/* Holographic Shimmer Sweep Beam */}
                <motion.div
                  animate={{
                    x: ['-150%', '200%'],
                  }}
                  transition={{
                    duration: 5 + (idx % 3) * 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-amber-400/12 dark:via-amber-300/10 to-transparent skew-x-12 pointer-events-none"
                />

                <div className="space-y-3 relative z-10">
                  {/* Top Pill with Blinking Status Indicator */}
                  <div className="flex items-center justify-between pb-1">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all shadow-xs">
                      <Award className="w-5 h-5 text-amber-500" />
                    </div>

                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>VERIFIED</span>
                    </div>
                  </div>

                  <h4 className="font-serif text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {cert.title}
                  </h4>

                  <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {cert.organization}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between font-mono text-[11px] text-amber-600 dark:text-amber-400 font-semibold relative z-10">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>View Credential</span>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveCert(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-7 rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl text-slate-800 dark:text-slate-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-mono text-xs uppercase font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Verified Accreditation</span>
              </span>
              <button
                onClick={() => setActiveCert(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100">
                {activeCert.title}
              </h3>
              <p className="font-mono text-sm text-slate-500">
                Issued by {activeCert.organization}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Completed and verified credential in {activeCert.title}, establishing foundational competencies and verified practical execution.
            </p>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveCert(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-amber-600 dark:hover:bg-amber-400 text-white dark:text-slate-900 font-mono text-xs font-semibold cursor-pointer shadow-md transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
