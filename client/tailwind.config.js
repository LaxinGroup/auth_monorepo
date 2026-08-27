/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // 1. Add DaisyUI to the plugins array
  plugins: [require("daisyui")],
  
  // 2. Configure DaisyUI themes here
  daisyui: {
    themes: ["light", "dark", "luxury"], 
    darkTheme: "dark", // Default theme for OS dark mode
  },
}

