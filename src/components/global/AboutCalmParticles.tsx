import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface AboutCalmParticlesProps {
  isDarkMode: boolean;
}

interface ParticleConfig {
  id: number;
  size: number;
  initX: number;
  initY: number;
  dx: number;
  dy: number;
  duration: number;
  delay: number;
  color: string;
}

export const AboutCalmParticles: React.FC<AboutCalmParticlesProps> = ({ isDarkMode }) => {
  // Generate a deterministic calm set of 28 gentle particles
  const particles: ParticleConfig[] = useMemo(() => {
    const list: ParticleConfig[] = [];
    const colors = isDarkMode
      ? [
          'rgba(212, 175, 55, 0.45)', // Champagne Gold
          'rgba(56, 189, 248, 0.40)', // Sky Blue
          'rgba(45, 212, 191, 0.42)', // Soft Teal
          'rgba(168, 85, 247, 0.35)', // Twilight Violet
        ]
      : [
          'rgba(180, 83, 9, 0.35)',   // Warm Amber
          'rgba(14, 165, 233, 0.32)', // Azure
          'rgba(13, 148, 136, 0.35)', // Muted Teal
          'rgba(124, 58, 237, 0.28)', // Soft Indigo
        ];

    for (let i = 0; i < 26; i++) {
      const seed = (i * 9301 + 49297) % 233280;
      const rnd1 = seed / 233280;
      const rnd2 = ((seed * 9301 + 49297) % 233280) / 233280;
      const rnd3 = ((seed * 1337 + 12345) % 233280) / 233280;

      list.push({
        id: i,
        size: rnd1 * 3.5 + 2, // 2px to 5.5px
        initX: rnd2 * 100,     // 0% to 100%
        initY: rnd3 * 100,     // 0% to 100%
        dx: (rnd1 - 0.5) * 60, // gentle horizontal drift
        dy: -35 - rnd2 * 45,   // slow upward peaceful buoyancy
        duration: 16 + rnd3 * 14, // 16s to 30s slow transition
        delay: rnd1 * 6,
        color: colors[i % colors.length],
      });
    }
    return list;
  }, [isDarkMode]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Soft Calm Gradient Blooms */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.14, 0.22, 0.14],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 right-1/4 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(212, 175, 55, 0.04) 55%, transparent 75%)'
            : 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0.02) 55%, transparent 75%)',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.12, 0.20, 0.12],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute -bottom-24 -left-20 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(6, 182, 212, 0.04) 55%, transparent 75%)'
            : 'radial-gradient(circle, rgba(14, 165, 233, 0.10) 0%, rgba(6, 182, 212, 0.02) 55%, transparent 75%)',
        }}
      />

      {/* Floating Calm Particles powered by Framer Motion */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            left: `${p.initX}%`,
            top: `${p.initY}%`,
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            x: [0, p.dx * 0.5, p.dx, p.dx * 0.3, 0],
            y: [0, p.dy * 0.4, p.dy, p.dy * 0.6, 0],
            opacity: [0.15, 0.75, 0.85, 0.4, 0.15],
            scale: [0.85, 1.25, 1.4, 1.0, 0.85],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '9999px',
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};
