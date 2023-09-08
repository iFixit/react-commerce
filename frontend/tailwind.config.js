import { theme } from '@ifixit/ui/theme';

const { colors, breakpoints, space, radii, shadows, fonts, zIndices } = theme;

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      colors,
      screens: breakpoints,
      spacing: space,
      borderRadius: applyTailwindDefault(radii, ['md', 'base']),
      boxShadow: applyTailwindDefault(shadows, 'md'),
      // dropShadow: applyTailwindDefault(shadows, 'md'),
      extend: {
         fontFamily: fonts,
         zIndex: zIndices,
      },
   },
   plugins: [],
};

function applyTailwindDefault(themePropertyMap, defaultKeys) {
   const keySet = new Set(
      Array.isArray(defaultKeys) ? defaultKeys : [defaultKeys]
   );
   return Object.keys(themePropertyMap).reduce((acc, key) => {
      if (keySet.has(key)) {
         acc['DEFAULT'] = themePropertyMap[key];
      } else {
         acc[key] = themePropertyMap[key];
      }
      return acc;
   }, {});
}
