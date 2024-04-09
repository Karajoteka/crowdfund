/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        'commissioner': ['Commisioner', 'sans-serif']
      },
      colors: {
        'moderate-cyan': 'hsl(176, 50%, 47%)',
        'dark-cyan': 'hsl(176, 72%, 28%)',
        'black': 'hsl(0, 0%, 0%)',
        'dark-grey': 'hsl(0, 0%, 48%)',
      },
    },
  },
  plugins: [],
}

