"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, Sparkles } from "lucide-react";
import { INITIAL_GREETING, SUGGESTED_PROMPTS } from "@/ai/prompts";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: INITIAL_GREETING },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages as any);

    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const reader = response.body?.getReader();
      const decoder = new TextEncoder().encode(); // Correct way to decode streaming is TextDecoder

      let aiContent = "";
      setMessages(prev => [...prev, { role: "ai", content: "" }]);

      if (reader) {
        const textDecoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = textDecoder.decode(value);
          aiContent += chunk;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "ai", content: aiContent };
            return updated;
          });
        }

        // Trigger resume if keyword detected in final content
        if (aiContent.toLowerCase().includes("personnel archive") || aiContent.toLowerCase().includes("holographic viewer")) {
          setTimeout(() => {
            setIsOpen(false);
            window.dispatchEvent(new CustomEvent("open-resume"));
          }, 1500);
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", content: "Neural link interrupted. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Orb */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[500] w-14 h-14 bg-accent-blue rounded-full shadow-[0_0_20px_rgba(0,229,255,0.5)] flex items-center justify-center group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue via-accent-cyan to-accent-purple opacity-50 group-hover:rotate-90 transition-transform duration-500" />
        <MessageSquare className="relative w-6 h-6 text-background" />
        <div className="absolute inset-0 animate-pulse bg-white/20" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-8 z-[500] w-[90vw] md:w-[400px] h-[500px] glass border-white/10 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent-blue" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest">ARCHIVE_AI</div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-accent-green rounded-full animate-pulse" />
                    <span className="text-[10px] text-accent-green/70 font-mono">ONLINE</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "ai" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`max-w-[80%] p-4 text-sm ${
                    msg.role === "ai"
                    ? "bg-white/5 border border-white/10 rounded-2xl rounded-tl-none"
                    : "bg-accent-blue text-background font-medium rounded-2xl rounded-tr-none"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-accent-blue rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-accent-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-accent-blue rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input & Suggestions */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTED_PROMPTS.slice(0, 3).map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => setInput(prompt)}
                    className="text-[10px] font-mono px-3 py-1 bg-white/5 border border-white/10 hover:border-accent-blue/30 transition-colors text-white/40 hover:text-accent-blue"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Query the archive..."
                  className="flex-1 bg-background/50 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-accent-blue/50"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-accent-blue text-background flex items-center justify-center hover:bg-accent-cyan transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
