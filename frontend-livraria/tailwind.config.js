/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        "tsmx-gray": "#F1F5F9",
        "tsmx-blue": "#1169B0",
        "tsmx-blue-nav": "#1169B0",
        "tsmx-divisor": "#DDDDDD",
      },
    },
  },
  plugins: [],
};
