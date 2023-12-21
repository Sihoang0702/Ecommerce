module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      main: ["Poppins, sans-serif"],
    },
    extend: {
      maxWidth: {
        main: "1220px",
      },
      backgroundColor: {
        bgMain: "#ee3131",
      },
      colors: {
        colorMain: "#ee3131",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
