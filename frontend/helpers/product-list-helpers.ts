import { IFIXIT_ORIGIN } from '@config/env';
import { FacetWidgetType, ProductListType } from '@models/product-list';
import { z } from 'zod';

type ProductListAttributes = {
   filters?: string | null;
   deviceTitle?: string | null;
   type?: ProductListType | null;
   itemType?: string | null;
};

export function computeProductListAlgoliaFilterPreset<
   T extends ProductListAttributes
>(productList: T): string | undefined {
   const { filters, deviceTitle, type } = productList;
   const conditions: string[] = [];

   if (filters && filters.length > 0) {
      // Algolia can't handle newlines in the filter, so replace with space.
      conditions.push(filters.replace(/(\n|\r)+/g, ' '));
   } else if (
      type === ProductListType.DeviceParts &&
      deviceTitle &&
      deviceTitle.length > 0
   ) {
      conditions.push(`'facet_tags.Main Category': 'Parts'`);
      conditions.push(`device:${JSON.stringify(deviceTitle)}`);
   } else if (type === ProductListType.ToolsCategory) {
      conditions.push(`'facet_tags.Main Category': 'Tools'`);
   }

   return conditions.length ? conditions.join(' AND ') : undefined;
}

export function processLocation(location: Location) {
   const baseUrl = getBaseOrigin(location);
   const pathParts = location.pathname.split('/').filter((part) => part !== '');
   const isPartsPage = pathParts.length >= 1 && pathParts[0] === 'Parts';
   const isToolsPage = pathParts.length >= 1 && pathParts[0] === 'Tools';
   return { baseUrl, pathParts, isPartsPage, isToolsPage };
}

export function getBaseOrigin(location: Location): string {
   if (typeof window === 'undefined' && IFIXIT_ORIGIN) {
      // On the server, use the IFIXIT_ORIGIN url
      // This ensures that the SSR produces the correct links on Vercel
      // (where the Host header doesn't match the page URL.)
      const publicOrigin = new URL(IFIXIT_ORIGIN);
      return publicOrigin.origin;
   }
   return location.origin;
}

// TODO: understand why title was handled differently

/**
 * Convert '_' in URL slug to spaces for filter facet values
 */
export function destylizeFacetValue(itemTypeHandle: string): string {
   return itemTypeHandle.replace(/_+/g, ' ');
}

/**
 * Convert spaces in filter facet values to '_' for URL slug
 */
export function stylizeFacetValue(itemType: string): string {
   return itemType.replace(/\s+/g, '_');
}

/**
 * Convert '_' in URL slug to spaces for product list device title
 */
export function destylizeDeviceTitle(handle: string): string {
   return handle.replace(/_/g, ' ');
}

/**
 * Convert to spaces in product list device Title to '_' for URL slug
 */
export function stylizeDeviceTitle(deviceTitle: string): string {
   return deviceTitle.replace(/\s/g, '_');
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
