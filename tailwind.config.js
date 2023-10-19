/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'lightGray': '#f4f4f4',
      'richBlack': '#02040a',
      'success': '#00C851',
      'warning': '#ffbb33',
      black: colors.black,
      white: colors.white,
      red: colors.red,
      transparent: colors.transparent
    },
    screens: {
      'phone': '390px',
      // => @media (min-width: 390px) { ... }

      'tablet': '1080px',
      // => @media (min-width: 1080px) { ... }

      'desktop': '1200px',
      // => @media (min-width: 1200px) { ... }
    }
  },
  plugins: [],
}
