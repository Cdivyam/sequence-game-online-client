const colors = require('./node_modules/tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens:{
        'xs': '480px',
        ...defaultTheme.screens,
      },
      colors: {
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        indigo: colors.indigo,
        teal: colors.teal,
        lime: colors.lime,
        orange: colors.orange,
      },
      backgroundImage: {
        'spades': "url('assets/spades.png')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
      fontFamily: {
        'rounded': ['Varela Round', 'sans-serif'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
