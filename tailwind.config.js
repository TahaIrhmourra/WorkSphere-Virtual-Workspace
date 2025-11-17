 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./index.html","./src/**/*.{html,js}"],
  theme: {
    colors: {
        'dark-black': '#222831',
        'grey': '#393E46',
        'teal': '#00ADB5',
        'soft-white': '#EEEEEE'
    },
    fontFamily: {
      'momo-trust': ["Momo Trust Display", 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}