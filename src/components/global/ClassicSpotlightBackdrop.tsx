import React from 'react';

interface ClassicSpotlightBackdropProps {
  isDarkMode?: boolean;
  spotlights?: number; // 2 or 3 architectural gallery spotlights
  showTexture?: boolean;
  intensity?: 'subtle' | 'medium' | 'ambient';
}

export const ClassicSpotlightBackdrop: React.FC<ClassicSpotlightBackdropProps> = ({
  isDarkMode = true,
  spotlights = 3,
  showTexture = true,
  intensity = 'medium',
}) => {
  const textureOpacity = isDarkMode
    ? intensity === 'subtle' ? 0.16 : intensity === 'medium' ? 0.24 : 0.32
    : intensity === 'subtle' ? 0.08 : intensity === 'medium' ? 0.12 : 0.18;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* 1. Classic Architectural Texture Layer (Sample Image: Warm Studio Brick & Mortar Texture) */}
      {showTexture && (
        <div
          className="absolute inset-0 bg-cover bg-top pointer-events-none transition-opacity duration-700"
          style={{
            backgroundImage: `url('/assets/aistudio/Screenshot_2026-11-06_154356_e97763df.png')`,
            opacity: textureOpacity,
            filter: isDarkMode
              ? 'contrast(1.22) saturate(1.15) brightness(0.85)'
              : 'contrast(1.1) saturate(1.05) brightness(1.05)',
            mixBlendMode: isDarkMode ? 'screen' : 'multiply',
          }}
        />
      )}

      {/* 2. Three Classic Studio Spotlight Cones (Exact visual signature from sample image) */}
      {spotlights === 3 && (
        <>
          {/* Spotlight Left */}
          <div
            className="absolute -top-10 left-[12%] w-[420px] h-[520px] pointer-events-none"
            style={{
              background: isDarkMode
                ? 'radial-gradient(ellipse 55% 80% at 50% 0%, rgba(245, 158, 11, 0.26) 0%, rgba(212, 175, 55, 0.08) 45%, transparent 75%)'
                : 'radial-gradient(ellipse 55% 80% at 50% 0%, rgba(245, 158, 11, 0.18) 0%, rgba(212, 175, 55, 0.05) 45%, transparent 75%)',
            }}
          />
          {/* Spotlight Center */}
          <div
            className="absolute -top-10 left-[50%] -translate-x-1/2 w-[520px] h-[600px] pointer-events-none"
            style={{
              background: isDarkMode
                ? 'radial-gradient(ellipse 55% 80% at 50% 0%, rgba(254, 240, 138, 0.28) 0%, rgba(245, 158, 11, 0.12) 40%, transparent 75%)'
                : 'radial-gradient(ellipse 55% 80% at 50% 0%, rgba(254, 240, 138, 0.22) 0%, rgba(245, 158, 11, 0.07) 40%, transparent 75%)',
            }}
          />
          {/* Spotlight Right */}
          <div
            className="absolute -top-10 right-[12%] w-[420px] h-[520px] pointer-events-none"
            style={{
              background: isDarkMode
                ? 'radial-gradient(ellipse 55% 80% at 50% 0%, rgba(56, 189, 248, 0.24) 0%, rgba(14, 165, 233, 0.07) 45%, transparent 75%)'
                : 'radial-gradient(ellipse 55% 80% at 50% 0%, rgba(56, 189, 248, 0.16) 0%, rgba(14, 165, 233, 0.04) 45%, transparent 75%)',
            }}
          />
        </>
      )}

      {/* 3. Deep Architectural Studio Vignette & Contrast Guard (Guarantees 100% Text Legibility) */}
      <div
        className={`absolute inset-0 transition-all duration-700 pointer-events-none ${
          isDarkMode
            ? 'bg-gradient-to-b from-[#0a0d14]/70 via-[#0a0d14]/85 to-[#0a0d14]/95'
            : 'bg-gradient-to-b from-[#f8f6f0]/75 via-[#f8f6f0]/88 to-[#f8f6f0]/96'
        }`}
      />

      {/* 4. Fine Millimeter Precision Grid Overlay */}
      <div
        className={`absolute inset-0 opacity-12 ${
          isDarkMode
            ? 'bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)]'
        } bg-[size:56px_56px]`}
      />
    </div>
  );
};
