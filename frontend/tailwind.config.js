/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         colors: {
            brand: {
               100: '#EDF6FF',
               200: '#BDDCFF',
               300: '#77B5FF',
               400: '#3B95FF',
               500: '#1975F1',
               600: '#085FD9',
               700: '#004AB3',
               800: '#00368C',
               900: '#002466',
            },
         },
      },
   },
   plugins: [],
};
