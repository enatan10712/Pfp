"use client";

import { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll, Stars, Line } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { knowledgeNodes, KnowledgeNode } from "./knowledge-nodes";
import KnowledgeObject from "./KnowledgeObject";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Award, Calendar } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function LineConnect({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);

  return (
    <Line
      points={points}
      color="#00E5FF"
      lineWidth={1}
      transparent
      opacity={0.1}
    />
  );
}

function SceneContent({ onSelect }: { onSelect: (node: KnowledgeNode) => void }) {
  const scroll = useScroll();

  useFrame((state) => {
    const offset = scroll.offset;
    const zPos = -offset * 180; // Match the deepened corridor

    state.camera.position.z = 15 + zPos;
    state.camera.position.x = Math.sin(offset * Math.PI * 2) * 5;
    state.camera.position.y = Math.cos(offset * Math.PI) * 3;
    state.camera.lookAt(0, 0, zPos - 20);
  });

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00E5FF" />

      {knowledgeNodes.map((node) => (
        <KnowledgeObject key={node.id} node={node} onSelect={onSelect} />
      ))}

      {knowledgeNodes.slice(0, -1).map((node, i) => (
        <LineConnect
          key={`conn-${i}`}
          start={node.spatialPosition}
          end={knowledgeNodes[i+1].spatialPosition}
        />
      ))}
    </>
  );
}

export default function KnowledgeArchive() {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);

  return (
    <section className="h-[600vh] relative" id="certifications">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute top-12 left-12 z-10">
          <h2 className="text-sm font-mono text-accent-blue tracking-[0.5em] uppercase mb-4">
            // Knowledge Nexus
          </h2>
          <h3 className="text-4xl font-bold tracking-tighter">COGNITIVE_RECORDS.dat</h3>
          <p className="text-white/40 text-[10px] mt-2 font-mono uppercase tracking-[0.3em]">Descending through deep learning archives...</p>
        </div>

        <Canvas camera={{ fov: 45 }}>
          <Suspense fallback={null}>
            <ScrollControls pages={6} damping={0.3}>
              <SceneContent onSelect={setSelectedNode} />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>

      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-3xl glass border-white/10 p-8 md:p-12"
            >
               <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-6 right-6 p-2 glass hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-full md:w-1/3">
                  <div className="aspect-square relative glass border-accent-blue/30 overflow-hidden mb-6">
                    <Image
                      src={selectedNode.image}
                      alt={selectedNode.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-80"
                    />
                  </div>
                  <a
                    href={selectedNode.credentialUrl}
                    target="_blank"
                    className="w-full py-3 bg-accent-blue text-background font-bold flex items-center justify-center gap-2 hover:bg-accent-cyan transition-colors"
                  >
                    VERIFY <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 text-accent-blue mb-2 font-mono text-xs tracking-widest uppercase">
                    <Award className="w-4 h-4" /> {selectedNode.issuer}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{selectedNode.title}</h3>
                  <div className="flex items-center gap-2 text-white/40 font-mono text-xs mb-8">
                    <Calendar className="w-4 h-4" /> {selectedNode.date}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-3">Archive_Entry</h5>
                      <p className="text-white/60 leading-relaxed text-sm">
                        {selectedNode.description}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-3">Technologies_Integrated</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.skills.map(skill => (
                          <span key={skill} className="text-[10px] font-mono px-3 py-1 bg-white/5 border border-white/10 text-accent-cyan">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
