/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ffc: {
          charcoal: "#0B0B0B",
          black: "#111111",
          surface: "#181818",
          card: "#1F1F1F",
          cardBorder: "#2E2E2E",
          cardHover: "#282828",
          red: "#E6391F",
          redDark: "#B8240F",
          redLight: "#FF5238",
          orange: "#FF6A00",
          orangeLight: "#FF8833",
          gold: "#FFB000",
          goldLight: "#FFCC4D",
          cream: "#F4E9DA",
          warmWhite: "#FFF8F0",
          darkBrown: "#2A1710",
          smoke: "#777777",
          muted: "#9E9E9E",
          fire: "#FF4500",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "Sora", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        fire: "0 0 35px -5px rgba(230, 57, 31, 0.45)",
        gold: "0 0 30px -5px rgba(255, 176, 0, 0.4)",
        orange: "0 0 35px -5px rgba(255, 106, 0, 0.45)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.7)",
        float: "0 20px 40px -15px rgba(230, 57, 31, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1.5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        steam: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "50%": { opacity: "0.8" },
          "100%": { transform: "translateY(-40px) scaleX(1.4)", opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        sizzle: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "25%": { transform: "scale(1.02) rotate(-1deg)" },
          "75%": { transform: "scale(0.99) rotate(1deg)" },
        },
        fireErupt: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.15)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "0.9" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
        steam: "steam 2.5s ease-out infinite",
        shimmer: "shimmer 1.5s infinite",
        sizzle: "sizzle 0.3s ease-in-out infinite",
        fireErupt: "fireErupt 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "fire-gradient": "linear-gradient(135deg, #E6391F 0%, #FF6A00 50%, #FFB000 100%)",
        "dark-radial": "radial-gradient(circle at 50% 50%, #1f1412 0%, #0B0B0B 75%)",
      },
    },
  },
  plugins: [],
};
