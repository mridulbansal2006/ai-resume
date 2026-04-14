import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#030406",
        surface: "#0d0f14",
        "surface-2": "#161922",
        border: "#1e2230",
        accent: {
          DEFAULT: "#7c3aed",
          hover: "#6d28d9",
          glow: "rgba(124, 58, 237, 0.3)",
        },
        info: "#06b6d4",
        success: "#10b981",
        ai: "#a78bfa",
        danger: "#f43f5e",
        warn: "#f59e0b",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(124, 58, 237, 0.15)",
        "glow-lg": "0 0 30px rgba(124, 58, 237, 0.25)",
      },
      backgroundImage: {
        "mesh-gradient": "radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(244, 63, 94, 0.05) 0px, transparent 50%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
