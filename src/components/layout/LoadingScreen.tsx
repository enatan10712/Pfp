"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Simulate real progress but with a minimum duration
    const startTime = Date.now();
    const minDuration = 1500;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min((elapsed / minDuration) * 100, 100);

      setProgress(calculatedProgress);

      if (calculatedProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setIsLoaded(true), 200);
      }
    };

    const frame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isMounted) return null;
  if (isLoaded) return null;

  return (
    <div
      id="loading-screen"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative w-64 h-1 bg-white/10 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-accent-blue"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="font-mono text-accent-blue text-xs tracking-[0.3em] uppercase">
          Initializing AI Systems...
        </div>
        <div className="mt-2 font-mono text-white/40 text-[10px]">
          {Math.round(progress)}%
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
             {Array.from({ length: 20 }).map((_, i) => (
               <div
                 key={i}
                 className="absolute text-[8px] font-mono text-accent-green/30"
                 style={{
                   top: `${(i * 7) % 100}%`,
                   left: `${(i * 13) % 100}%`,
                 }}
               >
                 {((i + 1) * 12345678).toString(16).toUpperCase().substring(0, 8)}
               </div>
             ))}
      </div>
    </div>
  );
}
