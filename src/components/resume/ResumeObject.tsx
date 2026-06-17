"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Text, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export default function ResumeObject({ onOpen }: { onOpen: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) * 0.2;
      meshRef.current.rotation.y = Math.sin(t / 4) * 0.2;
      meshRef.current.position.y = Math.sin(t / 2) * 0.1;
    }
  });

  return (
    <group position={[3, 1, -2]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onOpen}
          scale={hovered ? 1.2 : 1}
        >
          {/* Holographic Data Cube */}
          <boxGeometry args={[1, 1, 1]} />
          <MeshDistortMaterial
            color={hovered ? "#00FFF2" : "#00E5FF"}
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={1}
            transparent
            opacity={0.7}
            emissive={hovered ? "#00FFF2" : "#00E5FF"}
            emissiveIntensity={hovered ? 5 : 1}
          />

          {/* Internal Wireframe */}
          <mesh scale={0.8}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.3} />
          </mesh>
        </mesh>

        <Text
          position={[0, -1, 0]}
          fontSize={0.15}
          color="#00E5FF"
          anchorX="center"
        >
          PERSONNEL_ARCHIVE.bin
        </Text>

        {hovered && (
          <Sparkles count={20} scale={2} size={2} speed={0.4} color="#00FFF2" />
        )}
      </Float>
    </group>
  );
}
