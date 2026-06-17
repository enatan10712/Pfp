"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ZoomIn, ZoomOut, Maximize2, RotateCcw, FileText, Shield, User, Briefcase } from "lucide-react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera, OrbitControls, Environment, MeshDistortMaterial } from "@react-three/drei";
import Image from "next/image";
import * as THREE from "three";

function Resume3D({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;
      meshRef.current.rotation.x = Math.cos(t * 0.5) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <planeGeometry args={[4.5, 6.36]} /> {/* A4 Aspect Ratio approx */}
        <meshStandardMaterial
          emissive="#00E5FF"
          emissiveIntensity={0.1}
          metalness={0.8}
          roughness={0.2}
        >
          {/* We'll overlay the actual image via HTML/CSS for better quality/interaction,
              but the 3D plane provides the perspective depth and lighting base. */}
        </meshStandardMaterial>
      </mesh>
    </Float>
  );
}

export default function ResumeExperience({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[3000] flex flex-col md:flex-row items-center justify-center bg-background/95 backdrop-blur-3xl overflow-hidden"
      >
        {/* Background Particles/Grids */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        </div>

        {/* Toolbar */}
        <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-10 border-b border-white/5 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-2 glass border-accent-blue/30 text-accent-blue">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-mono tracking-[0.3em] uppercase">PERSONNEL_ARCHIVE_SECURE</h2>
              <p className="text-[10px] text-white/40 font-mono">STATUS: CLASSIFIED_PROFILE_ACCESSED</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="p-2 glass hover:text-accent-blue transition-colors">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-2 glass hover:text-accent-blue transition-colors">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button onClick={() => { setZoom(1); setRotation(0); }} className="p-2 glass hover:text-accent-blue transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-2" />
            <button onClick={onClose} className="p-2 glass border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Viewer Area */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center p-12 mt-16 overflow-hidden">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: 45 }}
            animate={{ scale: zoom, opacity: 1, rotateY: rotation }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="relative w-full max-w-2xl aspect-[1/1.414] glass-premium border-accent-blue/20 shadow-2xl group"
          >
            {/* The actual CV Image with Tilt effect */}
            <div className="absolute inset-0 overflow-hidden">
               <Image
                src="/resume-placeholder.jpg" // User will provide actual JPG
                alt="Resume"
                fill
                className="object-contain p-2 opacity-90 group-hover:opacity-100 transition-opacity"
                priority
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-accent-blue/5 to-transparent mix-blend-overlay" />
              <div className="absolute inset-0 pointer-events-none border border-white/5" />
            </div>

            {/* Scan line effect */}
            <motion.div
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[2px] bg-accent-blue/30 shadow-[0_0_10px_rgba(0,229,255,0.5)] z-10"
            />
          </motion.div>
        </div>

        {/* Side Info Panel */}
        <div className="w-full md:w-[400px] h-full border-l border-white/5 bg-white/2[0.02] backdrop-blur-xl p-8 flex flex-col pt-24">
          <div className="space-y-8 overflow-y-auto pr-4 scrollbar-thin">
            <section>
              <div className="flex items-center gap-2 text-accent-blue mb-4">
                <User className="w-4 h-4" />
                <h3 className="text-xs font-mono uppercase tracking-[0.2em]">IDENTITY_PROFILE</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed italic">
                "Multi-disciplinary engineer bridging the gap between deep data insights and immersive user experiences."
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 text-accent-cyan mb-4">
                <Briefcase className="w-4 h-4" />
                <h3 className="text-xs font-mono uppercase tracking-[0.2em]">EXPERIENCE_OVERVIEW</h3>
              </div>
              <div className="space-y-4">
                {[
                  { r: "Lead Full Stack Developer", c: "Future Labs", d: "2023 - Present" },
                  { r: "Data Science Analyst", c: "Neuro Systems", d: "2022 - 2023" }
                ].map((exp, i) => (
                  <div key={i} className="p-3 border border-white/5 bg-white/5 rounded">
                    <div className="text-xs font-bold">{exp.r}</div>
                    <div className="text-[10px] text-white/40">{exp.c} | {exp.d}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
               <div className="flex items-center gap-2 text-accent-purple mb-4">
                <FileText className="w-4 h-4" />
                <h3 className="text-xs font-mono uppercase tracking-[0.2em]">CORE_ATTRIBUTES</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "Three.js", "Python", "Penetration Testing", "Kotlin", "TensorFlow"].map(skill => (
                  <span key={skill} className="text-[9px] font-mono px-2 py-1 bg-accent-blue/10 border border-accent-blue/20 text-accent-blue">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <div className="pt-8">
              <button className="w-full py-4 bg-accent-blue text-background font-bold flex items-center justify-center gap-2 hover:bg-accent-cyan transition-colors">
                DOWNLOAD_DECRYPTED_FILE <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
