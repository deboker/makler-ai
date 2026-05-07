/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1220",
        charcoal: "#111827",
        ink: "#182033",
        accent: "#2F80ED",
        mint: "#10B981",
        danger: "#EF4444"
      },
      boxShadow: {
        panel: "0 18px 50px rgba(15, 23, 42, 0.10)"
      }
    }
  },
  plugins: []
};
