import { theme } from '@ifixit/ui/theme';

const { colors, breakpoints, space, shadows, fonts, zIndices } = theme;

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      colors,
      screens: breakpoints,
      spacing: space,
      boxShadow: applyTailwindDefault(shadows, 'md'),
      extend: {
         fontFamily: fonts,
         zIndex: zIndices,
      },
   },
   plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};

function applyTailwindDefault(themePropertyMap, defaultKey) {
   return Object.keys(themePropertyMap).reduce((acc, key) => {
      if (key === defaultKey) {
         acc['DEFAULT'] = themePropertyMap[key];
      } else {
         acc[key] = themePropertyMap[key];
      }
      return acc;
   }, {});
}
