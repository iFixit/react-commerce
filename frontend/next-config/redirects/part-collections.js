const {
   escapeStringForRegex,
   destylizeURIComponent,
} = require('../helpers/redirects');
const legacyFilterSlugs = require('./legacy-filter-slugs.json');

function getLegacyPartItemTypeRedirects() {
   const legacyTagToItemType = legacyFilterSlugs['tagToItemType'];
   // Redirect tags we've renamed to the new item type name
   const oldToNew = Object.entries(legacyTagToItemType).map(
      ([oldTag, itemType]) => ({
         source: `/Parts/:device/${getRegexForTag(oldTag)}`,
         destination: `/Parts/:device/${itemType}`,
         permanent: true,
      })
   );

   const legacyTagsWithNoItemType = legacyFilterSlugs['tagsWithNoItemType'];
   // Redirect tags we don't support anymore to the base product list page.
   const legacyToParent = legacyTagsWithNoItemType.map((oldTag) => ({
      source: `/Parts/:device/${getRegexForTag(oldTag)}`,
      destination: `/Parts/:device`,
      permanent: true,
   }));

   return [...oldToNew, ...legacyToParent];
}

function getRegexForTag(oldTag) {
   const encodedTag = encodeURIComponent(destylizeURIComponent(oldTag));
   return encodedTag === oldTag
      ? escapeStringForRegex(oldTag)
      : `(${escapeStringForRegex(encodedTag)}|${escapeStringForRegex(oldTag)})`;
}

module.exports = { getLegacyPartItemTypeRedirects };
