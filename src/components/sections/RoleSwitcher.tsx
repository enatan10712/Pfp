"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Data Scientist",
  "Full Stack Developer",
  "Android App Developer",
  "Web Pentester",
];

export default function RoleSwitcher() {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return <div className="h-12 flex items-center text-xl sm:text-2xl font-mono text-accent-cyan">{roles[0]}</div>;

  return (
    <div className="h-12 overflow-hidden flex items-center justify-center sm:justify-start">
      <AnimatePresence mode="wait">
        <motion.div
          key={roles[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-xl sm:text-2xl font-mono text-accent-cyan"
        >
          {roles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
