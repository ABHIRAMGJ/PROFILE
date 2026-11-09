import React, { useState } from 'react';
import { FOCUS_AREAS } from '../../data/portfolioData';
import { ClassicSpotlightBackdrop } from '../global/ClassicSpotlightBackdrop';
import { CheckCircle2, Sparkles, Layers, Cpu } from 'lucide-react';

interface OpenToWorkProps {
  activeAreaId: number;
  onSelectArea: (areaId: number) => void;
  isDarkMode?: boolean;
}

export const OpenToWork: React.FC<OpenToWorkProps> = ({
  activeAreaId,
  onSelectArea,
  isDarkMode = true,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const selectedIndex = hoveredIndex !== null ? hoveredIndex : activeAreaId >= 0 ? activeAreaId : -1;

  // Geometry for 7 nodes in SVG constellation
  const W = 620;
  const H = 460;
  const cx = W / 2;
  const cy = H / 2;
  const rx = 210;
  const ry = 150;

  const nodePositions = FOCUS_AREAS.map((_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
    return {
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle),
      cos: Math.cos(angle),
      sin: Math.sin(angle),
    };
  });

  // Cross interconnects
  const crossLinks = [
    [0, 1], [1, 3], [3, 4], [4, 2], [5, 1], [6, 0], [2, 5]
  ];

  return (
    <section id="open" className="py-20 lg:py-28 border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden">
      {/* Classic Architectural Backdrop with Warm Studio Spotlights & Brick Texture */}
      <ClassicSpotlightBackdrop spotlights={3} intensity="medium" isDarkMode={isDarkMode} />

      <div className="max-w-[1720px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Open to Work. Ready to Build.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-2 font-sans max-w-2xl">
              I am interested in building reliable software products, backend services, and practical AI-powered applications.
            </p>
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-1">
              Click a node or a card to focus the whole page on that area. Use the Focus lens button, bottom left, to change or clear it.
            </p>
          </div>
          <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
            Target Roles & Core Focus
          </span>
        </div>

        {/* 
          EXACT TWO-COLUMN CONSTELLATION FROM IMAGE 1 (Screenshot_2026-10-27_175641_1b3c2af3.png)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Interactive Constellation SVG Network (Col 1-6) */}
          <div className="lg:col-span-6 relative flex items-center justify-center p-4">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto overflow-visible select-none"
              role="img"
              aria-label="Capability map connecting seven focus areas"
            >
              {/* Futuristic SVG Glow Filters */}
              <defs>
                <filter id="neon-gold" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="neon-cyan" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Dashed outer orbit - High-contrast color visible on light & dark backgrounds */}
              <ellipse
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                fill="none"
                stroke={isDarkMode ? '#64748b' : '#334155'}
                strokeWidth="4"
                strokeDasharray="9 7"
                strokeOpacity={isDarkMode ? 0.95 : 0.85}
                className="transition-colors duration-300"
              />

              {/* Connecting dashed lines from Center to Nodes - High-contrast color & thickness */}
              {nodePositions.map((pos, idx) => {
                const isLit = selectedIndex === idx;
                return (
                  <g key={`center-group-${idx}`}>
                    <line
                      x1={cx}
                      y1={cy}
                      x2={pos.x}
                      y2={pos.y}
                      stroke={
                        isLit
                          ? isDarkMode
                            ? '#fbbf24'
                            : '#d97706'
                          : isDarkMode
                          ? '#475569'
                          : '#1e293b'
                      }
                      strokeWidth={isLit ? 5.5 : 3.5}
                      strokeDasharray={isLit ? 'none' : '6 6'}
                      strokeOpacity={isLit ? 1 : isDarkMode ? 0.9 : 0.8}
                      filter={isLit ? 'url(#neon-gold)' : undefined}
                      className="transition-all duration-300"
                    />
                    {/* Animated Traveling Photon Packet on active line */}
                    {isLit && (
                      <circle r="4.5" fill={isDarkMode ? '#fde047' : '#f59e0b'} filter="url(#neon-gold)">
                        <animateMotion
                          dur="1.6s"
                          repeatCount="indefinite"
                          path={`M ${cx} ${cy} L ${pos.x} ${pos.y}`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Cross interconnect lines - High-contrast color & thickness */}
              {crossLinks.map(([from, to], k) => {
                const p1 = nodePositions[from];
                const p2 = nodePositions[to];
                const isLit = selectedIndex === from || selectedIndex === to;
                return (
                  <line
                    key={`cross-${k}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={
                      isLit
                        ? isDarkMode
                          ? '#38bdf8'
                          : '#0284c7'
                        : isDarkMode
                        ? '#334155'
                        : '#475569'
                    }
                    strokeWidth={isLit ? 4.5 : 3}
                    strokeDasharray={isLit ? 'none' : '5 5'}
                    strokeOpacity={isLit ? 1 : isDarkMode ? 0.8 : 0.75}
                    filter={isLit ? 'url(#neon-cyan)' : undefined}
                    className="transition-colors duration-300"
                  />
                );
              })}

              {/* Central Engineering Hub: GJA engineer */}
              <circle
                cx={cx}
                cy={cy}
                r="36"
                className="fill-slate-900 dark:fill-slate-100"
              />
              <text
                x={cx}
                y={cy + 3}
                textAnchor="middle"
                className="fill-white dark:fill-slate-900 font-serif font-bold text-sm tracking-wide pointer-events-none"
              >
                GJA
              </text>
              <text
                x={cx}
                y={cy + 17}
                textAnchor="middle"
                className="fill-slate-300 dark:fill-slate-600 font-mono text-[9px] pointer-events-none"
              >
                engineer
              </text>

              {/* 7 Satellite Nodes */}
              {FOCUS_AREAS.map((area, idx) => {
                const pos = nodePositions[idx];
                const isSelected = selectedIndex === idx;

                // Label pill positioning
                const side = pos.cos > 0.3 ? 1 : pos.cos < -0.3 ? -1 : 0;
                const pillWidth = area.shortLabel.length * 8 + 24;
                const pillX = side > 0 ? pos.x + 18 : side < 0 ? pos.x - 18 - pillWidth : pos.x - pillWidth / 2;
                const pillY = side ? pos.y - 12 : pos.sin < 0 ? pos.y - 44 : pos.y + 20;

                return (
                  <g
                    key={area.id}
                    onClick={() => onSelectArea(activeAreaId === area.id ? -1 : area.id)}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={area.label}
                  >
                    {/* Outer halo */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? 24 : 18}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className={`transition-all duration-300 ${
                        isSelected
                          ? 'text-amber-500 dark:text-amber-400 opacity-90'
                          : 'text-slate-400/40'
                      }`}
                    />

                    {/* Node circle */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="13"
                      className={`transition-all duration-300 ${
                        isSelected
                          ? 'fill-amber-500 dark:fill-amber-400 stroke-amber-400 dark:stroke-amber-300'
                          : 'fill-white dark:fill-slate-900 stroke-slate-400 dark:stroke-slate-500'
                      }`}
                      strokeWidth="2"
                    />

                    {/* Subtle core indicator dot */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="4"
                      className={`transition-colors pointer-events-none ${
                        isSelected ? 'fill-slate-950 dark:fill-slate-950' : 'fill-slate-400 dark:fill-slate-500'
                      }`}
                    />

                    {/* Pill label */}
                    <g className="transition-all duration-300">
                      <rect
                        x={pillX}
                        y={pillY}
                        width={pillWidth}
                        height="24"
                        rx="12"
                        className={`transition-all duration-300 ${
                          isSelected
                            ? 'fill-amber-500 dark:fill-amber-400 stroke-amber-600 dark:stroke-amber-300 shadow-md'
                            : 'fill-white/95 dark:fill-slate-900/95 stroke-slate-300 dark:stroke-slate-700'
                        }`}
                        strokeWidth="1.5"
                      />
                      <text
                        x={pillX + pillWidth / 2}
                        y={pillY + 16}
                        textAnchor="middle"
                        className={`font-mono text-[11px] font-semibold pointer-events-none transition-colors ${
                          isSelected ? 'fill-slate-950 font-bold' : 'fill-slate-800 dark:fill-slate-200'
                        }`}
                      >
                        {area.shortLabel}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right Column: Creative Animated Capability Cards (Col 7-12) */}
          <div className="lg:col-span-6 space-y-3">
            {FOCUS_AREAS.map((area, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={area.id}
                  onClick={() => onSelectArea(activeAreaId === area.id ? -1 : area.id)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 border flex items-start gap-4 backdrop-blur-md shadow-md ${
                    isSelected
                      ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/60 shadow-amber-500/10 scale-[1.02] ring-2 ring-amber-500/20'
                      : 'bg-white/85 dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800/90 hover:border-amber-400/50 hover:bg-white dark:hover:bg-slate-850 hover:scale-[1.01]'
                  }`}
                >
                  {/* Status diode & glyph */}
                  <div className="shrink-0 pt-0.5">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {isSelected ? (
                        <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif font-bold text-base text-slate-900 dark:text-slate-100">
                        {area.label}
                      </h3>
                      {isSelected && (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30 shrink-0 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                          <span>ACTIVE FOCUS</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {area.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
