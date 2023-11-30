import { ProductList } from '@models/product-list';
import {
   destylizeDeviceTitle,
   destylizeDeviceTitleAndVariant,
   splitDeviceAndVariant,
} from '@helpers/product-list-helpers';

export function useVariantProductList(
   productList: ProductList,
   deviceHandle?: string
) {
   if (!deviceHandle) return productList;
   const { variant } = splitDeviceAndVariant(deviceHandle);
   if (!variant) return productList;

   const modelNumberPattern = productList.wikiInfo?.find(
      (info) => info.name === 'model_number_pattern'
   )?.value;
   const modelNumberRegex = modelNumberPattern
      ? new RegExp(modelNumberPattern?.replace(/[\*⎵]/g, '.'), 'g')
      : null;
   const replaceModelNumber =
      modelNumberRegex && variant.match(modelNumberRegex);

   const deviceTitle = destylizeDeviceTitle(decodeURIComponent(deviceHandle));
   const deviceVariantTitle = destylizeDeviceTitleAndVariant(
      decodeURIComponent(deviceHandle)
   );
   return Object.fromEntries(
      Object.entries(productList).map(([key, value]) => {
         if (typeof value === 'string') {
            value = replaceModelNumber
               ? value.replace(modelNumberRegex, variant)
               : value;
            return [
               key,
               value.replace(new RegExp(deviceTitle), deviceVariantTitle),
            ];
         }
         return [key, value];
      })
   );
}
