/**
 * Lenis Compatibility Layer
 * Wraps the current Lenis implementation to allow for future swappable upgrades.
 */

import { ReactLenis } from "@studio-freight/react-lenis";

export const LenisProvider = ReactLenis;

export type LenisRef = {
  lenis: any;
};

export const useLenisCompat = () => {
  // Add any version-specific logic here if needed
  return {};
};
