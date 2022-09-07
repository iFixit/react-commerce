const { escapeStringForRegex } = require('../helpers/redirects');
const legacyFilterSlugs = require('./legacy-filter-slugs.json');

function getToolRedirects() {
   return legacyFilterSlugs['toolLegacyRoutes']
      .map((route) => escapeStringForRegex(route))
      .join('|');
}

module.exports = { getToolRedirects };
