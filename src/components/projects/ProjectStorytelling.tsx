"use client";

import { motion } from "framer-motion";
import { X, ExternalLink, Github, ArrowRight, Layers, Target, Shield, Zap } from "lucide-react";
import { Project } from "@/data/projects";
import Image from "next/image";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ProjectStorytelling({ project, onClose }: { project: Project, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[4000] bg-background/95 backdrop-blur-3xl overflow-y-auto"
    >
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-10 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 glass border-accent-blue/30 flex items-center justify-center text-accent-blue font-bold">
            {project.id.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="text-xs font-mono text-accent-blue uppercase tracking-widest">{project.category}</h4>
            <h3 className="text-2xl font-bold tracking-tighter">{project.title}</h3>
          </div>
        </div>
        <button onClick={onClose} className="p-3 glass border-white/10 hover:bg-white/10 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="container mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Story Section */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="show"
          className="space-y-16"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 text-accent-cyan mb-4">
              <Target className="w-4 h-4" />
              <h5 className="text-[10px] font-mono uppercase tracking-[0.3em]">The_Mission</h5>
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-white/40 text-[10px] uppercase block mb-1">Problem:</span>
                <p className="text-xl text-white/80 font-light">{project.story.problem}</p>
              </div>
              <div>
                <span className="text-white/40 text-[10px] uppercase block mb-1">Objective:</span>
                <p className="text-xl text-accent-blue font-medium">{project.story.goal}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 text-accent-purple mb-4">
              <Layers className="w-4 h-4" />
              <h5 className="text-[10px] font-mono uppercase tracking-[0.3em]">Architecture_Matrix</h5>
            </div>
            <p className="text-white/60 leading-relaxed">
              {project.story.architecture}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
               {project.technologies.map(tech => (
                 <div key={tech} className="p-4 glass border-white/5 bg-white/5 flex items-center gap-3">
                   <div className="w-1.5 h-1.5 bg-accent-blue rounded-full" />
                   <span className="text-xs font-mono">{tech}</span>
                 </div>
               ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 text-accent-green mb-4">
              <Zap className="w-4 h-4" />
              <h5 className="text-[10px] font-mono uppercase tracking-[0.3em]">Outcome_Report</h5>
            </div>
            <div className="p-8 glass-premium border-accent-green/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Shield className="w-20 h-20" />
               </div>
               <p className="text-accent-green text-2xl font-bold mb-2">{project.story.results}</p>
               <p className="text-white/40 text-xs font-mono italic">Verified operational success metrics.</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8 flex gap-6">
            <a href={project.liveUrl} className="flex-1 py-4 bg-accent-blue text-background font-bold flex items-center justify-center gap-2 hover:bg-accent-cyan transition-colors">
              LAUNCH_APPLICATION <ExternalLink className="w-4 h-4" />
            </a>
            <a href={project.githubUrl} className="px-8 py-4 glass border-white/10 hover:bg-white/5 flex items-center justify-center gap-2 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Visual Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative sticky top-32 h-[calc(100vh-200px)] flex flex-col"
        >
          <div className="flex-1 relative glass border-white/10 overflow-hidden shadow-2xl mb-8">
             <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            {/* Holographic interface overlay */}
            <div className="absolute inset-0 p-12 flex flex-col justify-end">
              <div className="space-y-4">
                 {project.features.map((feature, i) => (
                   <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    key={feature}
                    className="flex items-center gap-3 text-sm text-white/80"
                   >
                     <ArrowRight className="w-4 h-4 text-accent-blue" />
                     {feature}
                   </motion.div>
                 ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 h-32">
             <div className="glass border-white/5 bg-white/5 flex items-center justify-center font-mono text-[10px] text-white/30 uppercase tracking-widest text-center">
               STATUS:<br/><span className={project.status === "Completed" ? "text-accent-green" : "text-accent-blue"}>{project.status}</span>
             </div>
             <div className="col-span-2 glass border-white/5 bg-white/5 p-4 flex flex-col justify-center">
                <span className="text-[10px] text-white/20 uppercase mb-1">Core_Engine</span>
                <span className="text-xs font-mono text-white/60">{project.technologies[0]} + {project.technologies[1]}</span>
             </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
