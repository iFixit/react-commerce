import type { UploadFile } from '@lib/strapi-sdk';

export type StrapiImageFormat = 'large' | 'medium' | 'small' | 'thumbnail';

interface Image {
   url: string;
   alternativeText: string | null;
   formats: Record<string, { url: string }>;
}

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
