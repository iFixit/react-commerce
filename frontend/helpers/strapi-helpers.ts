import { UploadFile } from '@lib/strapi-sdk';

export type StrapiImageFormat = 'large' | 'medium' | 'small' | 'thumbnail';

export function getImageFromStrapiImage(
   image: Pick<UploadFile, 'formats' | 'alternativeText' | 'url'>,
   format: StrapiImageFormat
): Image | null {
   if (image == null) {
      return null;
   }
   const result: Image = {
      url: `${image.formats[format] ? image.formats[format].url : image.url}`,
      formats: image.formats,
      alternativeText: null,
   };

   if (image.alternativeText) {
      result.alternativeText = image.alternativeText;
   }

   return result;
}

export interface Image {
   url: string;
   alternativeText: string | null;
   formats: {
      url: string;
   };
}
