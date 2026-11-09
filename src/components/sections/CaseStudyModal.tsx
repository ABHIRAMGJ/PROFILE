import React, { useState } from 'react';
import { X, ExternalLink, GitBranch, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';
import { DeviceShowcase3D } from '../3d/DeviceShowcase3D';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  if (!project || !project.caseStudy) return null;

  const cs = project.caseStudy;
  const currentFlow = cs.flows[0];
  const activeStep = currentFlow?.steps[activeStepIndex] || currentFlow?.steps[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden text-slate-800 dark:text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div>
            <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
              Case Study Explorer
            </span>
            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {project.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono font-medium transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 text-teal-500" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-mono font-medium transition-colors"
              >
                <span>GitHub</span>
                <GitBranch className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 font-sans">
          {/* Objective summary */}
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase text-slate-400 font-bold">
              Project Objective
            </span>
            <p className="font-serif text-xl text-slate-800 dark:text-slate-100 leading-snug">
              {cs.objective}
            </p>
          </div>

          {/* Point 10: 3D Interactive Device Showcase (MacBook & Mobile) */}
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase text-slate-400 font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>3D Hardware Interactive Preview</span>
            </span>
            <DeviceShowcase3D
              projectName={project.name}
              projectTag={project.title}
              isDarkMode={true}
            />
          </div>

          {/* Problem vs Approach Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-red-200/50 dark:border-red-900/30 bg-red-50/40 dark:bg-red-950/20 space-y-2">
              <span className="font-mono text-xs uppercase font-bold text-red-600 dark:text-red-400">
                The Problem
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {cs.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-teal-200/50 dark:border-teal-900/30 bg-teal-50/40 dark:bg-teal-950/20 space-y-2">
              <span className="font-mono text-xs uppercase font-bold text-teal-600 dark:text-teal-400">
                The Engineering Approach
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {cs.approach}
              </p>
            </div>
          </div>

          {/* Interactive Workflow Stepper */}
          {currentFlow && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-slate-400 font-bold">
                  Workflow Execution: {currentFlow.title}
                </span>
                <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold">
                  Step {activeStepIndex + 1} of {currentFlow.steps.length}
                </span>
              </div>

              {/* Stepper buttons */}
              <div className="flex flex-wrap gap-2">
                {currentFlow.steps.map((st, idx) => (
                  <button
                    key={st.stepNumber}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                      idx === activeStepIndex
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <span>0{st.stepNumber}</span>
                    <span className="font-sans font-medium">{st.name}</span>
                  </button>
                ))}
              </div>

              {/* Active Step detail */}
              {activeStep && (
                <div className="p-4 rounded-xl border-l-4 border-l-amber-500 border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 text-sm">
                  <span className="font-bold font-sans text-slate-900 dark:text-slate-100 block mb-1">
                    {activeStep.name}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeStep.description}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* System Architecture */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase text-slate-400 font-bold">
              Architecture & Data Flow
            </span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {cs.architecture}
            </p>
          </div>

          {/* Implemented Features */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase text-slate-400 font-bold">
              Key Shipped Capabilities
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
              {cs.implementedFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
