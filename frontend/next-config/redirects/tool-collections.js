const { escapeStringForRegex } = require('../helpers/redirects');
const legacyFilterSlugs = require('./legacy-filter-slugs.json');

function getLegacyToolRedirects() {
   const legacyToolRedirects = {
      source: `/Tools/:slug(${getToolRedirectRegex()})`,
      destination: `/Tools`,
      permanent: true,
   };
   const legacyHakkoRedirect = {
      source: `/Tools/Hakko`,
      destination: `/Tools/Microsoldering`,
      permanent: true,
   };

   return [legacyToolRedirects, legacyHakkoRedirect];
}

function getToolRedirectRegex() {
   return legacyFilterSlugs['toolLegacyRoutes']
      .map((route) => escapeStringForRegex(route))
      .join('|');
}

module.exports = { getLegacyToolRedirects };
