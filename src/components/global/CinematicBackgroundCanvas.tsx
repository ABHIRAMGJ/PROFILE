import React, { useEffect, useRef } from 'react';

interface CinematicBackgroundCanvasProps {
  isDarkMode: boolean;
}

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
}

export const CinematicBackgroundCanvas: React.FC<CinematicBackgroundCanvasProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle pool: 50 interactive celestial nodes
    const particleCount = Math.min(65, Math.floor((width * height) / 24000));
    const particles: StarParticle[] = [];

    const starColors = isDarkMode
      ? ['#38bdf8', '#2dd4bf', '#fbbf24', '#f59e0b', '#818cf8', '#ffffff']
      : ['#0284c7', '#0d9488', '#d97706', '#b45309', '#6366f1', '#475569'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.45 + 0.25,
        alpha: Math.random() * 0.45 + 0.25,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    // Interactive mouse cursor influence
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw connecting constellation filaments between nearby particles
      const maxDist = 110;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.16 * (isDarkMode ? 1 : 0.7);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDarkMode
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(14, 165, 233, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 2. Update & Draw Star Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Soft drift motion
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Interactive gentle cursor repulsion / energy trail
        if (mouseX > 0 && mouseY > 0) {
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < 140 && mdist > 0) {
            const force = (1 - mdist / 140) * 0.8;
            p.x += (mdx / mdist) * force;
            p.y += (mdy / mdist) * force;
          }
        }

        // Sinusoidal shimmer pulse
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.22;

        // Draw particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha * 0.25);
        ctx.fill();

        // Draw particle solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Real-time Stardust & Constellation HTML5 Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* Undulating Cosmic Aurora Atmospheric Gradient Mesh */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[140px] pointer-events-none transition-transform duration-1000 animate-pulse"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(212, 175, 55, 0.14) 0%, rgba(212, 175, 55, 0.03) 55%, transparent 75%)'
            : 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.02) 55%, transparent 75%)',
          animationDuration: '10s',
        }}
      />
      <div
        className="absolute top-[40%] -right-[15%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[150px] pointer-events-none transition-transform duration-1000 animate-pulse"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(6, 182, 212, 0.04) 55%, transparent 75%)'
            : 'radial-gradient(circle, rgba(14, 165, 233, 0.09) 0%, rgba(6, 182, 212, 0.02) 55%, transparent 75%)',
          animationDuration: '12s',
        }}
      />
      <div
        className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full blur-[140px] pointer-events-none transition-transform duration-1000 animate-pulse"
        style={{
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(99, 102, 241, 0.03) 55%, transparent 75%)'
            : 'radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, rgba(99, 102, 241, 0.01) 55%, transparent 75%)',
          animationDuration: '14s',
        }}
      />
    </div>
  );
};
