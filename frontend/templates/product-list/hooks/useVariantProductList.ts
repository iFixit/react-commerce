import { ProductList } from '@models/product-list';
import {
   destylizeDeviceTitle,
   destylizeDeviceTitleAndVariant,
   splitDeviceAndVariant,
} from '@helpers/product-list-helpers';
import { getRouteData } from '@helpers/path-helpers';

export function useVariantProductList(
   productList: ProductList,
   algoliaUrl?: string
) {
   if (!algoliaUrl) return productList;
   const algoliaPath = new URL(algoliaUrl).pathname;
   const { deviceHandle } = getRouteData(algoliaPath);
   if (!deviceHandle) return productList;
   const { variant } = splitDeviceAndVariant(deviceHandle);
   if (!variant) return productList;

   const modelNumberPattern = productList.wikiInfo?.find(
      (info) => info.name === 'model_number_pattern'
   )?.value;

   const deviceTitle = destylizeDeviceTitle(decodeURIComponent(deviceHandle));
   const deviceVariantTitle = getVariantTitle(deviceHandle, modelNumberPattern);

   return Object.fromEntries(
      Object.entries(productList).map(([key, value]) => {
         if (typeof value === 'string') {
            return [
               key,
               value.replace(new RegExp(deviceTitle), deviceVariantTitle),
            ];
         }
         return [key, value];
      })
   );
}

function getVariantTitle(deviceHandle: string, modelNumberPattern?: string) {
   const { variant } = splitDeviceAndVariant(deviceHandle);
   const deviceTitle = destylizeDeviceTitle(decodeURIComponent(deviceHandle));
   if (modelNumberPattern) {
      const modelNumberRegex = new RegExp(
         modelNumberPattern?.replace(/\*+$/, '').replace(/[*⎵]/g, '.'),
         'g'
      );
      return deviceTitle.replace(modelNumberRegex, variant);
   } else {
      return `${deviceTitle} ${variant}`;
   }
}
