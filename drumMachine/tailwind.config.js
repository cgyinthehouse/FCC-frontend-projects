/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        studio: "url('/src/assets/studio.jpg')",
      },
      boxShadow: {
        ring: "0 0 20px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
