"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import HeroScene from "@/components/3d/HeroScene";
import RoleSwitcher from "./RoleSwitcher";
import { ArrowRight, Download, Eye } from "lucide-react";
import ResumeExperience from "@/components/resume/ResumeExperience";

export default function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener("open-resume", handleOpenResume);
    return () => window.removeEventListener("open-resume", handleOpenResume);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#00E5FF" intensity={2} />
          <Suspense fallback={null}>
            <HeroScene onResumeOpen={() => setIsResumeOpen(true)} />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-accent-blue font-mono text-sm tracking-widest uppercase mb-4"
          >
            System Status: Online
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            ARCHITECTING <br />
            <span className="text-white/40">DIGITAL FUTURES</span>
          </h1>

          <RoleSwitcher />

          <p className="mt-6 text-white/60 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Blending Data Science, Security, and Advanced Development to build
            the next generation of immersive digital experiences.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
            <button className="px-8 py-3 bg-accent-blue text-background font-bold rounded-none hover:bg-accent-cyan transition-colors flex items-center gap-2 group">
              VIEW PROJECTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="px-8 py-3 border border-accent-blue/30 bg-accent-blue/5 backdrop-blur-md text-accent-blue font-bold rounded-none hover:bg-accent-blue/10 transition-colors flex items-center gap-2 group"
            >
              OPEN PROFILE <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </motion.div>

        <div className="hidden lg:block relative h-[500px]">
           {/* Decorative elements or additional 3D overlay can go here */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full animate-pulse" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full animate-[ping_3s_linear_infinite]" />
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-2">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent-blue to-transparent" />
      </motion.div>

      <ResumeExperience isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
