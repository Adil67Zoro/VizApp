/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '800': '800px',
        '100': '100px',
      },
      height: {
        '800': '800px',
        '100': '100px',
      },
      gridTemplateColumns: {
        '8': 'repeat(8, 100px)',
      },
      gridTemplateRows: {
        '8': 'repeat(8, 100px)',
      },
      colors: {
        'chess_b': '#769656',
        'chess_w': '#EEEED2',
      },
    },
  },
  plugins: [],
}

