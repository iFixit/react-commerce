import { getProductListTitle } from '@helpers/product-list-helpers';
import type { DeviceWiki } from '@lib/ifixit-api/devices';
import type { ProductListFieldsFragment } from '@lib/strapi-sdk';
import { z } from 'zod';
import { ProductListType, ProductListTypeSchema } from './product-list-type';
import { productListTypeFromStrapi } from './product-list-type.server';

export type ProductListAncestor = z.infer<typeof ProductListAncestorSchema>;

export const ProductListAncestorSchema = z.object({
   deviceTitle: z.string().nullable(),
   title: z.string(),
   type: ProductListTypeSchema,
   handle: z.string(),
});

export function createProductListAncestorsFromStrapiOrDeviceWiki(
   strapiProductList: ProductListFieldsFragment | null | undefined,
   deviceWiki: DeviceWiki | null
): ProductListAncestor[] {
   if (strapiProductList?.parent) {
      return createProductListAncestorsFromStrapi(strapiProductList?.parent);
   }
   if (deviceWiki?.ancestors) {
      return createProductListAncestorsFromDeviceWiki(deviceWiki?.ancestors);
   }
   return [];
}

function createProductListAncestorsFromStrapi(
   parent: ProductListFieldsFragment['parent']
): ProductListAncestor[] {
   const attributes = parent?.data?.attributes;
   if (attributes == null) {
      return [];
   }
   const ancestors = createProductListAncestorsFromStrapi(attributes.parent);

   const type = productListTypeFromStrapi(attributes.type);

   return ancestors.concat({
      deviceTitle: attributes.deviceTitle ?? null,
      title: getProductListTitle({
         title: attributes.title,
         type,
      }),
      type,
      handle: attributes.handle,
   });
}

function createProductListAncestorsFromDeviceWiki(
   ancestorsTitles: string[]
): ProductListAncestor[] {
   if (ancestorsTitles.length === 0) return [];

   const [ancestorTitle, ...remainingTitles] = ancestorsTitles;

   if (ancestorTitle == null) return [];

   const ancestorsList =
      createProductListAncestorsFromDeviceWiki(remainingTitles);

   const ancestor = createAncestorFromWikiTitle(ancestorTitle);

   return ancestorsList.concat(ancestor);
}

function createAncestorFromWikiTitle(title: string): ProductListAncestor {
   if (title === 'Root') {
      return {
         deviceTitle: title,
         title: 'All Parts',
         type: ProductListType.AllParts,
         handle: 'Parts',
      };
   }
   return {
      deviceTitle: title,
      title: `${title} Parts`,
      type: ProductListType.DeviceParts,
      handle: '',
   };
}
