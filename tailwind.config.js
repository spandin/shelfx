/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "darkD-100": "#0b0b0c",
      "darkD-200": "#0f1011",
      "darkD-300": "#161718",
      "darkG-100": "#1c1d1e",
      "darkG-200": "#565657",
      "white-100": "#f1f1f1",
      "green-100": "#009052",
    },
    extend: {
      gridTemplateColumns: {
        app: "300px, 1fr",
        table: "1fr, 16%",
        table_g1: "3ch, 16ch, 4ch, 1fr",
        table_g2: "10ch, 10ch",
      },
    },
  },
  plugins: [],
};
