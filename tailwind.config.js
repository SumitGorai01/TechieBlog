/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        '4xl': '1920px',
      },
      fontFamily: {
        sans: [
          "Inter",
          "sans-serif",
          "Source Sans 3",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        heading: ["Montserrat", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      colors: {
        primary: "#0A84FF",
        secondary: "#e68e37",
        dark: "#4B4B4B",
        light: "#FAF9F6",
      },

      keyframes: {
        wave: {
          "0%": { transform: "translateX(0px)", transform: "translateZ(45%)" },
          "100%": { transform: "translateX(500px)" },
        },
      },

      animation: {
        "waving-hand": "wave 2s linear infinite",
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, -55%) scale(0.95)",
          },
          "100%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
