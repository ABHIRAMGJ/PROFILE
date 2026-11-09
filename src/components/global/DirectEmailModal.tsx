import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  X,
  ExternalLink,
  Send,
  Sparkles,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface DirectEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

export const DirectEmailModal: React.FC<DirectEmailModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = 'Software Engineering Opportunity — Gummaraju Jaswanth Abhiram',
}) => {
  const primaryEmail = PERSONAL_INFO.email; // gjaviram001@gmail.com
  const ccEmail = (PERSONAL_INFO as any).alternateEmail || 'gjabhiram001@gmail.com';

  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setFeedback('Email address copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
        setFeedback(null);
      }, 3000);
    } catch {
      // fallback
    }
  };

  const constructBody = () => {
    let body = message.trim();
    if (senderName || senderEmail) {
      body += `\n\n—\nFrom: ${senderName || 'Recruiter / Engineer'}\nContact: ${senderEmail || 'Not specified'}`;
    }
    return body || 'Hi Jaswanth,\n\nI came across your engineering portfolio and would like to connect regarding software engineering opportunities.\n\nBest regards,';
  };

  const handleOpenGmail = () => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(constructBody());
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${primaryEmail}&cc=${ccEmail}&su=${encodedSubject}&body=${encodedBody}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setFeedback('Opening Gmail compose tab...');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleOpenOutlook = () => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(constructBody());
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${primaryEmail}&subject=${encodedSubject}&body=${encodedBody}`;
    window.open(outlookUrl, '_blank', 'noopener,noreferrer');
    setFeedback('Opening Outlook web compose tab...');
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleOpenDefaultClient = () => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(constructBody());
    const mailtoUrl = `mailto:${primaryEmail}?cc=${ccEmail}&subject=${encodedSubject}&body=${encodedBody}`;
    // Use an invisible anchor click to trigger mailto without top-navigation blocks
    const a = document.createElement('a');
    a.href = mailtoUrl;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setFeedback('Triggered default system email app (mailto)...');
    setTimeout(() => setFeedback(null), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="direct-email-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 flex flex-col my-auto laser-border-glow"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/70 dark:bg-slate-800/40">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3
                  id="direct-email-modal-title"
                  className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100"
                >
                  Send Direct Priority Email
                </h3>
                <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Direct reach to Gummaraju Jaswanth Abhiram
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {/* Direct Email Address Display Box with 1-Click Copy */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider block">
                  Verified Destination Inboxes
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 select-all">
                    {primaryEmail}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold">
                    Primary
                  </span>
                </div>
                {ccEmail && (
                  <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    CC Sync: <span className="select-all text-slate-700 dark:text-slate-300">{ccEmail}</span>
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleCopy(primaryEmail)}
                className={`px-3.5 py-2 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  copied
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>

            {/* Quick Webmail Client Launchers (100% Guaranteed to work on all browsers) */}
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Launch in Your Preferred Email Client:</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* 1. Gmail Web */}
                <button
                  type="button"
                  onClick={handleOpenGmail}
                  className="p-3 rounded-2xl border border-red-500/25 bg-red-50/60 dark:bg-red-950/20 hover:bg-red-100/60 dark:hover:bg-red-950/40 text-red-700 dark:text-red-300 transition-all cursor-pointer flex flex-col items-center text-center gap-1 shadow-xs group"
                >
                  <span className="font-bold font-sans text-xs flex items-center gap-1">
                    Gmail Web
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <span className="font-mono text-[10px] text-red-600/80 dark:text-red-400/80">
                    Recommended (Instant)
                  </span>
                </button>

                {/* 2. Default Desktop App */}
                <button
                  type="button"
                  onClick={handleOpenDefaultClient}
                  className="p-3 rounded-2xl border border-blue-500/25 bg-blue-50/60 dark:bg-blue-950/20 hover:bg-blue-100/60 dark:hover:bg-blue-950/40 text-blue-700 dark:text-blue-300 transition-all cursor-pointer flex flex-col items-center text-center gap-1 shadow-xs group"
                >
                  <span className="font-bold font-sans text-xs flex items-center gap-1">
                    Default Mail App
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <span className="font-mono text-[10px] text-blue-600/80 dark:text-blue-400/80">
                    Outlook / Apple Mail
                  </span>
                </button>

                {/* 3. Outlook.com Web */}
                <button
                  type="button"
                  onClick={handleOpenOutlook}
                  className="p-3 rounded-2xl border border-sky-500/25 bg-sky-50/60 dark:bg-sky-950/20 hover:bg-sky-100/60 dark:hover:bg-sky-950/40 text-sky-700 dark:text-sky-300 transition-all cursor-pointer flex flex-col items-center text-center gap-1 shadow-xs group"
                >
                  <span className="font-bold font-sans text-xs flex items-center gap-1">
                    Outlook.com Web
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <span className="font-mono text-[10px] text-sky-600/80 dark:text-sky-400/80">
                    Live / Hotmail Web
                  </span>
                </button>
              </div>
            </div>

            {/* In-Modal Quick Message Customizer */}
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Quick Message Customization (Optional):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Sarah / Tech Recruiter)"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                />
              </div>

              <textarea
                rows={3}
                placeholder="Type your message or role details here... (Will automatically pre-fill into your email compose window)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/40 resize-none"
              />
            </div>

            {/* Notification Feedback Toast */}
            {feedback && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-mono text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{feedback}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-500" />
                <span>&lt; 24h Response</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Tirupati, India</span>
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleOpenGmail}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-mono text-xs font-semibold shadow-md shadow-teal-500/20 cursor-pointer flex items-center justify-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Compose in Gmail</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
