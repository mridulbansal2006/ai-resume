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
        bg: "#08090d",
        surface: "#0f1118",
        "surface-2": "#161922",
        border: "#1e2230",
        accent: "#f97316",
        info: "#06b6d4",
        success: "#22c55e",
        ai: "#a78bfa",
        danger: "#ef4444",
        warn: "#eab308",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(249, 115, 22, 0.3), 0 0 24px rgba(249,115,22,0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "pulse-dot": "pulseDot 1.4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        pulseDot: {
          "0%, 80%, 100%": { opacity: "0.3" },
          "40%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
