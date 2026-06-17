"use client";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SkillsUniverse from "@/components/sections/SkillsUniverse";
import ProjectUniverse from "@/components/projects/ProjectUniverse";
import KnowledgeArchive from "@/certifications/certificate-components";
import MLDashboard from "@/visualization/ml-dashboard";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Background3D from "@/components/3d/Background3D";
import AIAssistant from "@/components/shared/AIAssistant";
import Terminal from "@/components/shared/Terminal";

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
