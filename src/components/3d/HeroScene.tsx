"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Line } from "@react-three/drei";
import * as THREE from "three";
import ResumeObject from "@/components/resume/ResumeObject";

export default function NeuralNetwork({ onResumeOpen }: { onResumeOpen?: () => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  const nodes = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ),
      size: Math.random() * 0.1 + 0.05,
    }));
  }, []);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.1;
    groupRef.current.rotation.x += delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[2, 64, 64]}>
          <MeshDistortMaterial
            color="#00E5FF"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={1}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </Float>

      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshStandardMaterial color="#00FFF2" emissive="#00FFF2" emissiveIntensity={2} />
        </mesh>
      ))}

      {nodes.map((node, i) => (
        <Line
          key={`line-${i}`}
          points={[node.position, nodes[(i + 1) % nodes.length].position]}
          color="#00E5FF"
          lineWidth={1}
          transparent
          opacity={0.2}
        />
      ))}

      {onResumeOpen && <ResumeObject onOpen={onResumeOpen} />}
    </group>
  );
}
