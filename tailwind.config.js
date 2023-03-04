/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        shadow: "0 4px 28px  rgba(0, 0, 0, 0.25)",
      },
      screens: {
        xl: "1227px",
      },
      colors: {
        redText: "#F93B1D",
        primary: "#00040f",
        black: "#1A1A1A",
        empty: "#BCBCBC",
        error: "#EF5050",
        success: "#98E37E",
      },
      spacing: {
        60: "14.875rem",
        10: "2.375rem",
      },
    },
    fontFamily: {
      helvetica: ["Helvetica", "sans-serif"],
    },
    backgroundImage: {
      firstPageBg: "url('./assets/background.png')",
    },

    purge: {
      content: [
        "./resources/**/*.antlers.html",
        "./resources/**/*.blade.php",
        "./content/**/*.md",
      ],
    },
  },
  plugins: [],
};
