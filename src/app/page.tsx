"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

// Heavy 3D and Interactive components loaded dynamically
const Background3D = dynamic(() => import("@/components/3d/Background3D"), { ssr: false });
const SkillsUniverse = dynamic(() => import("@/components/sections/SkillsUniverse"), { ssr: false });
const ProjectUniverse = dynamic(() => import("@/components/projects/ProjectUniverse"), { ssr: false });
const KnowledgeArchive = dynamic(() => import("@/certifications/certificate-components"), { ssr: false });
const MLDashboard = dynamic(() => import("@/visualization/ml-dashboard"), { ssr: false });
const ExperienceTimeline = dynamic(() => import("@/components/sections/ExperienceTimeline"), { ssr: false });
const AIAssistant = dynamic(() => import("@/components/shared/AIAssistant"), { ssr: false });
const Terminal = dynamic(() => import("@/components/shared/Terminal"), { ssr: false });

export default function Home() {
  return (
    <>
      <Background3D />
      <Hero />
      <About />
      <SkillsUniverse />
      <ProjectUniverse />
      <KnowledgeArchive />
      <MLDashboard />
      <ExperienceTimeline />
      <Contact />
      <Footer />

      {/* Overlay UI */}
      <AIAssistant />
      <Terminal />
    </>
  );
}
