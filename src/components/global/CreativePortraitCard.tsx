import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Sparkles, Terminal, Activity, CheckCircle2 } from 'lucide-react';
import { PhilosophyAnimation } from './PhilosophyAnimation';

interface CreativePortraitCardProps {
  isDarkMode?: boolean;
}

export const CreativePortraitCard: React.FC<CreativePortraitCardProps> = ({ isDarkMode = true }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glint, setGlint] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlint({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlint({ x: 50, y: 50, opacity: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="w-full flex flex-col items-center select-none"
    >
      {/* Interactive 3D Tilt Card Shell */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        className="relative w-full max-w-[340px] sm:max-w-[380px] p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/85 backdrop-blur-md shadow-2xl transition-shadow duration-500 hover:shadow-amber-500/20 group"
      >
        {/* Specular Glint Sheen Layer */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 240px at ${glint.x}% ${glint.y}%, rgba(251, 191, 36, 0.22), transparent 75%)`,
            opacity: glint.opacity,
          }}
        />

        {/* Cyber Hologram Ambient Ring behind Portrait */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/20 via-teal-500/20 to-cyan-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

        {/* Portrait Visual Window */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-lg bg-slate-950">
          <img
            src="/assets/aistudio/PHOTOL_eeba0d81.jpeg"
            alt="Gummaraju Jaswanth Abhiram"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/abhiram_portrait.jpg';
            }}
          />

          {/* Vignette Rim */}
          <div className="absolute inset-0 ring-1 ring-inset ring-black/15 dark:ring-white/10 rounded-2xl pointer-events-none" />

          {/* Top Floating Badges: Verified Candidate & My Photo */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">VERIFIED CANDIDATE</span>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-400/40 text-amber-300 font-mono text-[10px] shadow-md">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="font-semibold">MY PHOTO</span>
          </div>
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-amber-400/80 pointer-events-none" />

          {/* Bottom Floating Console HUD */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] bg-slate-950/85 backdrop-blur-md px-3 py-2 rounded-xl text-white border border-white/10 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-400">Open to Work</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Tirupati, India</span>
            </div>
          </div>
        </div>

        {/* Candidate Identity Strip & Verified Philosophy */}
        <div className="mt-5 text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider">
            <Activity className="w-3 h-3 text-amber-500" />
            <span>Full-Stack & Systems Engineer</span>
          </div>

          <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 block">
            GUMMARAJU JASWANTH ABHIRAM
          </h3>
          <p className="font-sans text-xs text-slate-500 dark:text-slate-400 block">
            B.Tech CSE (2022–2026) · Mohan Babu University
          </p>

          {/* Interactive Cadence Philosophy */}
          <div className="pt-2">
            <PhilosophyAnimation variant="compact" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
