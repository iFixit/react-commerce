import { presentOrNull } from '@ifixit/helpers';
import { ProductListType } from '@models/product-list';
import type {
   ProductList,
   ProductListItemTypeOverride,
} from '@models/product-list/types';
import { useDevicePartsItemType } from './useDevicePartsItemType';

export function useItemTypeOverrides(
   productList: ProductList
): ProductListItemTypeOverride | null {
   const itemType = useDevicePartsItemType(productList);

   if (itemType == null) return null;

   const replacements = {
      DEVICE: productList.deviceTitle ?? productList.title,
      ITEM: itemType,
   };

   const overrides = productList.itemOverrides[itemType];
   const allItemTypesOverrides = productList.itemOverrides['*'];

   const title = replacePlaceholders(
      overrides?.title ?? allItemTypesOverrides?.title,
      replacements
   );

   const metaTitle = replacePlaceholders(
      overrides?.metaTitle ?? allItemTypesOverrides?.metaTitle,
      replacements
   );

   const description = replacePlaceholders(
      overrides?.description ?? allItemTypesOverrides?.description,
      replacements
   );

   const metaDescription = replacePlaceholders(
      overrides?.metaDescription ?? allItemTypesOverrides?.metaDescription,
      replacements
   );

   const tagline = replacePlaceholders(
      overrides?.tagline ?? allItemTypesOverrides?.tagline,
      replacements
   );

   return {
      title: presentOrNull(
         title ?? getDefaultTitleOverride(productList, itemType)
      ),
      metaTitle: presentOrNull(metaTitle),
      description: presentOrNull(description),
      metaDescription: presentOrNull(metaDescription),
      tagline: presentOrNull(tagline),
   };
}

function replacePlaceholders(
   value: string | null | undefined,
   replacements: Record<string, string>
): string | null {
   if (value == null) return null;

   let result = value;
   for (const [key, replacement] of Object.entries(replacements)) {
      result = result.replace(new RegExp(`\\[${key}\\]`, 'g'), replacement);
   }
   return result;
}

function getDefaultTitleOverride(
   productList: ProductList,
   itemType: string
): string | null {
   if (productList.type !== ProductListType.DeviceParts) return null;

   return `${productList.title.replace(/parts$/i, '').trim()} ${itemType}`;
}
