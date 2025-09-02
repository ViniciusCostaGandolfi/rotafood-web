/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#a2c2f4', 
          100: '#73a9f1',
          200: '#4686ec',
          300: '#1963e6',
          400: '#144bb8',
          500: '#0052c8', 
          600: '#0047af', 
          700: '#003a8f', 
          800: '#002e70', 
          900: '#002252', 
          A100: '#ccdff9',
          A200: '#99bff3',
          A400: '#668fea',
          A700: '#003378',
        },
        accent: {
          50: '#ffd5b3', 
          100: '#ffbb8a',
          200: '#ff9954',
          300: '#ff781f',
          400: '#e65c00',
          500: '#ff6600', 
          600: '#e55b00', 
          700: '#cc4f00', 
          800: '#b24400', 
          900: '#993900', 
          A100: '#ffebd6',
          A200: '#ffd5ad',
          A400: '#ffbf85',
          A700: '#802b00',
        }
      }
    }
  },

  plugins: [],


}