"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useConnectionStore } from "@/lib/store/useConnectionStore";

const skillCategories = [
  {
    name: "Data Science",
    color: "#00E5FF",
    skills: ["Python", "TensorFlow", "PyTorch", "Pandas", "Machine Learning", "Deep Learning"],
    position: [6, 0, 0] as [number, number, number],
  },
  {
    name: "Full Stack",
    color: "#7000FF",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL"],
    position: [-6, 0, 0] as [number, number, number],
  },
  {
    name: "Android",
    color: "#00FF94",
    skills: ["Kotlin", "Java", "Android Studio", "Firebase", "Jetpack Compose"],
    position: [0, 6, 0] as [number, number, number],
  },
  {
    name: "Security",
    color: "#FF0055",
    skills: ["Burp Suite", "OWASP", "Nmap", "Wireshark", "Kali Linux", "PenTesting"],
    position: [0, -6, 0] as [number, number, number],
  },
];

function SkillNode({ name, color, position, skills }: { name: string, color: string, position: [number, number, number], skills: string[] }) {
  const [hovered, setHovered] = useState(false);
  const activeSkillIds = useConnectionStore((state) => state.activeSkillIds);
  const isHighlighted = skills.some(s => activeSkillIds.includes(s));
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y += Math.sin(t + position[0]) * 0.005;
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={isHighlighted ? 1.4 : 1}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={isHighlighted ? "#00FFF2" : color}
            emissive={isHighlighted ? "#00FFF2" : color}
            emissiveIntensity={hovered || isHighlighted ? 4 : 0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
        {hovered && (
          <group position={[0, -2, 0]}>
            {skills.map((skill, i) => (
              <Text
                key={skill}
                position={[0, -i * 0.4, 0]}
                fontSize={0.3}
                color={color}
                anchorX="center"
              >
                {skill}
              </Text>
            ))}
          </group>
        )}
      </Float>
    </group>
  );
}

function SkillGalaxy() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    groupRef.current.rotation.y += 0.002;
  });

  return (
    <group ref={groupRef}>
      {skillCategories.map((cat, i) => (
        <SkillNode key={cat.name} {...cat} />
      ))}

      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={5} />
      </mesh>

      {[6, 8, 10].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.02, 64]} />
          <meshBasicMaterial color="white" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function SkillsUniverse() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="h-screen w-full relative py-24 bg-secondary/30" id="skills">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center z-10">
        <h2 className="text-sm font-mono text-accent-blue tracking-[0.5em] uppercase mb-4">
          // Technical Ecosystem
        </h2>
        <h3 className="text-4xl font-bold">SKILL GALAXY</h3>
        <p className="text-white/40 text-xs mt-2 font-mono uppercase tracking-widest">Interact to explore my expertise</p>
      </div>

      {isMounted && (
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <SkillGalaxy />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      )}

      <div className="absolute bottom-12 left-6 right-6 flex justify-between items-end pointer-events-none">
        <div className="glass p-4 border-l-2 border-accent-blue max-w-xs">
          <p className="text-[10px] font-mono text-white/60 leading-relaxed uppercase">
            Data Science focus on Neural Networks and Predictive Analytics using Python/TensorFlow.
          </p>
        </div>
        <div className="glass p-4 border-r-2 border-accent-purple max-w-xs text-right">
          <p className="text-[10px] font-mono text-white/60 leading-relaxed uppercase">
            Full Stack Development with a focus on React/Next.js and secure Node.js backends.
          </p>
        </div>
      </div>
    </section>
  );
}
