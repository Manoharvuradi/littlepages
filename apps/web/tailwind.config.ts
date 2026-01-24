/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}", // 👈 if you’re using shared UI
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"], // 👈 Add Montserrat
      },
        colors: {
            primary: {
                DEFAULT: '#0A65C7',
                600: '#084FA0',
            },
        }
    },
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};