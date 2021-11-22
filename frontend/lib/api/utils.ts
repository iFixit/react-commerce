import { STRAPI_ORIGIN } from '@config/env';

export type StrapiImageFormat = 'large' | 'medium' | 'small' | 'thumbnail';

export function getImageFromStrapiImage(
   image: any | null,
   format: StrapiImageFormat
): Image | null {
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

export interface Image {
   url: string;
   alt?: string;
   formats: {
      url: string;
   };
}
