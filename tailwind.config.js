/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Nunito'"],
      },
      colors: {
        dark: "#4A558E",
        blue: "#5C9AFF",
        "blue-100": "#E2EDFF",
        "blue-500": "#D4E4FF",
        light: "#FDFFFF",
      },
      boxShadow: {
        "inset-light": "inset 0px 2px 12px rgba(75, 104, 206, 0.2)",
      },
      spacing: {
        "1/8": "calc(100%/8)",
        "1/7": "calc(100%/7)",
        "1/6": "calc(100%/6)",
      },
    },
  },
  plugins: [],
};
