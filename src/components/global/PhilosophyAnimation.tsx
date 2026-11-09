import React, { useState, useEffect } from 'react';
import { Lightbulb, Hammer, ShieldAlert, Zap, RefreshCw } from 'lucide-react';

export const PHILOSOPHY_STEPS = [
  {
    key: 'think',
    word: 'Think.',
    num: '01',
    label: 'Ideate & Architect',
    color: 'from-amber-500 to-yellow-400',
    border: 'border-amber-500/50',
    glow: 'shadow-amber-500/30',
    text: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-500/15',
    icon: Lightbulb,
  },
  {
    key: 'build',
    word: 'Build.',
    num: '02',
    label: 'Clean Code & APIs',
    color: 'from-emerald-500 to-teal-400',
    border: 'border-emerald-500/50',
    glow: 'shadow-emerald-500/30',
    text: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-500/15',
    icon: Hammer,
  },
  {
    key: 'break',
    word: 'Break.',
    num: '03',
    label: 'Stress & Boundary Fuzz',
    color: 'from-rose-500 to-orange-400',
    border: 'border-rose-500/50',
    glow: 'shadow-rose-500/30',
    text: 'text-rose-500 dark:text-rose-400',
    bg: 'bg-rose-500/15',
    icon: ShieldAlert,
  },
  {
    key: 'improve',
    word: 'Improve.',
    num: '04',
    label: 'Tune & Benchmark',
    color: 'from-sky-500 to-cyan-400',
    border: 'border-sky-500/50',
    glow: 'shadow-sky-500/30',
    text: 'text-sky-500 dark:text-sky-400',
    bg: 'bg-sky-500/15',
    icon: Zap,
  },
  {
    key: 'repeat',
    word: 'Repeat.',
    num: '05',
    label: 'Continuous Rigor',
    color: 'from-violet-500 to-indigo-400',
    border: 'border-violet-500/50',
    glow: 'shadow-violet-500/30',
    text: 'text-violet-500 dark:text-violet-400',
    bg: 'bg-violet-500/15',
    icon: RefreshCw,
  },
];

interface PhilosophyAnimationProps {
  variant?: 'banner' | 'compact' | 'hero';
  className?: string;
}

export const PhilosophyAnimation: React.FC<PhilosophyAnimationProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Auto-advance cadence: 1.6 seconds per word
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 40; // 40ms tick for smooth progress bar
    const stepDuration = 1600; // 1.6s
    const increment = (intervalTime / stepDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % PHILOSOPHY_STEPS.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, activeIndex]);

  const activeStep = PHILOSOPHY_STEPS[activeIndex];
  const ActiveIcon = activeStep.icon;

  if (variant === 'hero') {
    return (
      <div
        className={`w-full max-w-2xl select-none pt-2 ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Words Row with Cinematic Neon Illumination */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {PHILOSOPHY_STEPS.map((step, idx) => {
            const isActive = idx === activeIndex;
            const Icon = step.icon;
            return (
              <button
                key={step.key}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setProgress(0);
                }}
                className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? `${step.bg} ${step.border} shadow-lg ${step.glow} scale-105 z-10`
                    : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 opacity-75 hover:opacity-100'
                }`}
              >
                {/* Active Indicator Flare */}
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
                <Icon
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isActive ? `${step.text} scale-110 rotate-6` : 'text-slate-400 group-hover:scale-110'
                  }`}
                />
                <span
                  className={`font-mono text-xs sm:text-sm font-bold tracking-tight transition-colors duration-300 ${
                    isActive ? step.text : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {step.word}
                </span>
              </button>
            );
          })}
        </div>

        {/* Micro Telemetry Sub-Cadence Bar */}
        <div className="mt-2.5 flex items-center justify-between gap-4 font-mono text-[11px] px-1 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Phase {activeStep.num}:</span>
            <span className={activeStep.text}>{activeStep.label}</span>
          </div>

          {/* Progress Loop Track */}
          <div className="w-28 sm:w-36 h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${activeStep.color} transition-all duration-75 rounded-full`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Compact variant for Portrait card in About section
  return (
    <div
      className={`w-full select-none mt-3.5 pt-3 border-t border-slate-200/80 dark:border-slate-800/80 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 5-word chain with active glowing pulse */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        {PHILOSOPHY_STEPS.map((step, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={step.key}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                setProgress(0);
              }}
              className={`relative px-2 sm:px-2.5 py-1 rounded-lg border font-mono text-xs transition-all duration-300 cursor-pointer ${
                isActive
                  ? `${step.bg} ${step.border} ${step.text} font-bold shadow-md ${step.glow} scale-105 z-10`
                  : 'bg-slate-100/70 dark:bg-slate-800/60 border-slate-200/90 dark:border-slate-700/80 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {step.word}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-current animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Sub-Descriptor with smooth fade */}
      <div className="mt-2.5 flex items-center justify-center gap-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
        <ActiveIcon className={`w-3 h-3 ${activeStep.text} animate-bounce`} style={{ animationDuration: '2s' }} />
        <span className="font-semibold text-slate-700 dark:text-slate-300">Phase {activeStep.num} —</span>
        <span className={`font-medium ${activeStep.text}`}>{activeStep.label}</span>
      </div>

      {/* Cadence progress bar */}
      <div className="mt-2 mx-auto max-w-[180px] h-1 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${activeStep.color} transition-all duration-75 rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
