import React, { useState, useEffect } from 'react';
import { Sun, Moon, Laptop, Menu, X, Download, FileText, Eye } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface NavbarProps {
  currentTheme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onThemeChange,
  onOpenResume,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', num: '2' },
    { label: 'SDLC', href: '#sdlc', num: '3' },
    { label: 'Skills', href: '#skills', num: '4' },
    { label: 'Open to Work', href: '#open', num: '5' },
    { label: 'Projects', href: '#projects', num: '6' },
    { label: 'Tech Stack', href: '#stack', num: '7' },
    { label: 'Experience', href: '#experience', num: '8' },
    { label: 'Certificates', href: '#certificates', num: '9' },
    { label: 'Contact', href: '#contact', num: '0' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      (target as HTMLElement).focus({ preventScroll: true });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#0D0F13]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, '#top')}
          className="font-serif font-semibold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5"
        >
          <span>G. J.</span>
          <span className="text-amber-600 dark:text-amber-400">Abhiram</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block"></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors relative py-1 text-xs xl:text-sm flex items-center gap-1.5 ${
                  isActive
                    ? 'text-slate-900 dark:text-slate-100 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full animate-fadeIn" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Theme Switcher & Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme segmented control */}
          <div
            className="flex items-center p-0.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400"
            role="group"
            aria-label="Theme Switcher"
          >
            <button
              onClick={() => onThemeChange('light')}
              className={`p-1.5 rounded-full transition-all ${
                currentTheme === 'light'
                  ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-2xs'
                  : 'hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Light theme"
              aria-label="Switch to light theme"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              className={`p-1.5 rounded-full transition-all ${
                currentTheme === 'dark'
                  ? 'bg-slate-900 text-amber-400 shadow-2xs'
                  : 'hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Dark theme"
              aria-label="Switch to dark theme"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onThemeChange('system')}
              className={`p-1.5 rounded-full transition-all ${
                currentTheme === 'system'
                  ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-2xs'
                  : 'hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Auto / System theme"
              aria-label="Use system color scheme"
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Prominent Preview Resume CTA Button on Navbar */}
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-500/50 dark:border-amber-400/50 bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-200 font-mono text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group"
            title="Preview Resume"
            aria-label="Preview Resume"
          >
            <Eye className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Preview Resume</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D0F13] px-6 py-5 space-y-2 animate-fadeIn max-h-[75vh] overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center justify-between font-medium text-sm py-2 px-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 font-semibold'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850'
                }`}
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                  {link.num}
                </span>
              </a>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">Official Résumé</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
