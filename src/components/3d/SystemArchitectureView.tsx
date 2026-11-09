import React, { useState } from 'react';
import { ArrowRight, Server, Database, Brain, Globe, ShieldCheck, CheckCircle2, Cpu } from 'lucide-react';

interface SystemNode {
  id: string;
  name: string;
  role: string;
  tech: string[];
  icon: typeof Globe;
  description: string;
  verifications: string[];
  sampleFlow: string;
}

const ARCHITECTURE_NODES: SystemNode[] = [
  {
    id: 'client',
    name: 'Client Interface Layer',
    role: 'Frontend Presentation & User Interaction',
    tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Three.js'],
    icon: Globe,
    description:
      'Engineered for rapid initial page load (25% faster via route splitting and asset compression), responsive layouts, and zero-flicker client-side state.',
    verifications: ['Accessible DOM tree & ARIA roles', 'Sub-800ms Time-to-Interactive', 'Mobile touch & pointer controls'],
    sampleFlow: 'User submits resume file or civic issue photo -> client validates MIME type & payload boundaries.',
  },
  {
    id: 'gateway',
    name: 'API Gateway & Security',
    role: 'REST Routing, Rate Limiting & Access Control',
    tech: ['FastAPI', 'Node.js / Express', 'JWT Auth', 'RBAC Security'],
    icon: ShieldCheck,
    description:
      'Implements 3-tier Role-Based Access Control (Citizen, Officer, Commissioner in CivicFix) with strict payload schema validation before handing off requests.',
    verifications: ['Input boundary sanitation', 'JWT session token validation', 'CORS & rate-limiting policies'],
    sampleFlow: 'Parses incoming authorization header -> verifies cryptographic signature -> routes payload to business logic.',
  },
  {
    id: 'ai-rag',
    name: 'Applied AI & RAG Engine',
    role: 'Retrieval-Augmented Generation & Multimodal Vision',
    tech: ['Gemini API', 'Gemini Vision', 'Dense Vector Retrieval', 'Custom Prompt Engineering'],
    icon: Brain,
    description:
      'Powers evidence-grounded resume matching and civic photo classification. Grounded citations ensure every match cites exact document quotes to eliminate hallucinations.',
    verifications: ['Strict factual grounding check', 'Structured JSON output enforcement', 'Empirically verified in IEEE 2026 paper'],
    sampleFlow: 'Retrieves pertinent resume vectors -> calls Gemini with strict evidence criteria -> yields grounded match ratings.',
  },
  {
    id: 'database',
    name: 'Data Persistence & Integrity',
    role: 'Relational & Document Storage',
    tech: ['PostgreSQL', 'MySQL', 'MongoDB', 'ACID Transactions'],
    icon: Database,
    description:
      'Structured relational tables for user roles, tickets, and audit trails. Complex queries detect duplicate submissions and maintain historical delivery logs.',
    verifications: ['Foreign key constraints & indexing', 'Duplicate detection queries', 'Permanent before/after audit records'],
    sampleFlow: 'Stores ticket state changes with timestamps -> prevents duplicate records -> updates user history.',
  },
  {
    id: 'devops',
    name: 'CI/CD & Delivery',
    role: 'Continuous Integration & Production Monitoring',
    tech: ['GitHub Actions', 'Docker', 'Linux CLI', 'Automated Testing'],
    icon: Server,
    description:
      'Automated pull request pipelines running linting and test suites on every commit to ensure reliable deployments without regressions.',
    verifications: ['Automated GitHub Actions runners', 'Reproducible container environments', 'Zero-downtime rollouts'],
    sampleFlow: 'Code pushed to main -> triggers automated CI lint & test matrix -> builds optimized production bundle.',
  },
];

export const SystemArchitectureView: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('ai-rag');
  const activeNode = ARCHITECTURE_NODES.find((n) => n.id === activeNodeId) || ARCHITECTURE_NODES[0];

  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase">
            System Architecture
          </span>
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            Full-Stack <span className="font-sans font-light text-amber-600 dark:text-amber-400">&</span> Applied AI Data Flow
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
          <Cpu className="w-4 h-4 text-teal-500" />
          <span>Interactive Pipeline</span>
        </div>
      </div>

      {/* Horizontal Interactive Pipeline Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {ARCHITECTURE_NODES.map((node, idx) => {
          const Icon = node.icon;
          const isActive = node.id === activeNodeId;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNodeId(node.id)}
              className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all relative ${
                isActive
                  ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/30 text-teal-900 dark:text-teal-200 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                  0{idx + 1}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`} />
              </div>
              <span className="font-sans font-semibold text-xs leading-tight mb-1 text-slate-800 dark:text-slate-200">
                {node.name}
              </span>
              <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                {node.tech[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Node Detail Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
        <div className="md:col-span-7 space-y-4">
          <div>
            <span className="font-mono text-xs text-teal-600 dark:text-teal-400 font-semibold tracking-wide uppercase">
              {activeNode.role}
            </span>
            <h4 className="font-serif text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              {activeNode.name}
            </h4>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {activeNode.description}
          </p>

          <div className="pt-2">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2 font-medium">
              Technologies Used
            </span>
            <div className="flex flex-wrap gap-2">
              {activeNode.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-2xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col justify-between space-y-4 md:border-l md:border-slate-200 md:dark:border-slate-800 md:pl-6">
          <div>
            <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2 font-medium">
              Engineering Guarantees
            </span>
            <ul className="space-y-2">
              {activeNode.verifications.map((v, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-lg border border-teal-200/60 dark:border-teal-900/50 bg-teal-50/70 dark:bg-teal-950/20 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-mono text-[10px] uppercase font-bold text-teal-700 dark:text-teal-300 block mb-1">
              Sample Pipeline Step
            </span>
            <p className="text-[12px] leading-snug">{activeNode.sampleFlow}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
