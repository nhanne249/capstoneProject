/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/main.jsx"
  ],
  theme: {
    extend: {
      fontSize: {
        'suitable': '1rem'
      }
    },
  },
  plugins: [],
}