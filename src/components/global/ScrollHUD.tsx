import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'top', label: 'Home', num: '01', angleX: 68, angleY: 0, hue: 215 },
  { id: 'about', label: 'About', num: '02', angleX: 60, angleY: 25, hue: 215 },
  { id: 'sdlc', label: 'SDLC', num: '03', angleX: 65, angleY: 45, hue: 160 },
  { id: 'skills', label: 'Skills', num: '04', angleX: 70, angleY: 70, hue: 190 },
  { id: 'open', label: 'Open to Work', num: '05', angleX: 55, angleY: 30, hue: 40 },
  { id: 'projects', label: 'Projects', num: '06', angleX: 75, angleY: 35, hue: 215 },
  { id: 'stack', label: 'Tech Stack', num: '07', angleX: 80, angleY: 60, hue: 180 },
  { id: 'experience', label: 'Experience', num: '08', angleX: 70, angleY: 0, hue: 40 },
  { id: 'certificates', label: 'Certificates', num: '09', angleX: 30, angleY: 30, hue: 270 },
  { id: 'contact', label: 'Contact', num: '10', angleX: 0, angleY: 90, hue: 160 },
];

export const ScrollHUD: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsVisible(scrollY > 200);

      // Identify active section
      const scrollPosition = scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveIdx(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const current = SECTIONS[activeIdx];

  return (
    <aside
      className="fixed right-5 bottom-20 z-40 hidden sm:flex items-center gap-3 select-none transition-all duration-300"
      aria-label="Reading progress HUD"
    >
      {/* Metric readout - Clickable to auto-scroll to current active section */}
      <button
        type="button"
        onClick={() => scrollToSection(current.id)}
        className="font-mono text-[11px] text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl border border-slate-300/60 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md text-right min-w-[138px] hover:border-amber-500/50 cursor-pointer pointer-events-auto transition-all"
        title={`Current Section: ${current.label} (Click to align)`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-amber-600 dark:text-amber-400">
            {current.num}
          </span>
          <span className="text-slate-400 font-normal">/ 10</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium ml-1">
            {current.label}
          </span>
        </div>
        {/* Progress rail bar */}
        <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </button>

      {/* Miniature 3D Gyro Sculpture Indicator */}
      <div
        className="relative w-12 h-12 flex items-center justify-center rounded-xl border border-slate-300/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md overflow-hidden"
        style={{ perspective: '300px' }}
      >
        <div
          className="relative w-8 h-8 transition-transform duration-700 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${current.angleX}deg) rotateY(${current.angleY}deg)`,
          }}
        >
          {/* Ring 1 */}
          <div
            className="absolute inset-0 rounded-full border border-amber-500/80 animate-spin-slow"
            style={{ transform: 'rotateZ(45deg)' }}
          />
          {/* Ring 2 */}
          <div
            className="absolute inset-1 rounded-full border border-teal-500/80"
            style={{ transform: 'rotateY(60deg)' }}
          />
          {/* Central Core Bead */}
          <div className="absolute inset-3 rounded-full bg-amber-500 shadow-sm" />
        </div>
      </div>
    </aside>
  );
};
