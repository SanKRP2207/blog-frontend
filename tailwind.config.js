/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


// colors: {
//   customGreen: '#2a2e2d',
//   backdropBlur: {
//     xs: '4px', // You can add custom blur values here
//     sm: '8px',
//     md: '12px',
//     lg: '16px',
//     xl: '24px',
//   },
// },