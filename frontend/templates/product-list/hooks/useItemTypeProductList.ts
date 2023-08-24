import { presentOrNull } from '@ifixit/helpers';
import { ProductList, ProductListType } from '@models/product-list';
import { useDevicePartsItemType } from './useDevicePartsItemType';

export function useItemTypeProductList(productList: ProductList) {
   const selectedItemType = useDevicePartsItemType(productList);

   if (selectedItemType == null) return null;

   const replacements = {
      DEVICE: productList.deviceTitle ?? productList.title,
      ITEM: selectedItemType,
   };

   const overrides = productList.itemOverrides[selectedItemType];
   const allItemTypesOverrides = productList.itemOverrides['*'];

   const hasItemTypeOverrides =
      overrides != null || allItemTypesOverrides != null;

   if (!hasItemTypeOverrides) {
      return {
         ...productList,
         title: getDefaultTitleOverride(productList, selectedItemType),
      };
   }

   const overrideTitle = presentOrNull(
      replacePlaceholders(
         overrides?.title ?? allItemTypesOverrides?.title,
         replacements
      )
   );

   const overrideMetaTitle = presentOrNull(
      replacePlaceholders(
         overrides?.metaTitle ?? allItemTypesOverrides?.metaTitle,
         replacements
      )
   );

   const overrideDescription = presentOrNull(
      replacePlaceholders(
         overrides?.description ?? allItemTypesOverrides?.description,
         replacements
      )
   );

   const overrideMetaDescription = presentOrNull(
      replacePlaceholders(
         overrides?.metaDescription ?? allItemTypesOverrides?.metaDescription,
         replacements
      )
   );

   const overrideTagline = presentOrNull(
      replacePlaceholders(
         overrides?.tagline ?? allItemTypesOverrides?.tagline,
         replacements
      )
   );

   return {
      ...productList,
      title:
         overrideTitle ??
         getDefaultTitleOverride(productList, selectedItemType),
      metaTitle: overrideMetaTitle ?? productList.metaTitle,
      h1: overrideTitle ?? productList.h1,
      description: overrideDescription,
      metaDescription: overrideMetaDescription,
      tagline: overrideTagline,
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
): string {
   if (productList.type !== ProductListType.DeviceParts)
      return productList.title;

   return `${productList.title.replace(/parts$/i, '').trim()} ${itemType}`;
}
