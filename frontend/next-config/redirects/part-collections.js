const { escapeStringForRegex } = require('../helpers/redirects');
const legacyFilterSlugs = require('./legacy-filter-slugs.json');

function mapPartItemTypes() {
   const legacyTagToItemType = legacyFilterSlugs['tagToItemType'];
   // Redirect tags we've renamed to the new item type name
   const oldToNew = Object.entries(legacyTagToItemType).map(
      ([oldTag, itemType]) => ({
         source: `/Parts/:device/${escapeStringForRegex(oldTag)}`,
         destination: `/Parts/:device/${itemType}`,
         permanent: true,
      })
   );

   const legacyTagsWithNoItemType = legacyFilterSlugs['tagsWithNoItemType'];
   // Redirect tags we don't support anymore to the base product list page.
   const legacyToParent = legacyTagsWithNoItemType.map((oldTag) => ({
      source: `/Parts/:device/${escapeStringForRegex(oldTag)}`,
      destination: `/Parts/:device`,
      permanent: true,
   }));

   return [...oldToNew, ...legacyToParent];
}

module.exports = { mapPartItemTypes };
