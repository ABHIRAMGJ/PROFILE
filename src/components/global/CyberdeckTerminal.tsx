import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Maximize2, Minimize2, Sparkles, Send, CornerDownLeft, ShieldAlert } from 'lucide-react';

interface CyberdeckTerminalProps {
  onOpenResume?: () => void;
  onThemeChange?: (theme: 'light' | 'dark' | 'system') => void;
}

interface CommandLog {
  command?: string;
  output: React.ReactNode;
  time: string;
}

export const CyberdeckTerminal: React.FC<CyberdeckTerminalProps> = ({
  onOpenResume,
  onThemeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-amber-400 font-bold">CYBERDECK SHELL v3.4 [x86_64-engine]</p>
          <p className="text-xs text-slate-400">Gummaraju Jaswanth Abhiram · B.Tech CSE (Mohan Babu University)</p>
          <p className="text-xs text-slate-400">Type <span className="text-amber-300 font-semibold">help</span> to view available commands, or <span className="text-amber-300 font-semibold">resume</span> to launch document viewer.</p>
        </div>
      ),
      time: '00:00:01',
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const now = new Date().toLocaleTimeString();
    const parts = trimmed.split(' ');
    const primary = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let outputNode: React.ReactNode = null;

    switch (primary) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-amber-400 font-bold uppercase tracking-wider">Available Directives:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono">
              <div><span className="text-teal-400 font-semibold">whoami</span> - Identity & academic credentials</div>
              <div><span className="text-teal-400 font-semibold">skills</span> - Core engineering stack</div>
              <div><span className="text-teal-400 font-semibold">projects</span> - Production shipped software</div>
              <div><span className="text-teal-400 font-semibold">resume</span> - Preview complete verified resume</div>
              <div><span className="text-teal-400 font-semibold">contact</span> - Reach out via email or phone</div>
              <div><span className="text-teal-400 font-semibold">theme [light|dark]</span> - Toggle UI theme</div>
              <div><span className="text-teal-400 font-semibold">clear</span> - Flush terminal buffer</div>
              <div><span className="text-teal-400 font-semibold">exit</span> - Minimize cyberdeck terminal</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-amber-400 font-bold">Gummaraju Jaswanth Abhiram</p>
            <p>Role: Software Engineer · Backend Systems · Applied AI & Full-Stack</p>
            <p>Education: B.Tech Computer Science & Engineering (2022–2026)</p>
            <p>Institution: Mohan Babu University (CGPA 9.31 / 10.0)</p>
            <p>Location: Tirupati, Andhra Pradesh, India</p>
            <p className="text-emerald-400">Status: Open to Work · Ready to Build</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-amber-400 font-bold">TECHNICAL COMPETENCIES:</p>
            <p><span className="text-teal-400 font-semibold">Languages:</span> Java (DSA 160+ LeetCode), Python, JavaScript, TypeScript, SQL</p>
            <p><span className="text-teal-400 font-semibold">Backend:</span> REST API Architecture, FastAPI, Node.js, Express, Microservices</p>
            <p><span className="text-teal-400 font-semibold">Databases:</span> PostgreSQL, MySQL, Redis Caching, Vector Databases (ChromaDB)</p>
            <p><span className="text-teal-400 font-semibold">Applied AI:</span> RAG Architectures, Vector Embeddings, LLM Evaluation (IEEE Published)</p>
            <p><span className="text-teal-400 font-semibold">Full-Stack:</span> React, Tailwind CSS, Responsive Systems, State Management</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-amber-400 font-bold">DEPLOYED PRODUCTION APPLICATIONS:</p>
            <div>
              <p className="text-teal-400 font-bold">1. AppendUs - Full-Stack Applied AI Career Platform</p>
              <p className="text-slate-400 pl-3">FastAPI, PostgreSQL, ChromaDB RAG. Live at: <a href="https://appendus.vercel.app" target="_blank" rel="noreferrer" className="underline text-amber-300">appendus.vercel.app</a></p>
            </div>
            <div>
              <p className="text-teal-400 font-bold">2. CivicFix - Smart Urban Grievance Reporting</p>
              <p className="text-slate-400 pl-3">Role-based triage with GPS geolocation tagging. Live at: <a href="https://civicfix.vercel.app" target="_blank" rel="noreferrer" className="underline text-amber-300">civicfix.vercel.app</a></p>
            </div>
            <div>
              <p className="text-teal-400 font-bold">3. Game Arena - Multiplayer Physics Engine</p>
              <p className="text-slate-400 pl-3">HTML5 Canvas + WebSockets real-time sync. Live at: <a href="https://arena-games.vercel.app" target="_blank" rel="noreferrer" className="underline text-amber-300">arena-games.vercel.app</a></p>
            </div>
            <div>
              <p className="text-teal-400 font-bold">4. Daybreak - High-Velocity Modern Workspace</p>
              <p className="text-slate-400 pl-3">Task decomposition & offline local persistence. Live at: <a href="https://daybreak-suite.vercel.app" target="_blank" rel="noreferrer" className="underline text-amber-300">daybreak-suite.vercel.app</a></p>
            </div>
          </div>
        );
        break;

      case 'resume':
        if (onOpenResume) {
          onOpenResume();
          outputNode = <p className="text-emerald-400">✓ Triggered official resume preview modal.</p>;
        } else {
          outputNode = <p className="text-slate-300">Opening resume...</p>;
        }
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-amber-400 font-bold">COMMUNICATION CHANNELS:</p>
            <p>Email: <a href="mailto:gjabhiram001@gmail.com" className="text-teal-300 underline">gjabhiram001@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/abhiram001" target="_blank" rel="noreferrer" className="text-teal-300 underline">github.com/abhiram001</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/jaswanth-abhiram" target="_blank" rel="noreferrer" className="text-teal-300 underline">linkedin.com/in/jaswanth-abhiram</a></p>
            <p>Phone: +91 94943 04564</p>
          </div>
        );
        break;

      case 'theme':
        if (arg === 'light' || arg === 'dark' || arg === 'system') {
          onThemeChange?.(arg as any);
          outputNode = <p className="text-emerald-400">✓ Switched theme to: {arg}</p>;
        } else {
          outputNode = <p className="text-amber-400">Usage: theme [light | dark | system]</p>;
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        setIsOpen(false);
        return;

      default:
        outputNode = (
          <p className="text-rose-400 text-xs">
            Unknown command: &apos;{trimmed}&apos;. Type <span className="text-amber-300 font-bold">help</span> for available commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        output: outputNode,
        time: now,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <>
      {/* Floating Cyberdeck Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-slate-900/90 text-amber-400 border border-amber-500/40 shadow-2xl backdrop-blur-xl hover:scale-105 active:scale-95 hover:border-amber-400 transition-all cursor-pointer group"
        title="Open Cyberdeck Terminal (CLI)"
        aria-label="Open Cyberdeck Terminal (CLI)"
      >
        <div className="relative">
          <Terminal className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-100 hidden sm:inline">
          Cyberdeck CLI
        </span>
      </button>

      {/* Cyberdeck Floating Terminal Window */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 w-[92vw] sm:w-[580px] max-h-[460px] rounded-3xl border border-amber-500/40 bg-slate-950/95 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden text-slate-200 animate-fadeIn">
          {/* Top Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 cursor-pointer" onClick={() => setHistory([])} />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-amber-400 font-bold tracking-wider">
                abhiram@portfolio:~$
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Output Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs scrollbar-thin">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                {item.command && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-amber-400 font-bold">abhiram@dev:~$</span>
                    <span className="text-slate-100 font-semibold">{item.command}</span>
                    <span className="text-[10px] text-slate-600 ml-auto">{item.time}</span>
                  </div>
                )}
                <div>{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Bar */}
          <div className="p-3 bg-slate-900/80 border-t border-slate-800/80 flex items-center gap-2">
            <span className="font-mono text-xs text-amber-400 font-bold pl-1">›</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'skills', 'projects', 'resume'..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-slate-100 placeholder:text-slate-600"
            />
            <button
              type="button"
              onClick={() => handleCommand(inputVal)}
              className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-all cursor-pointer"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
