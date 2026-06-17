import { Certificate, certificates } from "./certificates-data";

export interface KnowledgeNode extends Certificate {
  spatialPosition: [number, number, number];
  connections: string[]; // IDs of related skills or projects
}

// Map the certificates to knowledge nodes with spatial positioning
export const knowledgeNodes: KnowledgeNode[] = certificates.map((cert, index) => {
  // Create a deep corridor distribution
  const angle = index * 0.5;
  const radius = 8 + Math.random() * 4;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle * 0.5) * 5; // Wave effect
  const z = -index * 12; // Spread out along the path

  return {
    ...cert,
    spatialPosition: [x, y, z],
    connections: [],
  };
});
