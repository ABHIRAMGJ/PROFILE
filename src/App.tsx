import React, { useState, useEffect } from 'react';
import { Navbar } from './components/global/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { OpenToWork } from './components/sections/OpenToWork';
import { Projects } from './components/sections/Projects';
import { ExperienceEducation } from './components/sections/ExperienceEducation';
import { PublicationsCertificates } from './components/sections/PublicationsCertificates';
import { Contact } from './components/sections/Contact';
import { ScrollHUD } from './components/global/ScrollHUD';
import { FocusLens } from './components/global/FocusLens';
import { CommandPalette } from './components/global/CommandPalette';
import { ResumeModal } from './components/global/ResumeModal';
import { SDLCPhases } from './components/sections/SDLCPhases';
import { CaseStudyModal } from './components/sections/CaseStudyModal';
import { StackNetwork } from './components/sections/StackNetwork';
import { MagneticCursor } from './components/global/MagneticCursor';
import { CinematicBackgroundCanvas } from './components/global/CinematicBackgroundCanvas';
import { ScrollReveal } from './components/global/ScrollReveal';
import { RecruiterFastTrack } from './components/global/RecruiterFastTrack';
import { ProfessionalConnectHub } from './components/global/ProfessionalConnectHub';
import { CyberdeckTerminal } from './components/global/CyberdeckTerminal';
import { ProjectItem } from './types/portfolio';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    try {
      return (localStorage.getItem('portfolio_theme') as any) || 'system';
    } catch {
      return 'system';
    }
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('portfolio_theme') || 'system';
      if (stored === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return stored === 'dark';
    } catch {
      return false;
    }
  });

  const [activeFocusAreaId, setActiveFocusAreaId] = useState<number>(-1);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);
  const [activeSection, setActiveSection] = useState('top');

  // Handle theme changes
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    try {
      localStorage.setItem('portfolio_theme', newTheme);
    } catch {
      // ignore
    }

    const dark =
      newTheme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : newTheme === 'dark';

    setIsDarkMode(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.dataset.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.dataset.theme = 'light';
    }
  };

  // System theme listener
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
          document.documentElement.dataset.theme = 'dark';
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.dataset.theme = 'light';
        }
      }
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [theme]);

  // Global keyboard shortcuts (Ctrl+K / Cmd+K and direct section shortcuts 2, 3, 4, 5, 7, etc.)
  useEffect(() => {
    const sectionKeyMap: { [key: string]: string } = {
      '1': 'top',
      '2': 'about',
      '3': 'sdlc',
      '4': 'skills',
      '5': 'open',
      '6': 'projects',
      '7': 'stack',
      '8': 'experience',
      '9': 'certificates',
      '0': 'contact',
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette with Cmd+K / Ctrl+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Check if user is typing in an input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('[role="dialog"]') !== null;

      if (!isInput && !commandPaletteOpen && !resumeModalOpen && !selectedCaseStudy) {
        // Direct single-key shortcuts: 2 (About), 3 (SDLC), 4 (Skills), 5 (Open to Work), 7 (Tech Stack)
        if (sectionKeyMap[e.key]) {
          const targetId = sectionKeyMap[e.key];
          const el = document.getElementById(targetId);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            el.setAttribute('tabindex', '-1');
            el.focus({ preventScroll: true });
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, resumeModalOpen, selectedCaseStudy]);

  // Section observer for Navbar and ScrollHUD active link (including 2: About, 3: SDLC, 4: Skills, 5: Open, 7: Stack)
  useEffect(() => {
    const sectionIds = ['top', 'about', 'sdlc', 'skills', 'open', 'projects', 'stack', 'experience', 'certificates', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-900 dark:selection:text-amber-200 relative">
      {/* Real & Creative Background Stardust & Constellation Animations */}
      <CinematicBackgroundCanvas isDarkMode={isDarkMode} />

      {/* Navigation */}
      <Navbar
        currentTheme={theme}
        onThemeChange={handleThemeChange}
        onOpenResume={() => setResumeModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Section 01: Hero (with Image 01 3D Orbital Sculpture) */}
        <Hero
          isDarkMode={isDarkMode}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        {/* Recruiter Fast-Track Quick Lens Filter (P3-4) */}
        <RecruiterFastTrack
          activeAreaId={activeFocusAreaId}
          onSelectArea={(id) => setActiveFocusAreaId(id)}
          isDarkMode={isDarkMode}
        />

        {/* User Requested: Creative & Professional Connect Hub (GitHub, LinkedIn, LeetCode, Email) + Live Viewership Tracker */}
        <ProfessionalConnectHub isDarkMode={isDarkMode} />

        {/* 1 of 6: Section 02 About - Scroll Reveal from Right */}
        <ScrollReveal direction="right">
          <About
            isDarkMode={isDarkMode}
            onOpenCaseStudy={(name) => {
              const found = PROJECTS.find((p) => p.name === name);
              if (found) setSelectedCaseStudy(found);
            }}
          />
        </ScrollReveal>

        {/* 2 of 6: SDLC Phases — Scroll Reveal from Right */}
        <ScrollReveal direction="right">
          <SDLCPhases isDarkMode={isDarkMode} />
        </ScrollReveal>

        {/* 3 of 6: Skills & System Architecture — Scroll Reveal from Right */}
        <ScrollReveal direction="right">
          <Skills
            isDarkMode={isDarkMode}
            activeFocusAreaId={activeFocusAreaId}
          />
        </ScrollReveal>

        {/* 4 of 6: Open to Work & Roles Network — Scroll Reveal from Right */}
        <ScrollReveal direction="right">
          <OpenToWork
            activeAreaId={activeFocusAreaId}
            onSelectArea={(id) => setActiveFocusAreaId(id)}
            isDarkMode={isDarkMode}
          />
        </ScrollReveal>

        {/* 5 of 6: Projects Showcase & Case Studies — Scroll Reveal from Right */}
        <ScrollReveal direction="right">
          <Projects
            activeFocusAreaId={activeFocusAreaId}
            onOpenCaseStudy={(project) => setSelectedCaseStudy(project)}
            isDarkMode={isDarkMode}
          />
        </ScrollReveal>

        {/* Projects × Tech Stack Matrix */}
        <StackNetwork
          onOpenCaseStudy={(name) => {
            const found = PROJECTS.find((p) => p.name === name);
            if (found) setSelectedCaseStudy(found);
          }}
          isDarkMode={isDarkMode}
        />

        {/* 6 of 6: Section 05 Experience & Education Timeline — Scroll Reveal from Right */}
        <ScrollReveal direction="right">
          <ExperienceEducation activeFocusAreaId={activeFocusAreaId} isDarkMode={isDarkMode} />
        </ScrollReveal>

        {/* Section 06: Scholarly Publication & Certificates */}
        <PublicationsCertificates isDarkMode={isDarkMode} />

        {/* Section 07: Contact & Inquiries */}
        <Contact onOpenResume={() => setResumeModalOpen(true)} isDarkMode={isDarkMode} />
      </main>

      {/* Cyberdeck Interactive Terminal CLI Hologram (P1-7) */}
      <CyberdeckTerminal
        onOpenResume={() => setResumeModalOpen(true)}
        onThemeChange={handleThemeChange}
      />

      {/* Floating Global HUD & Interactive Controls */}
      <ScrollHUD />

      <FocusLens
        activeAreaId={activeFocusAreaId}
        onSelectArea={(id) => setActiveFocusAreaId(id)}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onThemeChange={handleThemeChange}
        onOpenResume={() => setResumeModalOpen(true)}
        onSelectProject={(id) => {
          const found = PROJECTS.find((p) => p.id === id);
          if (found) setSelectedCaseStudy(found);
        }}
      />

      {/* Modals */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* Point 7: Magnetic Cursor & Ambient Photon Dust Trail */}
      <MagneticCursor />
    </div>
  );
}
