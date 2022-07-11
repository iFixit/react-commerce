import { invariant } from '@ifixit/helpers';
import { ProductList, ProductListType } from '@models/product-list';

type ProductListAttributes = {
   filters?: string | null;
   deviceTitle?: string | null;
   type?: ProductListType | null;
   itemType?: string | null;
};

export function computeProductListAlgoliaFilterPreset<
   T extends ProductListAttributes
>(productList: T): string | undefined {
   const { filters, deviceTitle } = productList;
   const conditions: string[] = [];

   if (filters && filters.length > 0) {
      conditions.push(filters);
   } else if (deviceTitle && deviceTitle.length > 0) {
      conditions.push(`device:${JSON.stringify(deviceTitle)}`);
   }

   return conditions.length ? conditions.join(' AND ') : undefined;
}

/**
 * Convert URL slug to product list device title
 */
export function decodeDeviceItemType(itemTypeHandle: string): string {
   return itemTypeHandle.replace(/_+/g, ' ');
}

/**
 * Convert URL slug to product list device title
 */
export function encodeDeviceItemType(itemType: string): string {
   return itemType.replace(/\s+/g, '_');
}

/**
 * Convert URL slug to product list device title
 */
export function decodeDeviceTitle(handle: string): string {
   return handle.replace(/_+/g, ' ');
}

/**
 * Convert URL slug to product list device title
 */
export function encodeDeviceTitle(deviceTitle: string): string {
   return deviceTitle.replace(/\s+/g, '_');
}

type ProductListPathAttributes = Pick<
   ProductList,
   'type' | 'handle' | 'deviceTitle'
> & {
   itemType?: string;
};

export function getProductListPath(
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
         const deviceHandle = encodeDeviceTitle(productList.deviceTitle);
         return `/Parts/${deviceHandle}`;
      }
      case ProductListType.DeviceItemTypeParts: {
         invariant(
            productList.deviceTitle != null,
            'device product list does not have device title'
         );
         invariant(
            productList.itemType != null,
            'device item type product list does not have item type'
         );
         const deviceHandle = encodeDeviceTitle(productList.deviceTitle);
         const itemTypeHandle = encodeDeviceItemType(productList.itemType);
         return `/Parts/${deviceHandle}/${itemTypeHandle}`;
      }
      case ProductListType.AllTools: {
         return '/Tools';
      }
      case ProductListType.ToolsCategory: {
         return `/Tools/${productList.handle}`;
      }
      case ProductListType.Marketing: {
         return `/Store/${productList.handle}`;
      }
      default: {
         throw new Error(`unknown product list type: ${productList.type}`);
      }
   }
}

type ProductListTitleAttributes = {
   type: ProductListType;
   itemType?: string;
   title: string;
};

export function getProductListTitle(
   productList: ProductListTitleAttributes
): string {
   if (productList.type === ProductListType.DeviceItemTypeParts) {
      return `${productList.title.replace(/parts$/i, '').trim()} ${
         productList.itemType
      }`;
   }
   return productList.title;
}
