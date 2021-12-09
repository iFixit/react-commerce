import { STRAPI_ORIGIN } from '@config/env';
import { UploadFile } from './strapi/generated/sdk';

export type StrapiImageFormat = 'large' | 'medium' | 'small' | 'thumbnail';

export function getImageFromStrapiImage(
   image: Pick<UploadFile, 'formats' | 'alternativeText' | 'url'>,
   format: StrapiImageFormat
): Image | null {
   if (image == null) {
      return null;
   }
   const result: Image = {
      url: `${STRAPI_ORIGIN}${
         image.formats[format] ? image.formats[format].url : image.url
      }`,
      formats: image.formats,
   };

   if (image.alternativeText) {
      result.alt = image.alternativeText;
   }

   return result;
}

export interface Image {
   url: string;
   alt?: string;
   formats: {
      url: string;
   };
}
