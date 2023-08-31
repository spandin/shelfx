/** @type {import('tailwindcss').Config} **/
const colors = require('tailwindcss/colors');
module.exports = {
  darkMode: 'class',
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      'darkG-100': '#6D6F7B',
      'darkV-100': '#1E2033',
      'darkV-200': '#151724',
      'darkV-300': '#1a1c2d',
      'darkV-400': '#12131e',
      'lightW-100': '#e7effb',
      'lightW-200': '#eff5fc',
      'lightW-300': '#f8fafe',
      'lightW-400': '#e1e8f4',

      green: colors.green,
      red: colors.red,
      gray: colors.gray,
    },
    extend: {
      gridTemplateColumns: {
        app: '300px, 1fr',
        table: '1fr, 16%',
        table_g1: '3ch, 16ch, 4ch, 1fr',
        table_g2: '10ch, 10ch',
      },
    },
  },
  plugins: [],
};
