import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Copy, Check, Send, Download, MapPin, Heart, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { ClassicSpotlightBackdrop } from '../global/ClassicSpotlightBackdrop';

interface ContactProps {
  onOpenResume: () => void;
  isDarkMode?: boolean;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume, isDarkMode = true }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    message: string;
    status: 'idle' | 'sending' | 'success' | 'error';
    feedback: string;
  }>({
    name: '',
    email: '',
    message: '',
    status: 'idle',
    feedback: 'Messages are delivered straight to my personal inbox.',
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${PERSONAL_INFO.fullName}
TITLE:Software Engineer
TEL:${PERSONAL_INFO.phone}
EMAIL:${PERSONAL_INFO.email}
URL:${PERSONAL_INFO.github}
ADR:;;;Tirupati;;;India
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Gummaraju_Jaswanth_Abhiram.vcf';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({
      ...prev,
      status: 'sending',
      feedback: 'Sending message...',
    }));

    // Construct mailto link fallback with formatted subject and body
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${formState.name}`
    )}&body=${encodeURIComponent(
      `From: ${formState.name} (${formState.email})\n\n${formState.message}`
    )}`;

    // Open Gmail web compose in a new tab for 100% reliability
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=${encodeURIComponent(
      `Portfolio Inquiry from ${formState.name}`
    )}&body=${encodeURIComponent(
      `From: ${formState.name} (${formState.email})\n\n${formState.message}`
    )}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    // Also trigger mailto fallback
    try {
      const a = document.createElement('a');
      a.href = mailtoUrl;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      // ignore
    }

    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        message: '',
        status: 'success',
        feedback: 'Opened in your email client. Looking forward to speaking!',
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Classic Architectural Backdrop with Warm Studio Spotlights & Brick Texture */}
      <ClassicSpotlightBackdrop spotlights={3} intensity="medium" isDarkMode={isDarkMode} />

      <div className="max-w-[1720px] w-full mx-auto px-6 sm:px-10 lg:px-14 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase">
              Direct Inquiries & Collaboration
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Have an interesting problem to build? Let's talk.
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
            FAST EMAIL RESPONSE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Nodes & VCard (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              I am actively seeking <span className="font-semibold text-slate-900 dark:text-slate-100">Software Engineer / SDE</span> opportunities in full-stack engineering, backend systems, and applied AI. The fastest way to reach me is email — I usually reply within 24 hours.
            </p>

            {/* Contact Nodes Stack */}
            <div className="space-y-3 font-mono text-xs">
              {/* Email */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Email</span>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-800 dark:text-slate-200 hover:underline font-medium"
                      title={`Open Gmail compose to ${PERSONAL_INFO.email}`}
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  title="Copy email address"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-teal-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-teal-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Phone</span>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="text-slate-800 dark:text-slate-200 hover:underline font-medium">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  title="Copy phone number"
                >
                  {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-teal-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Location */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Location</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* VCard & Direct Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleSaveVCard}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-mono text-xs font-semibold transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Contact Card (.vcf)</span>
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10 font-mono text-xs font-semibold transition-all"
              >
                <span>View Full Résumé</span>
              </button>
            </div>
          </div>

          {/* Right Column: Direct Messaging Form (Col 6-12) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-mono text-xs uppercase text-slate-500 font-semibold block">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs uppercase text-slate-500 font-semibold block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="e.g. s.jenkins@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs uppercase text-slate-500 font-semibold block">
                  Project or Opportunity Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your team, the problem you're solving, or how we might collaborate..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 transition-colors resize-y"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={formState.status === 'sending'}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-amber-600 dark:bg-slate-100 dark:hover:bg-amber-400 text-white dark:text-slate-900 dark:hover:text-slate-950 font-mono text-xs font-semibold shadow-md transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>

                <p className="font-mono text-xs text-slate-400">
                  {formState.feedback}
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Editorial Footer */}
        <footer className="pt-12 border-t border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 Gummaraju Jaswanth Abhiram.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Press <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">Ctrl + K</kbd> for quick command search</span>
          </div>
        </footer>
      </div>
    </section>
  );
};
