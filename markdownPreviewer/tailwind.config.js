/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        mono: ["JetBrains Mono","ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      },
      content: {
        preview: "url('/preview.svg')",
        markdown: "url('/markdown.svg')"
      },
      boxShadow: {
        ring: "0 0 2px 3px rgba(0, 0, 0, 0.2)",
      }
    },
  },
  plugins: [],
  darkMode: 'class'
};
