import React, { useState } from 'react';
import { Sparkles, X, Check } from 'lucide-react';
import { FOCUS_AREAS } from '../../data/portfolioData';

interface FocusLensProps {
  activeAreaId: number;
  onSelectArea: (areaId: number) => void;
}

export const FocusLens: React.FC<FocusLensProps> = ({
  activeAreaId,
  onSelectArea,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 250 || activeAreaId >= 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeAreaId]);

  if (!isVisible) return null;

  const activeArea = FOCUS_AREAS.find((a) => a.id === activeAreaId);

  return (
    <div className="fixed left-5 bottom-5 z-40 animate-fadeIn">
      {/* Floating Focus Lens Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-mono text-xs font-semibold shadow-lg transition-all border ${
          activeAreaId >= 0
            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/20'
            : 'bg-slate-900/90 dark:bg-white text-white dark:text-slate-900 border-slate-700 dark:border-slate-300 hover:scale-105'
        }`}
        aria-label="Open focus lens"
        aria-expanded={isOpen}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{activeArea ? `Focus: ${activeArea.shortLabel}` : 'Focus Lens'}</span>
        {activeAreaId >= 0 && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onSelectArea(-1);
            }}
            className="p-0.5 rounded-full hover:bg-black/20"
            title="Clear focus"
          >
            <X className="w-3 h-3" />
          </span>
        )}
      </button>

      {/* Popover Selection Menu */}
      {isOpen && (
        <div className="absolute bottom-12 left-0 w-72 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl p-2 font-sans text-xs animate-fadeIn space-y-1">
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400">
              Filter by Domain
            </span>
            {activeAreaId >= 0 && (
              <button
                onClick={() => {
                  onSelectArea(-1);
                  setIsOpen(false);
                }}
                className="font-mono text-[10px] text-amber-600 dark:text-amber-400 hover:underline"
              >
                Reset All
              </button>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto space-y-0.5">
            <button
              onClick={() => {
                onSelectArea(-1);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                activeAreaId === -1
                  ? 'bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span>Show All Disciplines</span>
              {activeAreaId === -1 && <Check className="w-3.5 h-3.5 text-teal-500" />}
            </button>

            {FOCUS_AREAS.map((area) => {
              const isSelected = activeAreaId === area.id;
              return (
                <button
                  key={area.id}
                  onClick={() => {
                    onSelectArea(area.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    isSelected
                      ? 'bg-amber-500/10 text-amber-900 dark:text-amber-200 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                      0{area.id + 1}
                    </span>
                    <span>{area.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-500" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
