module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        material: "#242424",
        cream: "#f4f4f4",
        primary: "#e5e1d7",
        primaryDark: "#c5bda6",
        secondary: "#292f47",
        accent: "#ff7629",
      },
      spacing: {
        128: "32rem",
      },
    },
    fontFamily: {
      oxygen: ["Oxygen", "sans-serif"],
      "libre-baskerville": ["Libre Baskerville", "serif"],
    },
    fontWeight: {
      light: 300,
      regular: 400,
      bold: 700,
    },
    fontStyle: {
      italic: "italic",
      normal: "normal",
    },
  },
  variants: {},
  plugins: [],
};
