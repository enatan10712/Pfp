"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    period: "2022 - PRESENT",
    role: "Senior Full Stack Engineer",
    company: "Tech Frontier Systems",
    description: "Leading the development of secure, AI-powered web applications and cloud infrastructure.",
  },
  {
    period: "2020 - 2022",
    role: "Data Scientist & ML Engineer",
    company: "Data Nexus AI",
    description: "Focused on developing computer vision models and optimizing data pipelines for enterprise clients.",
  },
  {
    period: "2018 - 2020",
    role: "Android Developer",
    company: "Mobile Waves",
    description: "Built high-performance Android applications using Kotlin and integrated complex backend APIs.",
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="py-24" id="experience">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-mono text-accent-blue tracking-[0.5em] uppercase mb-4">
            // Professional Evolution
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold">CAREER TIMELINE</h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-blue via-accent-purple to-transparent -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-background border-2 border-accent-blue rounded-full -translate-x-1/2 z-10 hidden md:block" />

                <div className="flex-1 md:w-1/2">
                  <div className={`glass p-8 border-white/5 hover:border-accent-blue/30 transition-colors ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                    <div className="text-accent-blue font-mono text-xs mb-2">{exp.period}</div>
                    <h4 className="text-xl font-bold mb-1">{exp.role}</h4>
                    <div className="text-white/40 text-sm mb-4 uppercase tracking-widest">{exp.company}</div>
                    <p className="text-white/60 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
                <div className="flex-1 md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
