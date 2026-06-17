"use client";

import { motion } from "framer-motion";
import { Shield, Database, Code, Smartphone } from "lucide-react";

const stats = [
  { label: "Projects Completed", value: "50+", icon: Code },
  { label: "Technologies Mastered", value: "25+", icon: Database },
  { label: "Security Audits", value: "15+", icon: Shield },
  { label: "App Installs", value: "100k+", icon: Smartphone },
];

export default function About() {
  return (
    <section className="py-24 relative overflow-hidden" id="about">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-mono text-accent-blue tracking-[0.5em] uppercase mb-4">
              // Professional Profile
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8">
              A Multidisciplinary <br />
              <span className="text-white/40">Technologist.</span>
            </h3>
            <p className="text-white/60 leading-relaxed mb-6">
              With a foundation in Computer Science and a passion for complex problem-solving, I specialize in bridging the gap between raw data and impactful applications.
            </p>
            <p className="text-white/60 leading-relaxed mb-10">
              Whether it's training deep learning models, architecting scalable web ecosystems, developing intuitive mobile experiences, or securing digital assets through penetration testing — I approach every project with a "security-first" mindset and a dedication to technical excellence.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 border-l-2 border-accent-blue/30 group hover:border-accent-blue transition-all"
                >
                  <stat.icon className="w-6 h-6 text-accent-blue mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs font-mono text-white/40 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square glass relative flex items-center justify-center p-8 group overflow-hidden">
               {/* Aesthetic abstract geometric shape */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
               <div className="w-full h-full border border-white/10 relative flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-accent-purple/20 animate-[spin_20s_linear_infinite]" />
                  <div className="absolute w-1/2 h-1/2 border border-accent-blue/20 animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl font-black text-white/5 font-mono select-none">AI</span>
                  </div>
               </div>

               {/* Terminal-like overlay */}
               <div className="absolute bottom-4 left-4 right-4 glass p-4 text-[10px] font-mono text-white/30 space-y-1">
                  <div>{">"} SYSTEM_INIT: SUCCESS</div>
                  <div>{">"} LOADING_CORE_PHILOSOPHY...</div>
                  <div>{">"} "Simplicity is the ultimate sophistication."</div>
                  <div>{">"} "Security is not a product, but a process."</div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
