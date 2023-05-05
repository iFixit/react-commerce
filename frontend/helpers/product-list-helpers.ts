import { PageEditMenuLink } from '@components/admin';
import { STRAPI_ORIGIN } from '@config/env';
import { faDatabase } from '@fortawesome/pro-solid-svg-icons';
import {
   FacetWidgetType,
   ProductList,
   ProductListType,
} from '@models/product-list';
import {
   ProductListItemTypeOverride,
   ProductListItemTypeOverrideIndexed,
} from '@models/product-list/types';
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
   return productList.h1 ?? productList.title;
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

export function updateProductListWithItemTypeOverrides(
   productList: ProductList,
   page: number,
   itemType?: string
): ProductList {
   const productListCopy = { ...productList };
   productListCopy.title = getTitle(productList, itemType);
   productListCopy.metaTitle = getMetaTitle(productList, itemType);
   productListCopy.description = getDescription(productList, page, itemType);
   productListCopy.metaDescription = getMetaDescription(productList, itemType);
   productListCopy.tagline = getTagline(productList, page, itemType);
   return productListCopy;
}

function getDescription(
   productList: ProductList,
   page: number,
   itemType?: string
): string {
   const description = page === 1 ? productList.description : null;
   return (
      (itemType && productList.deviceTitle
         ? getItemOverrideAttribute(
              productList.itemOverrides,
              itemType,
              'description',
              productList.deviceTitle
           )
         : description) || ''
   );
}

function getMetaDescription(
   productList: ProductList,
   itemType?: string
): string {
   const metaDescription =
      itemType && productList.deviceTitle
         ? getItemOverrideAttribute(
              productList.itemOverrides,
              itemType,
              'metaDescription',
              productList.deviceTitle
           ) ?? productList.metaDescription
         : productList.metaDescription;
   const description =
      itemType && productList.deviceTitle
         ? getItemOverrideAttribute(
              productList.itemOverrides,
              itemType,
              'description',
              productList.deviceTitle
           ) ?? productList.description
         : productList.description;
   return metaDescription || description;
}

function getTagline( // taglines don't exist if page > 1
   productList: ProductList,
   page: number,
   itemType?: string
): string | null {
   const tagline =
      !!productList.tagline && page === 1 ? productList.tagline : null;
   return itemType && productList.deviceTitle
      ? getItemOverrideAttribute(
           productList.itemOverrides,
           itemType,
           'tagline',
           productList.deviceTitle
        )
      : tagline;
}

function getTitle(productList: ProductList, itemType?: string): string {
   const overrideTitle = itemType
      ? getItemOverrideAttribute(
           productList.itemOverrides,
           itemType,
           'title',
           productList.title
        )
      : null;
   return (
      overrideTitle ??
      getProductListTitle(
         {
            title: productList.title,
            type: productList.type,
            h1: productList.h1,
         },
         itemType
      )
   );
}

function getMetaTitle(productList: ProductList, itemType?: string): string {
   const metaTitle =
      itemType && productList.deviceTitle
         ? getItemOverrideAttribute(
              productList.itemOverrides,
              itemType,
              'metaTitle',
              productList.deviceTitle
           ) ?? productList.metaTitle
         : productList.metaTitle;
   const realTitle =
      itemType && productList.deviceTitle
         ? getItemOverrideAttribute(
              productList.itemOverrides,
              itemType,
              'title',
              productList.deviceTitle
           ) ?? productList.title
         : productList.title;
   const { h1, title, ...productListMinusH1 } = productList;
   return (
      metaTitle ||
      getTitle(
         {
            h1: null,
            title: realTitle,
            ...productListMinusH1,
         },
         itemType
      ) + ' | iFixit'
   );
}

function getItemOverrideAttribute(
   itemOverrides: ProductListItemTypeOverrideIndexed,
   itemType: string,
   attribute: keyof ProductListItemTypeOverride,
   deviceTitle: string
): string | null {
   const overrideValue =
      itemOverrides?.[itemType]?.[attribute] ??
      itemOverrides?.['*']?.[attribute] ??
      null;
   return parseOverrideAttribute(overrideValue, deviceTitle, itemType);
}

function parseOverrideAttribute(
   value: string | null,
   deviceTitle: string,
   itemType: string
): string | null {
   const replacements = {
      DEVICE: deviceTitle,
      ITEM: itemType,
   };

   if (!value) {
      return null;
   }
   let result = value;
   for (const [key, replacement] of Object.entries(replacements)) {
      result = result.replace(new RegExp(`\\[${key}\\]`, 'g'), replacement);
   }
   return result;
}
