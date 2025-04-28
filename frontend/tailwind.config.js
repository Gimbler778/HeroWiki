// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all relevant files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // Add typography plugin
    require('daisyui'), // Add daisyui plugin
  ],
  // Optional: DaisyUI configuration (themes, etc.)
  daisyui: {
    themes: ["light", "night", "cupcake"], // Include light and night themes
    darkTheme: "night", // Set night as the default dark theme
  },
}
