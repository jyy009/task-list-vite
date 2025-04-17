/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
  

      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"], //Header1
        poppins: ["Poppins", "sans-serif"], //Header2, body
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