import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ArrowRight,
  CornerDownLeft,
  ExternalLink,
  Moon,
  Sun,
  Laptop,
  FileText,
  Home,
  User,
  GitBranch,
  Cpu,
  Layers,
  FolderGit2,
  Table,
  Briefcase,
  Award,
  Mail,
  Compass,
  Sparkles,
  Command,
  X,
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  onOpenResume: () => void;
  onSelectProject?: (projectId: string) => void;
}

type CommandCategory = 'Navigation' | 'Projects' | 'Actions' | 'Theme';

interface CommandItem {
  id: string;
  category: CommandCategory;
  title: string;
  subtitle?: string;
  shortcut?: string;
  icon: React.ElementType;
  iconColor?: string;
  keywords?: string[];
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onThemeChange,
  onOpenResume,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | CommandCategory>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Smooth navigation to target element with accessible focus transfer
  const navigateTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Enhance accessibility: focus target for screen readers & keyboard users
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
  };

  // Full suite of direct navigation shortcuts for each main portfolio section
  const commands: CommandItem[] = [
    // 10 Main Portfolio Section Navigation Shortcuts
    {
      id: 'nav-top',
      category: 'Navigation',
      title: 'Go to Home / Hero Introduction',
      subtitle: '3D Orbital Sculpture, Golden Axis & Engineering Philosophy',
      shortcut: '1',
      icon: Home,
      iconColor: 'text-amber-500',
      keywords: ['hero', 'home', 'top', 'sculpture', 'axis', 'introduction', 'start'],
      action: () => navigateTo('top'),
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: 'Go to About Me',
      subtitle: 'Engineering narrative, credentials & 6 verified track-record stats',
      shortcut: '2',
      icon: User,
      iconColor: 'text-sky-500',
      keywords: ['about', 'story', 'cgpa', 'education', 'narrative', 'mohambabu', 'bio', 'metrics'],
      action: () => navigateTo('about'),
    },
    {
      id: 'nav-sdlc',
      category: 'Navigation',
      title: 'Go to SDLC Lifecycle',
      subtitle: '6-phase engineering process: Requirements to Production Monitoring',
      shortcut: '3',
      icon: GitBranch,
      iconColor: 'text-teal-500',
      keywords: ['sdlc', 'lifecycle', 'phases', 'agile', 'scrum', 'testing', 'deployment', 'process'],
      action: () => navigateTo('sdlc'),
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Go to Skills & Architecture',
      subtitle: 'Interactive 3D Pipeline, Constellation, and Standard Stack Grid',
      shortcut: '4',
      icon: Cpu,
      iconColor: 'text-indigo-500',
      keywords: ['skills', 'tech', 'stack', 'architecture', 'backend', 'java', 'constellation', 'fastapi'],
      action: () => navigateTo('skills'),
    },
    {
      id: 'nav-open',
      category: 'Navigation',
      title: 'Go to Open to Work & Role Graph',
      subtitle: 'SDE Backend, Full-Stack, REST APIs, AI & RAG interactive network',
      shortcut: '5',
      icon: Compass,
      iconColor: 'text-amber-500',
      keywords: ['open to work', 'roles', 'jobs', 'sde', 'backend', 'graph', 'hiring', 'status'],
      action: () => navigateTo('open'),
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Go to Selected Projects',
      subtitle: 'AppendUs, CivicFix, Game Arena, Daybreak production systems',
      shortcut: '6',
      icon: FolderGit2,
      iconColor: 'text-emerald-500',
      keywords: ['projects', 'apps', 'portfolio', 'appendus', 'civicfix', 'game arena', 'daybreak', 'showcase'],
      action: () => navigateTo('projects'),
    },
    {
      id: 'nav-stack',
      category: 'Navigation',
      title: 'Go to Tech Stack Matrix',
      subtitle: 'Interactive cross-reference of frameworks, languages & databases',
      shortcut: '7',
      icon: Table,
      iconColor: 'text-cyan-500',
      keywords: ['matrix', 'stack', 'technologies', 'network', 'cross reference', 'frameworks'],
      action: () => navigateTo('stack'),
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: 'Go to Work Experience & Education',
      subtitle: 'Deloitte trainee, ApexPlanet, SkillForge & Mohan Babu University',
      shortcut: '8',
      icon: Briefcase,
      iconColor: 'text-amber-500',
      keywords: ['experience', 'jobs', 'internships', 'deloitte', 'apexplanet', 'skillforge', 'education', 'degree'],
      action: () => navigateTo('experience'),
    },
    {
      id: 'nav-certificates',
      category: 'Navigation',
      title: 'Go to Publication & Certificates',
      subtitle: 'IEEE 2026 RAG paper & 12 verified industry credentials',
      shortcut: '9',
      icon: Award,
      iconColor: 'text-purple-500',
      keywords: ['certificates', 'publication', 'ieee', 'paper', 'credentials', 'certifications', 'research'],
      action: () => navigateTo('certificates'),
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Go to Contact & Inquiries',
      subtitle: 'Direct messaging form, email, phone & social channels',
      shortcut: '0',
      icon: Mail,
      iconColor: 'text-rose-500',
      keywords: ['contact', 'email', 'message', 'inquiry', 'reach out', 'hire', 'phone', 'connect'],
      action: () => navigateTo('contact'),
    },

    // Individual Projects
    ...PROJECTS.map((p) => ({
      id: `proj-${p.slug}`,
      category: 'Projects' as const,
      title: `Project: ${p.name}`,
      subtitle: `${p.title} · [${p.stack.slice(0, 3).join(', ')}]`,
      icon: FolderGit2,
      iconColor: 'text-emerald-500',
      keywords: ['project', p.name.toLowerCase(), p.title.toLowerCase(), ...p.stack.map((s) => s.toLowerCase())],
      action: () => {
        navigateTo('projects');
        if (onSelectProject) onSelectProject(p.id);
      },
    })),

    // Quick Actions
    {
      id: 'act-resume',
      category: 'Actions',
      title: 'Preview & Download Résumé',
      subtitle: 'Verified single-page academic & professional PDF with previewer',
      shortcut: 'R',
      icon: FileText,
      iconColor: 'text-amber-500',
      keywords: ['resume', 'cv', 'pdf', 'download', 'preview', 'curriculum vitae'],
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'act-github',
      category: 'Actions',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/ABHIRAMGJ',
      icon: ExternalLink,
      iconColor: 'text-slate-400',
      keywords: ['github', 'code', 'git', 'repo', 'commits'],
      action: () => {
        onClose();
        window.open(PERSONAL_INFO.github, '_blank', 'noopener');
      },
    },
    {
      id: 'act-linkedin',
      category: 'Actions',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/gummaraju-jaswanth-abhiram',
      icon: ExternalLink,
      iconColor: 'text-sky-500',
      keywords: ['linkedin', 'network', 'profile', 'connect'],
      action: () => {
        onClose();
        window.open(PERSONAL_INFO.linkedin, '_blank', 'noopener');
      },
    },
    {
      id: 'act-leetcode',
      category: 'Actions',
      title: 'Open LeetCode Profile',
      subtitle: '160+ DSA problems solved in Java & SQL',
      icon: ExternalLink,
      iconColor: 'text-amber-500',
      keywords: ['leetcode', 'dsa', 'algorithms', 'java', 'sql', 'problems'],
      action: () => {
        onClose();
        window.open(PERSONAL_INFO.leetcode, '_blank', 'noopener');
      },
    },

    // Themes
    {
      id: 'theme-light',
      category: 'Theme',
      title: 'Switch to Light Theme',
      subtitle: 'Warm ivory editorial canvas with high-contrast vectors',
      icon: Sun,
      iconColor: 'text-amber-500',
      keywords: ['light', 'theme', 'day', 'white', 'ivory', 'bright'],
      action: () => {
        onThemeChange('light');
        onClose();
      },
    },
    {
      id: 'theme-dark',
      category: 'Theme',
      title: 'Switch to Dark Theme',
      subtitle: 'Deep graphite & cobalt palette with neon glow accents',
      icon: Moon,
      iconColor: 'text-indigo-400',
      keywords: ['dark', 'theme', 'night', 'black', 'graphite'],
      action: () => {
        onThemeChange('dark');
        onClose();
      },
    },
    {
      id: 'theme-system',
      category: 'Theme',
      title: 'Follow System Theme',
      subtitle: 'Automatically sync with operating system preference',
      icon: Laptop,
      iconColor: 'text-teal-400',
      keywords: ['system', 'theme', 'auto', 'os', 'sync'],
      action: () => {
        onThemeChange('system');
        onClose();
      },
    },
  ];

  // Filtering based on search query and category with exact priority for single-digit shortcuts (2, 3, 4, 5, 7, etc.)
  const filtered = commands
    .filter((c) => {
      const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
      if (!matchesCategory) return false;

      if (!query.trim()) return true;

      const q = query.trim().toLowerCase();
      const inShortcut = c.shortcut?.toLowerCase() === q;
      const inTitle = c.title.toLowerCase().includes(q);
      const inSubtitle = c.subtitle?.toLowerCase().includes(q);
      const inCategory = c.category.toLowerCase().includes(q);
      const inKeywords = c.keywords?.some((k) => k.includes(q));

      return inShortcut || inTitle || inSubtitle || inCategory || inKeywords;
    })
    .sort((a, b) => {
      const q = query.trim().toLowerCase();
      if (q) {
        // If query is an exact shortcut match (like '2', '3', '4', '5', '7'), put it at the very top!
        if (a.shortcut?.toLowerCase() === q) return -1;
        if (b.shortcut?.toLowerCase() === q) return 1;
      }
      return 0;
    });

  // Reset selected index when query or category changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Auto-Scrolling Active Item: Smoothly keeps selected item scrolled into view for keyboard accessibility
  useEffect(() => {
    if (filtered[selectedIndex]) {
      const activeEl = document.getElementById(`cmd-item-${filtered[selectedIndex].id}`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex, filtered]);

  // Focus management on open/close
  useEffect(() => {
    if (isOpen) {
      setActiveCategory('All');
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard navigation & accessibility shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (!isNaN(Number(e.key)) && (e.altKey || (!query.trim() && !e.ctrlKey && !e.metaKey))) {
      // Direct numeric shortcut (e.g. 2 for About, 3 for SDLC, 4 for Skills, 5 for Open to Work, 7 for Tech Stack)
      const matched = commands.find((c) => c.category === 'Navigation' && c.shortcut === e.key);
      if (matched) {
        e.preventDefault();
        matched.action();
      }
    }
  };

  if (!isOpen) return null;

  const categories: Array<'All' | CommandCategory> = ['All', 'Navigation', 'Projects', 'Actions', 'Theme'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/65 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette Navigation & Actions"
    >
      <div
        className="w-full max-w-2xl rounded-3xl border border-slate-300 dark:border-slate-700/80 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden font-sans transition-all"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-amber-500 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a section name, project, stack, or press a number (1-0)..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            aria-label="Search sections, projects, or actions"
            aria-controls="command-palette-list"
            aria-activedescendant={filtered[selectedIndex] ? `cmd-item-${filtered[selectedIndex].id}` : undefined}
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-slate-500">
              ESC
            </kbd>
          )}
        </div>

        {/* Quick Category Filter Pills */}
        <div
          className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/50 overflow-x-auto scrollbar-none"
          role="tablist"
          aria-label="Command categories"
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count = cat === 'All' ? commands.length : commands.filter((c) => c.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] opacity-70`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Accessible Results Count Indicator */}
        <div className="sr-only" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'command' : 'commands'} available.
        </div>

        {/* Results List */}
        <div
          id="command-palette-list"
          ref={listRef}
          role="listbox"
          aria-label="Commands"
          className="max-h-[58vh] overflow-y-auto p-2 space-y-1 scrollbar-thin"
        >
          {filtered.length === 0 ? (
            <div className="py-14 text-center space-y-2">
              <Command className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-slate-600 dark:text-slate-400 font-sans text-sm font-medium">
                No matching shortcuts found for "{query}"
              </p>
              <p className="text-slate-400 dark:text-slate-500 font-mono text-xs">
                Try searching "About", "Projects", "Skills", "Deloitte", or "Theme"
              </p>
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`cmd-item-${item.id}`}
                  ref={isSelected ? activeItemRef : undefined}
                  role="option"
                  aria-selected={isSelected}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 dark:bg-amber-500/20 text-slate-900 dark:text-slate-100 shadow-sm border border-amber-500/30'
                      : 'border border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-600 dark:text-amber-400'
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${item.iconColor || ''}`} aria-hidden="true" />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold truncate text-slate-900 dark:text-slate-100">
                          {item.title}
                        </span>
                        {item.shortcut && (
                          <span className="font-mono text-[10px] px-1.5 py-0.2 rounded border border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/80 text-amber-600 dark:text-amber-400 font-bold shrink-0">
                            {item.shortcut}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 truncate font-sans">
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold hidden sm:inline-block">
                      {item.category}
                    </span>
                    {isSelected ? (
                      <CornerDownLeft className="w-4 h-4 text-amber-500 shrink-0 animate-pulse" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 shrink-0" aria-hidden="true" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Guide */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px]">
                ↓
              </kbd>
              <span className="ml-1">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px]">
                ↵
              </kbd>
              <span className="ml-1">Select</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400">
              <kbd className="px-1.5 py-0.5 rounded border border-amber-300/60 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/40 text-[10px]">
                Alt+1..0
              </kbd>
              <span className="ml-1">Jump to section</span>
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Cmd / Ctrl + K</span>
        </div>
      </div>
    </div>
  );
};
