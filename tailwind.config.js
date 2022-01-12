const tw = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      primary: "var(--primary)",
      primaryHover: "var(--primary-hover)",
      accent: "var(--accent)",
      background: "var(--background)",
    },
    fontFamily: {
      ...tw.fontFamily,
      display: ["Source Serif Pro", "Georgia", "serif"],
      body: ["Synonym", "system-ui", "sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
