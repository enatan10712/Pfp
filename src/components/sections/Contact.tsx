"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-mono text-accent-blue tracking-[0.5em] uppercase mb-4">
              // Establish Connection
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8">GET IN TOUCH</h3>
            <p className="text-white/60 leading-relaxed mb-12 max-w-md">
              Whether you have a question about a project, want to discuss a potential collaboration, or just want to say hello, my inbox is always open.
            </p>

            <div className="space-y-6">
              <a href="mailto:contact@example.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 glass flex items-center justify-center group-hover:border-accent-blue transition-colors">
                  <Mail className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Email</div>
                  <div className="text-white/80 group-hover:text-white transition-colors">hello@archive.dev</div>
                </div>
              </a>

              <div className="flex gap-4 pt-6">
                 {[
                   { icon: Github, href: "#" },
                   { icon: Linkedin, href: "#" },
                   { icon: Twitter, href: "#" },
                 ].map((social, i) => (
                   <a
                    key={i}
                    href={social.href}
                    className="w-12 h-12 glass flex items-center justify-center hover:border-accent-blue hover:text-accent-blue transition-all"
                   >
                     <social.icon className="w-5 h-5" />
                   </a>
                 ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 border-white/5"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Identification</label>
                  <input
                    type="text"
                    placeholder="NAME"
                    style={{ caretColor: "#00E5FF" }}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent-blue/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Comm_Channel</label>
                  <input
                    type="email"
                    placeholder="EMAIL"
                    style={{ caretColor: "#00E5FF" }}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent-blue/50 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Transmission_Data</label>
                <textarea
                  rows={5}
                  placeholder="YOUR MESSAGE..."
                  style={{ caretColor: "#00E5FF" }}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-accent-blue/50 transition-colors resize-none"
                />
              </div>
              <button className="w-full py-4 bg-accent-blue text-background font-bold flex items-center justify-center gap-2 hover:bg-accent-cyan transition-all group">
                SEND TRANSMISSION <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
