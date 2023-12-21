import { ProductList } from '@models/product-list';
import { destylizeDeviceTitle } from '@helpers/product-list-helpers';
import { getLocation, getRouteData } from '@helpers/path-helpers';
import { useVariant } from '../MetaTags';

export function useVariantProductList(
   productList: ProductList,
   algoliaUrl?: string
) {
   const device = productList?.deviceTitle ?? '';
   const variant = useVariant()?.replace(device, '');
   if (!variant) return productList;
   if (!algoliaUrl) return productList;
   const url = getLocation(algoliaUrl);
   const algoliaPath = new URL(url.href).pathname;
   const { deviceHandle } = getRouteData(algoliaPath);
   if (!deviceHandle) return productList;

   const modelNumberPattern = productList.wikiInfo?.find(
      (info) => info.name === 'model_number_pattern'
   )?.value;

   const deviceTitle = destylizeDeviceTitle(decodeURIComponent(deviceHandle));
   const deviceVariantTitle = getVariantTitle(
      deviceHandle,
      variant,
      modelNumberPattern
   );

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

function getVariantTitle(
   deviceHandle: string,
   variant?: string,
   modelNumberPattern?: string
) {
   const deviceTitle = destylizeDeviceTitle(decodeURIComponent(deviceHandle));
   if (!variant) return deviceTitle;
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
