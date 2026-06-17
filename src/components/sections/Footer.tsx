"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-blue rounded-full" />
              ARCHIVE_OS
            </div>
            <div className="text-[10px] font-mono text-white/30 uppercase mt-2">
              Built with Next.js, Three.js & Passion
            </div>
          </div>

          <div className="flex gap-8 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
            <a href="#about" className="hover:text-accent-blue transition-colors">About</a>
            <a href="#projects" className="hover:text-accent-blue transition-colors">Projects</a>
            <a href="#skills" className="hover:text-accent-blue transition-colors">Skills</a>
            <a href="#contact" className="hover:text-accent-blue transition-colors">Contact</a>
          </div>

          <div className="text-[10px] font-mono text-white/20">
            © 2024 ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </div>
    </footer>
  );
}
