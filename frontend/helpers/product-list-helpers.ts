import { invariant } from '@ifixit/helpers';
import { ProductList, ProductListType } from '@models/product-list';
import { RefinementDisplayType } from '@models/product-list/types';

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
>;

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
   title: string;
};

export function getProductListTitle(
   productList: ProductListTitleAttributes,
   itemType?: string
): string {
   if (productList.type === ProductListType.DeviceParts && itemType) {
      return `${productList.title.replace(/parts$/i, '').trim()} ${itemType}`;
   }
   return productList.title;
}

export function getRefinementDisplayType(
   attribute: string,
   productListType: ProductListType
) {
   switch (attribute) {
      case 'facet_tags.Item Type': {
         switch (productListType) {
            case ProductListType.DeviceParts:
               return RefinementDisplayType.SingleSelect;
            default:
               return RefinementDisplayType.MultiSelect;
         }
      }
      default: {
         return RefinementDisplayType.MultiSelect;
      }
   }
}
