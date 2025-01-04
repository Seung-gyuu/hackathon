/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A3CE77",
        secondary: "#F7E02A",
        third: "#FFA92C",
        neutralDark: "#0C0C20",
        neutralLight: "#F6FAF9",
      },
    },
  },
  plugins: [],
};
