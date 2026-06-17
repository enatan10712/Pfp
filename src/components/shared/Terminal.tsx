"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { useTerminal } from "@/terminal/terminal-hooks";

export default function Terminal() {
  const { isOpen, setIsOpen, history, execute, isMounted } = useTerminal();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    await execute(input);

    if (cmd === "resume" || cmd === "cv") {
      // Small delay for terminal immersion
      setTimeout(() => {
        setIsOpen(false);
        // Find the Hero section CTA and click it or just use an event emitter
        window.dispatchEvent(new CustomEvent("open-resume"));
      }, 1000);
    }

    setInput("");
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-24 bg-background/80 backdrop-blur-xl"
        >
          <div className="w-full max-w-4xl h-full glass border-accent-green/30 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,255,148,0.1)]">
            {/* Toolbar */}
            <div className="p-3 border-b border-accent-green/20 flex items-center justify-between bg-accent-green/5">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-accent-green" />
                <span className="text-[10px] font-mono text-accent-green uppercase tracking-widest">SYSTEM_TERMINAL@ROOT</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-accent-green/40 hover:text-accent-green transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 font-mono text-xs md:text-sm text-accent-green/80 overflow-y-auto space-y-2 scrollbar-thin">
              {history.map((line, i) => (
                <div key={i} className={line.startsWith(">") ? "text-accent-cyan" : ""}>
                  {line}
                </div>
              ))}
              <form onSubmit={handleCommand} className="flex items-center gap-2">
                <span className="text-accent-cyan">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-accent-green focus:ring-0 p-0"
                  autoFocus
                />
              </form>
            </div>

            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
