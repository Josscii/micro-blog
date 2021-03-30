// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "theme-border-dark": "#444c56",
        "theme-text-dark": "#adbac7",
        "theme-text-secondary-dark": "#768390",
        "theme-bg-dark": "#22272e",

        "theme-border-light": "#e1e4e8",
        "theme-text-light": "#24292e",
        "theme-text-secondary-light": "#586069",
        "theme-bg-light": "#ffffff",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
