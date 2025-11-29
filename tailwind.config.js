module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'white-glow': '0 0 20px 10px rgba(255, 255, 255, 0.7)', // x, y, blur, spread, color
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
