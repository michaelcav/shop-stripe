/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      lg: {'max': '944px'},
      md: {'max': '648px'},
    },
    extend: {
      top: {
        '-5': '-5px',
      },
      border: {
        '1': '1px'
      },

      width: {
        '850': '850px',
        '1000': '1000px',
        '1200': '1200px',
      }
    },
  },
  plugins: [
    // ...
  ]
}