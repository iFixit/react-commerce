import { invariant } from '@ifixit/helpers';
import { ProductList, ProductListType } from '@models/product-list';
import { stylizeDeviceTitle } from './product-list-helpers';

type ProductListPathAttributes = Pick<
   ProductList,
   'type' | 'handle' | 'deviceTitle'
>;

export function productListPath(
   productList: ProductListPathAttributes
): string {
   switch (productList.type) {
      case ProductListType.AllParts: {
         return '/Parts';
      }
      case ProductListType.DeviceParts: {
         invariant(
            productList.deviceTitle != null,
            'device product list does not have device title'
         );
         const deviceHandle = encodeURIComponent(
            stylizeDeviceTitle(productList.deviceTitle)
         );
         return `/Parts/${deviceHandle}`;
      }
      case ProductListType.AllTools: {
         return '/Tools';
      }
      case ProductListType.ToolsCategory: {
         return `/Tools/${productList.handle}`;
      }
      case ProductListType.Marketing: {
         return `/Shop/${productList.handle}`;
      }
      default: {
         throw new Error(`unknown product list type: ${productList.type}`);
      }
   }
}
