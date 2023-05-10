import type { UploadFile } from '@lib/strapi-sdk';

export type StrapiImageFormat = 'large' | 'medium' | 'small' | 'thumbnail';

interface Image {
   url: string;
   alternativeText: string | null;
   formats: Record<string, { url: string }>;
}

export function getImageFromStrapiImage(
   image: Pick<UploadFile, 'formats' | 'alternativeText' | 'url'>,
   format?: StrapiImageFormat
): Image | null {
   if (image == null) {
      return null;
   }
   const result: Image = {
      url: `${
         format && image.formats[format] ? image.formats[format].url : image.url
      }`,
      formats: image.formats,
      alternativeText: null,
   };

   if (image.alternativeText) {
      result.alternativeText = image.alternativeText;
   }

   return result;
}

export function createSectionId<T extends { __typename: string; id: string }>(
   section: T
): string;
export function createSectionId<
   T extends { __typename?: string | null; id?: string | null }
>(section: T | null | undefined): string | null;
export function createSectionId<
   T extends { __typename?: string | null; id: string }
>(section: T | null | undefined): string | null {
   if (section == null) return null;
   if (section.__typename == null || section.id == null) return null;

   return `${section.__typename}-${section.id}`;
}
