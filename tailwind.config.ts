import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#06070A",
        secondary: "#111318",
        accent: {
          blue: "#00E5FF",
          cyan: "#00FFF2",
          purple: "#7000FF",
          green: "#00FF94",
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)"],
        sans: ["var(--font-geist-sans)"],
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
        "cyber-grid": "linear-gradient(to right, #111318 1px, transparent 1px), linear-gradient(to bottom, #111318 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
