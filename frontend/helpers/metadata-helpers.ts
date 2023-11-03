const META_TITLE_SUFFIX = ' | iFixit';

export function metaTitleWithSuffix(metaTitle: string) {
   const rawMetaTitle = metaTitle.trim();

   if (rawMetaTitle.endsWith(META_TITLE_SUFFIX)) return rawMetaTitle;

   return `${rawMetaTitle}${META_TITLE_SUFFIX}`;
}
