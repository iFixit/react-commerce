const legacyFilterSlugs = require('./legacyFilterSlugs.json');

function mapPartItemTypes() {
   const legacyTagToItemType = legacyFilterSlugs['tagToItemType'];
   // Redirect tags we've renamed to the new item type name
   const oldToNew = Object.entries(legacyTagToItemType).map(
      ([oldTag, itemType]) => ({
         source: `/Parts/:slug/${oldTag}`,
         destination: `/Parts/:slug/${itemType}`,
         permanent: true,
      })
   );

   const legacyTagsWithNoItemType = legacyFilterSlugs['tagsWithNoItemType'];
   // Redirect tags we don't support anymore to the base product list page.
   const legacyToParent = legacyTagsWithNoItemType.map((oldTag) => ({
      source: `/Parts/:slug/${oldTag}`,
      destination: `/Parts/:slug`,
      permanent: true,
   }));

   return [...oldToNew, ...legacyToParent];
}

module.exports = { mapPartItemTypes };
