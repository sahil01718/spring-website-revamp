/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#CAEF7D',
        black: '#1B1F13',
        white: '#FCFFEE',
        "accordion":"rgba(252, 255, 254, 0.10)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      transitionDuration: {
        300: '300ms',
      },
    },
  },
  plugins: [],
};
