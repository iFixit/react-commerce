import type { ImageFieldsFragment } from '@lib/strapi-sdk';
import type { ImageFieldsFragment as ShopifyImageFields } from '@lib/shopify-storefront-sdk';
import { z } from 'zod';
import type { DeviceWiki } from '@lib/ifixit-api/devices';

export const ImageSchema = z.object({
   id: z.string().nullable().optional(),
   altText: z.string().nullable().optional(),
   height: z.number().nullable().optional(),
   width: z.number().nullable().optional(),
   url: z.string(),
   thumbnailUrl: z.string().nullable().optional(),
});

export type Image = z.infer<typeof ImageSchema>;

interface ImageOptions {
   format?: string;
   width?: number | null;
   height?: number | null;
}

export function imageFromStrapi(
   imageFragment: ImageFieldsFragment | null | undefined,
   options?: ImageOptions
): Image | null {
   const attributes = imageFragment?.data?.attributes;
   if (attributes == null) {
      return null;
   }
   const thumbnailUrl = attributes.formats?.thumbnail?.url ?? null;
   const format = options?.format;
   const formatUrl = format ? attributes.formats?.[format]?.url : null;
   const url = formatUrl ?? attributes.url;
   const width = options?.width ?? null;
   const height = options?.height ?? null;
   return {
      url,
      altText: attributes.alternativeText,
      thumbnailUrl,
      width,
      height,
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

export function childImageFromDeviceWiki(
   deviceWiki: DeviceWiki,
   childDeviceTitle: string
): Image | null {
   const child = deviceWiki.children?.find(
      (c: any) => c.title === childDeviceTitle
   );
   if (child?.image?.original) {
      return {
         url: child.image.original,
         altText: null,
      };
   }
   return null;
}
