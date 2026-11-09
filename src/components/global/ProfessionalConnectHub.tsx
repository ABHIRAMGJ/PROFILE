import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Code2,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Compass,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { DirectEmailModal } from './DirectEmailModal';

interface ProfessionalConnectHubProps {
  isDarkMode?: boolean;
}

export const ProfessionalConnectHub: React.FC<ProfessionalConnectHubProps> = ({ isDarkMode = true }) => {
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const handleCopy = (text: string, channel: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedChannel(channel);
      setTimeout(() => setCopiedChannel(null), 2400);
    } catch {
      // fallback
    }
  };

  const handleEmailAction = () => {
    setEmailModalOpen(true);
  };

  const channels = [
    {
      id: 'github',
      name: 'GitHub Profile',
      handle: '@ABHIRAMGJ',
      url: PERSONAL_INFO.github,
      badge: 'Codebase & Repos',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      description: '4 Shipped live products, microservices, and automated CI/CD pipelines.',
      icon: Github,
      accentGlow: 'hover:border-emerald-500/60 hover:shadow-emerald-500/15',
      iconBg: 'bg-slate-900 text-white dark:bg-slate-800 dark:text-emerald-400 border-slate-700',
      statLabel: '840+ Commits',
      statSub: '4 Production Apps',
      actionLabel: 'View Repositories',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Network',
      handle: 'Gummaraju Jaswanth Abhiram',
      url: PERSONAL_INFO.linkedin,
      badge: 'Verified Professional',
      badgeColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30',
      description: 'Deloitte Analyst Trainee Select · B.Tech CSE (9.31 CGPA) · Open to Work.',
      icon: Linkedin,
      accentGlow: 'hover:border-sky-500/60 hover:shadow-sky-500/15',
      iconBg: 'bg-[#0077B5] text-white border-sky-400/40',
      statLabel: 'Deloitte Select',
      statSub: 'SDE & Full-Stack',
      actionLabel: 'Connect on LinkedIn',
    },
    {
      id: 'leetcode',
      name: 'LeetCode Profile',
      handle: '@gjabhiram001',
      url: PERSONAL_INFO.leetcode,
      badge: 'Algorithmic DSA',
      badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
      description: '160+ Problems solved with disciplined Java & SQL algorithmic data structures.',
      icon: Code2,
      accentGlow: 'hover:border-amber-500/60 hover:shadow-amber-500/15',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 border-amber-400/40 font-bold',
      statLabel: '160+ Solved',
      statSub: 'Java DSA & SQL',
      actionLabel: 'Inspect Solutions',
    },
    {
      id: 'email',
      name: 'Direct Priority Reach',
      handle: PERSONAL_INFO.email, // gjaviram001@gmail.com
      url: `mailto:${PERSONAL_INFO.email}`,
      badge: 'Direct Response',
      badgeColor: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/30',
      description: 'Official direct contact for interviews, technical discussions, and offers.',
      icon: Mail,
      accentGlow: 'hover:border-teal-500/60 hover:shadow-teal-500/15',
      iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-teal-400/40',
      statLabel: '< 24h Response',
      statSub: 'Priority Inbox',
      actionLabel: 'Send Direct Email',
      canCopy: true,
      copyValue: PERSONAL_INFO.email,
      isCustomAction: true,
    },
  ];

  return (
    <section className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 py-4 relative z-20">
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/90 backdrop-blur-2xl shadow-xl transition-all space-y-6 laser-border-glow">
        {/* Clean, Professional Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                Direct Engineering Channels & Portfolio Reach
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Connect With Gummaraju Jaswanth Abhiram
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Verified links to live source repositories, industry network, algorithmic solutions, and priority direct communication line.
            </p>
          </div>

          {/* Status Badge: Professional & Clean */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 backdrop-blur-md shadow-xs flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="font-mono text-xs">
                <span className="text-slate-900 dark:text-slate-100 font-bold block">Open to Work</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">SDE & Full-Stack Roles</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Creative Professional Channel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {channels.map((ch, idx) => {
            const Icon = ch.icon;
            const isCopied = copiedChannel === ch.id;

            return (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
                className={`relative p-5 sm:p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md shadow-lg transition-all flex flex-col justify-between group overflow-hidden ${ch.accentGlow}`}
              >
                {/* Subtle top indicator glow beam */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm ${ch.iconBg}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`font-mono text-[10px] px-2.5 py-1 rounded-full uppercase font-bold tracking-tight border ${ch.badgeColor}`}
                    >
                      {ch.badge}
                    </span>
                  </div>

                  {/* Channel Title & Handle */}
                  <div>
                    <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {ch.name}
                    </h4>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {ch.handle}
                    </p>
                  </div>

                  {/* Narrative description */}
                  <p className="font-sans text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {ch.description}
                  </p>

                  {/* Key stat chip */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{ch.statLabel}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{ch.statSub}</span>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                  {ch.isCustomAction ? (
                    <button
                      type="button"
                      onClick={handleEmailAction}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-mono text-xs font-semibold shadow-sm shadow-teal-500/20 transition-all cursor-pointer group/btn"
                    >
                      <span>{ch.actionLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  ) : (
                    <a
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-mono text-xs font-semibold shadow-xs transition-all cursor-pointer group/btn"
                    >
                      <span>{ch.actionLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  {ch.canCopy && (
                    <button
                      type="button"
                      onClick={() => handleCopy(ch.copyValue || '', ch.id)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                      title={isCopied ? 'Copied to clipboard!' : 'Copy email address'}
                      aria-label="Copy email address"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Direct Reach Email Modal */}
      <DirectEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
      />
    </section>
  );
};
