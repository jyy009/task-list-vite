/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], //header
        urbanist: ["Urbanist", "sans-serif"], //body
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".overflow-touch": {
          "-webkit-overflow-scrolling": "touch",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};