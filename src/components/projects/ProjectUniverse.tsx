"use client";

import { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Text, Stars, ContactShadows, PresentationControls } from "@react-three/drei";
import { projects, Project } from "@/data/projects";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import ProjectStorytelling from "./ProjectStorytelling";
import { useConnectionStore } from "@/lib/store/useConnectionStore";

function ProjectNode({ project, onSelect }: { project: Project, onSelect: (p: Project) => void }) {
  const [hovered, setHovered] = useState(false);
  const setActiveProject = useConnectionStore((state) => state.setActiveProject);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(t + project.title.length) * 0.002;
    }
  });

  return (
    <group position={[
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 10
    ]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onPointerOver={() => {
            setHovered(true);
            setActiveProject(project.id, project.technologies);
          }}
          onPointerOut={() => {
            setHovered(false);
            setActiveProject(null);
          }}
          onClick={() => onSelect(project)}
          scale={hovered ? 1.2 : 1}
        >
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial
            color={hovered ? "#00FFF2" : "#00E5FF"}
            distort={hovered ? 0.6 : 0.3}
            speed={2}
            roughness={0}
            metalness={1}
            transparent
            opacity={0.6}
            emissive={hovered ? "#00FFF2" : "#00E5FF"}
            emissiveIntensity={hovered ? 2 : 0.5}
          />
        </mesh>

        <Text
          position={[0, -1.2, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          maxWidth={2}
          textAlign="center"
        >
          {project.title.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
}

export default function ProjectUniverse() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="h-screen w-full relative bg-background overflow-hidden" id="projects">
      <div className="absolute top-12 left-12 z-10">
        <h2 className="text-sm font-mono text-accent-blue tracking-[0.5em] uppercase mb-4">
          // Galactic_Index
        </h2>
        <h3 className="text-4xl font-bold tracking-tighter">PROJECT_UNIVERSE</h3>
        <p className="text-white/40 text-[10px] mt-2 font-mono uppercase tracking-[0.3em]">Exploring digital creations in 3D space</p>
      </div>

      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00E5FF" />

          <PresentationControls
            global
            snap
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            {projects.map((project) => (
              <ProjectNode key={project.id} project={project} onSelect={setSelectedProject} />
            ))}
          </PresentationControls>

          <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
        </Suspense>
      </Canvas>

      <AnimatePresence>
        {selectedProject && (
          <ProjectStorytelling
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
