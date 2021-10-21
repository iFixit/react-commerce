import { STRAPI_ORIGIN } from '@config/env';

export function getImageFromStrapiImage(
   image: any | null,
   format: 'large' | 'medium' | 'small' | 'thumbnail'
) {
   if (image == null) {
      return null;
   }
   return {
      url: `${STRAPI_ORIGIN}${
         image.formats[format] ? image.formats[format].url : image.url
      }`,
      alt: image.alternativeText,
      formats: image.formats,
   };
}
