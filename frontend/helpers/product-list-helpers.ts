import { PageEditMenuLink } from '@components/admin';
import { STRAPI_ORIGIN } from '@config/env';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { isPresent } from '@ifixit/helpers';
import { FacetWidgetType, ProductListType } from '@models/product-list';
import { z } from 'zod';

type ProductListAttributes = {
   filters?: string | null;
   deviceTitle?: string | null;
   optionalFilters?: string | null;
};

type DeviceAndVariant = {
   device: string;
   variant: string;
};

export function computeProductListAlgoliaFilterPreset<
   T extends ProductListAttributes
>(productList: T): string | undefined {
   const { filters, deviceTitle } = productList;

   if (filters && filters.length > 0) {
      // Algolia can't handle newlines in the filter, so replace with space.
      return filters.replace(/(\n|\r)+/g, ' ');
   } else if (deviceTitle && deviceTitle.length > 0) {
      return `device:${JSON.stringify(deviceTitle)}`;
   } else {
      return undefined;
   }
}

export function computeProductListAlgoliaOptionalFilters<
   T extends ProductListAttributes
>(productList: T): (string | string[])[] | undefined {
   const { optionalFilters } = productList;
   const filters: (string | string[])[] = [];
   optionalFilters?.split('\n').forEach((filterLine) => {
      if (filterLine) {
         const innerFilters = filterLine
            .split('||')
            .map((filter) => filter.trim());
         filters.push(innerFilters.length > 1 ? innerFilters : innerFilters[0]);
      }
   });
   return filters && filters.length ? filters : undefined;
}
/**
 * Convert '_' in URL slug to spaces for product list device Item Types
 */
export function destylizeDeviceItemType(itemTypeHandle: string): string {
   return itemTypeHandle.replace(/_+/g, ' ');
}

/**
 * Convert to spaces in product list device Item Types to '_' for URL slug
 */
export function stylizeDeviceItemType(itemType: string): string {
   return itemType.replace(/\s+/g, '_');
}

/**
 * Convert '_' in URL slug to spaces for product list device title
 * If the handle has a : character everything after it is removed.
 * This is to remove the device's variant from the handle.
 * Example: "PlayStation_4:CUH-11XXA" becomes "PlayStation 4"
 */
export function destylizeDeviceTitle(handle: string): string {
   const { device } = splitDeviceAndVariant(handle);
   return device.replace(/_/g, ' ');
}

/**
 * Keeping the device's variant in the handle.
 * Convert '_' in URL slug to spaces for product list device title
 * Convert ':' in URL slug to spaces for the variant separator
 * Example: "PlayStation_4:CUH-11XXA" becomes "PlayStation 4 CUH-11XXA"
 */
export function destylizeDeviceTitleAndVariant(handle: string): string {
   const { device, variant } = splitDeviceAndVariant(handle);
   const splitHandle = variant ? `${device} ${variant}` : device;
   return splitHandle.replace(/_/g, ' ');
}

export function splitDeviceAndVariant(handle: string): DeviceAndVariant {
   const [device, ...restParts] = handle.split(':');
   const variant = restParts.join(':');
   return { device, variant };
}

/**
 * Convert to spaces in product list device Title to '_' for URL slug
 */
export function stylizeDeviceTitle(
   deviceTitle: string,
   variant?: string
): string {
   const urlTitle = deviceTitle.replace(/\s/g, '_');
   const urlVariant = variant?.replace(/\s/g, '_') ?? '';
   const shortenedVariant = urlVariant.replace(`${urlTitle}_`, '');
   return shortenedVariant ? `${urlTitle}:${shortenedVariant}` : urlTitle;
}

type ProductListTitleAttributes = {
   type: ProductListType;
   title: string;
   h1?: string | null;
};

export function getProductListTitle(
   productList: ProductListTitleAttributes,
   itemType?: string
): string {
   if (productList.type === ProductListType.DeviceParts && itemType) {
      return `${productList.title.replace(/parts$/i, '').trim()} ${itemType}`;
   }
   return isPresent(productList.h1) ? productList.h1 : productList.title;
}

const facetWidgetTypeMap: Record<string, FacetWidgetType> = {
   'facet_tags.Capacity': FacetWidgetType.RefinementList,
   price_range: FacetWidgetType.RefinementList,
};

export function getFacetWidgetType(attribute: string) {
   return facetWidgetTypeMap[attribute] ?? FacetWidgetType.Menu;
}

const RefinementListValueSchema = z.string().array().nonempty();

export function isValidRefinementListValue(value: unknown) {
   return RefinementListValueSchema.safeParse(value).success;
}

export function isPartsProductList<
   ProductList extends { type: ProductListType }
>(productList: ProductList): boolean {
   return (
      productList.type === ProductListType.AllParts ||
      productList.type === ProductListType.DeviceParts
   );
}

type GetAdminLinksProps = {
   productListId: string | null;
};

export function getAdminLinks({
   productListId,
}: GetAdminLinksProps): PageEditMenuLink[] {
   if (!productListId) return [];
   return [
      {
         icon: faDatabase,
         label: 'Strapi',
         url: `${STRAPI_ORIGIN}/admin/content-manager/collectionType/api::product-list.product-list/${productListId}`,
      },
   ];
}
