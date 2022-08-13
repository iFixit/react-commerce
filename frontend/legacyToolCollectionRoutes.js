const legacyFilterSlugs = require('./legacyFilterSlugs.json');

function getToolRedirects() {
   return legacyFilterSlugs['toolLegacyRoutes']
      .map((route) => route.replaceAll(/([/()])/g, '\\$&'))
      .join('|');
}

module.exports = { getToolRedirects };
