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

   const deviceTitle = destylizeDeviceTitle(deviceHandle);
   const deviceVariantTitle = destylizeDeviceTitleAndVariant(deviceHandle);
   return Object.fromEntries(
      Object.entries(productList).map(([key, value]) => {
         if (typeof value === 'string') {
            return [key, value.replace(deviceTitle, deviceVariantTitle)];
         }
         return [key, value];
      })
   );
}
