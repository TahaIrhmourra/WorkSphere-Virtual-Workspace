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
    extend: {
      gridTemplateColumns: {
        13: 'repeat(13, minmax(0, 1fr))',
      },
      gridColumnEnd: {
        14: '14'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}