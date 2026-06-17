"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { KnowledgeNode } from "./knowledge-nodes";
import { useConnectionStore } from "@/lib/store/useConnectionStore";

export default function KnowledgeObject({ node, onSelect }: { node: KnowledgeNode, onSelect: (node: KnowledgeNode) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const activeSkillIds = useConnectionStore((state) => state.activeSkillIds);
  const isHighlighted = node.skills.some(s => activeSkillIds.includes(s));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y += 0.01;
    meshRef.current.position.y += Math.sin(t + node.spatialPosition[0]) * 0.002;
  });

  return (
    <group position={node.spatialPosition}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onSelect(node)}
          scale={isHighlighted ? 1.5 : 1}
        >
          {/* Crystal-like geometry */}
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color={hovered || isHighlighted ? "#00FFF2" : "#00E5FF"}
            distort={isHighlighted ? 0.6 : 0.3}
            speed={2}
            roughness={0}
            metalness={1}
            transparent
            opacity={0.6}
            emissive={hovered || isHighlighted ? "#00FFF2" : "#00E5FF"}
            emissiveIntensity={hovered || isHighlighted ? 4 : 0.5}
          />
        </mesh>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          maxWidth={2}
          textAlign="center"
        >
          {node.title}
        </Text>
        {hovered && (
          <mesh position={[0, 0, 0]}>
             <sphereGeometry args={[1.5, 32, 32]} />
             <meshBasicMaterial color="#00FFF2" transparent opacity={0.05} wireframe />
          </mesh>
        )}
      </Float>
    </group>
  );
}
