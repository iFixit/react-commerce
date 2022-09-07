const legacyFilterSlugs = require('./legacy-filter-slugs.json');

function getToolRedirects() {
   return legacyFilterSlugs['toolLegacyRoutes']
      .map((route) => route.replaceAll(/([/()])/g, '\\$&'))
      .join('|');
}

module.exports = { getToolRedirects };
