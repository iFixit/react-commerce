import { PageEditMenuLink } from '@components/admin';
import { STRAPI_ORIGIN } from '@config/env';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import { isPresent } from '@ifixit/helpers';
import { FacetWidgetType, ProductListType } from '@models/product-list';
import { z } from 'zod';

type ProductListAttributes = {
   filters?: string | null;
   deviceTitle?: string | null;
};

export function computeProductListAlgoliaFilterPreset<
   T extends ProductListAttributes
>(productList: T): string | undefined {
   const { filters, deviceTitle } = productList;
   const conditions: string[] = [];

   if (filters && filters.length > 0) {
      // Algolia can't handle newlines in the filter, so replace with space.
      conditions.push(filters.replace(/(\n|\r)+/g, ' '));
   } else if (deviceTitle && deviceTitle.length > 0) {
      conditions.push(`device:${JSON.stringify(deviceTitle)}`);
   }

   return conditions.length ? conditions.join(' AND ') : undefined;
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
