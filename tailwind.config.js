/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "morandi-pink": "#f8d7e0",
        "morandi-mint": "#c8e6d8",
        "morandi-peach": "#f8e0c8",
        "morandi-sky": "#c8e0f8",
        "morandi-cream": "#f8f0e0",
      },
      borderRadius: {
        "3xl": "2rem",
      },
      boxShadow: {
        "soft": "0 10px 30px -10px rgb(248 215 224)",
      },
    },
  },
  plugins: [],
}