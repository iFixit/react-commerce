import type { ImageFieldsFragment } from '@lib/strapi-sdk';
import type { ImageFieldsFragment as ShopifyImageFields } from '@lib/shopify-storefront-sdk';
import { z } from 'zod';

export const ImageSchema = z.object({
   id: z.string().nullable().optional(),
   altText: z.string().nullable().optional(),
   height: z.number().nullable().optional(),
   width: z.number().nullable().optional(),
   url: z.string(),
   thumbnailUrl: z.string().nullable().optional(),
});

export type Image = z.infer<typeof ImageSchema>;

export function imageFromStrapi(
   imageFragment: ImageFieldsFragment | null | undefined
): Image | null {
   const attributes = imageFragment?.data?.attributes;
   if (attributes == null) {
      return null;
   }
   const thumbnailUrl = attributes.formats?.thumbnail?.url ?? null;
   return {
      url: attributes.url,
      altText: attributes.alternativeText,
      thumbnailUrl,
   };
}

export function imageFromUrl(url: string | null | undefined): Image | null {
   if (url == null) return null;
   return { url };
}

export function imageFromShopify(
   imageFragment: ShopifyImageFields | null | undefined
): Image | null {
   if (imageFragment == null) return null;
   return {
      id: imageFragment.id,
      altText: imageFragment.altText,
      height: imageFragment.height,
      width: imageFragment.width,
      url: imageFragment.url,
   };
}
