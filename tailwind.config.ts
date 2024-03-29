/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6e6e8',   
          100: '#c0c1c5',
          200: '#97999f',
          300: '#6e7179',
          400: '#51535f',
          500: '#24243c',   
          600: '#212239',
          700: '#1d1e34',
          800: '#1a1a2f',
          900: '#141527',
          A100: '#5c5c80', 
          A200: '#24243c',
          A400: '#0c0c1e',
          A700: '#000005',
        },
        accent : {
          50: '#f4e8e3',   
          100: '#e5c7b9',
          200: '#d5a38c',
          300: '#c57f5f',
          400: '#b9613c',
          500: '#bb7c4c',   
          600: '#a86a39',
          700: '#945832',
          800: '#80452b',
          900: '#5d2e1b',
          A100: '#e5c7b9',  
          A200: '#bb7c4c',
          A400: '#945832',
          A700: '#5d2e1b',
        }
      }
    },
  },
  plugins: [],
}