/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#6b61f3",
        "secondary": "#f6d860",
        "accent": "#37cdbe",
        "neutral": "#3d4451",
        "base-100": "#ffffff",
      },
    },],
  },
}

