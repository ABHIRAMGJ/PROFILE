import React from 'react';
import { X, Download, Printer, ExternalLink, Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCE, EDUCATION, PUBLICATION, SKILL_CATEGORIES } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden text-slate-800 dark:text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-base text-slate-900 dark:text-slate-100">
              {PERSONAL_INFO.fullName}
            </span>
            <span className="font-mono text-xs text-slate-500 hidden sm:inline">
              · Official Curriculum Vitae
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono font-medium transition-colors"
              title="Print one-page resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <a
              href={`/${PERSONAL_INFO.resumeFileName}`}
              download
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-mono font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 font-sans bg-white dark:bg-slate-900">
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left">
            <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {PERSONAL_INFO.fullName}
            </h1>
            <p className="font-mono text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-semibold mt-1">
              Software Engineer | Full-Stack Development & Applied AI
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 font-mono text-xs text-slate-500 mt-2">
              <span>{PERSONAL_INFO.location}</span>
              <span>·</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-teal-600 dark:text-teal-400 hover:underline">
                {PERSONAL_INFO.email}
              </a>
              <span>·</span>
              <span>{PERSONAL_INFO.phone}</span>
              <span>·</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
              <span>·</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
            </div>
          </div>

          {/* Professional Objective */}
          <section className="space-y-2">
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1">
              Objective & Profile
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Full-stack and applied-AI software engineer (B.Tech CSE, CGPA 9.31/10) with an IEEE-published paper on LLM-based resume analysis. Builds complete web applications with React, Node.js, FastAPI, and PostgreSQL — from REST APIs, session workflows, and user roles to approval processes and real-time multiplayer features. Seeking an SDE / Software Engineer role to ship reliable products that solve genuine user problems.
            </p>
          </section>

          {/* Core Technical Competencies */}
          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Programming: </span>
                <span className="text-slate-600 dark:text-slate-400">Java, Python, SQL, C (Basic)</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Frontend: </span>
                <span className="text-slate-600 dark:text-slate-400">React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Backend & APIs: </span>
                <span className="text-slate-600 dark:text-slate-400">Node.js, Express.js, FastAPI, REST APIs, RBAC</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Databases: </span>
                <span className="text-slate-600 dark:text-slate-400">PostgreSQL, MySQL, MongoDB</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">AI & GenAI: </span>
                <span className="text-slate-600 dark:text-slate-400">Generative AI, RAG, Prompt Engineering, Gemini API (Text & Vision)</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">DevOps & Tools: </span>
                <span className="text-slate-600 dark:text-slate-400">Git, GitHub, GitHub Actions (CI/CD), Docker, Linux CLI</span>
              </div>
            </div>
          </section>

          {/* Work Experience */}
          <section className="space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1">
              Work Experience
            </h2>
            {WORK_EXPERIENCE.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {exp.role} <span className="font-normal text-slate-500">· {exp.organization}</span>
                  </h3>
                  <span className="font-mono text-xs text-amber-600 dark:text-amber-400">
                    {exp.period}
                  </span>
                </div>
                {exp.bullets && (
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1">
              Education
            </h2>
            <div className="space-y-2">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{edu.degree}</span>
                    <span className="text-slate-500"> — {edu.institution}</span>
                  </div>
                  <div className="font-mono text-slate-500">
                    <span>{edu.period}</span> · <span className="font-bold text-amber-600 dark:text-amber-400">{edu.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Published Research */}
          <section className="space-y-2">
            <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1">
              Published Research
            </h2>
            <div className="text-xs space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">
                {PUBLICATION.title}
              </h3>
              <p className="font-mono text-teal-600 dark:text-teal-400">
                {PUBLICATION.venue} — {PUBLICATION.year}
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {PUBLICATION.summary}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
