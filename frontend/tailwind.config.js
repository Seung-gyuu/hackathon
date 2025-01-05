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
        primary: "#8454dc",
        secondary: "#F7E02A",
        third: "#FFA92C",
        neutralDark: "#0C0C20",
        neutralDarkLight: "#b0b0b0",
        neutralLight: "#F6FAF9",
      },
    },
  },
  plugins: [],
};
