module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        whiteSmoke: "#fafafa",
      },
      flex: {
        flex: {
          2: "2 2 0%",
          6: "6 6 0%",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
