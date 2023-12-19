import { presence } from '@ifixit/helpers';
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
         h1: getDefaultH1Override(productList, selectedItemType),
         title: getDefaultTitleOverride(productList, selectedItemType),
      };
   }

   const overrideTitle = presence(
      replacePlaceholders(
         overrides?.title ?? allItemTypesOverrides?.title,
         replacements
      )
   );

   const overrideMetaTitle = presence(
      replacePlaceholders(
         overrides?.metaTitle ?? allItemTypesOverrides?.metaTitle,
         replacements
      )
   );

   const overrideDescription = presence(
      replacePlaceholders(
         overrides?.description ?? allItemTypesOverrides?.description,
         replacements
      )
   );

   const overrideMetaDescription = presence(
      replacePlaceholders(
         overrides?.metaDescription ?? allItemTypesOverrides?.metaDescription,
         replacements
      )
   );

   const overrideTagline = presence(
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
      h1: overrideTitle ?? getDefaultH1Override(productList, selectedItemType),
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

function getDefaultH1Override(
   productList: ProductList,
   itemType: string
): string | null {
   if (!productList.h1) return null;
   if (productList.type !== ProductListType.DeviceParts) return productList.h1;
   return `${productList.h1.replace(/parts$/i, '').trim()} ${itemType}`;
}
