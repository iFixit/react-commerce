import { PRODUCT_LIST_PAGE_PARAM } from '@config/constants';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID, IFIXIT_ORIGIN } from '@config/env';
import {
   createAlgoliaClient,
   createSearchContext,
   SearchContext,
   SearchParams,
} from '@lib/algolia';
import { parseSearchParams } from '@helpers/algolia-helpers';
import {
   ProductListFiltersInput,
   strapi,
   ProductList as StrapiProductList,
   Enum_Productlist_Type,
} from '@lib/strapi-sdk';
import { Awaited, filterNullableItems } from '@helpers/application-helpers';
import produce from 'immer';
import { ParsedUrlQuery } from 'querystring';
import {
   ProductSearchHit,
   ProductList,
   ProductListAncestor,
   ProductListChild,
   ProductListSection,
   ProductListSectionType,
   ProductListImage,
} from './types';
import { getImageFromStrapiImage } from '@helpers/strapi-helpers';

export { ProductListSectionType } from './types';
export type {
   ProductSearchHit,
   ProductList,
   ProductListSection,
   ProductListPreview,
} from './types';

/**
 * Get the product list data from the API
 */
export async function findProductList(
   filters: ProductListFiltersInput
): Promise<ProductList | null> {
   const result = await strapi.getProductList({
      filters,
   });
   const productList = result.productLists?.data?.[0]?.attributes;
   if (productList == null) {
      return null;
   }
   const productListImageAttributes = productList.image?.data?.attributes;
   const shouldFetchDeviceWiki =
      productList.image?.data?.attributes == null ||
      productList.children?.data?.some(
         (child) => child.attributes?.image?.data?.attributes == null
      );
   const deviceWiki =
      shouldFetchDeviceWiki && productList.deviceTitle != null
         ? await fetchDeviceWiki(productList.deviceTitle)
         : null;

   console.log('wiki', deviceWiki);

   return {
      title: productList.title,
      handle: productList.handle,
      path: getProductListPath(productList),
      deviceTitle: productList.deviceTitle ?? null,
      tagline: productList.tagline ?? null,
      description: productList.description,
      metaDescription: productList.metaDescription ?? null,
      filters: productList.filters ?? null,
      image:
         productListImageAttributes != null
            ? getImageFromStrapiImage(productListImageAttributes, 'large')
            : deviceWiki
            ? getDeviceImage(deviceWiki)
            : null,
      ancestors: createProductListAncestors(productList.parent),
      // Strapi sort order is case sensitive, so we need to improve on it in memory
      children: sortProductListChildren(
         filterNullableItems(
            productList.children?.data.map(createProductListChild(deviceWiki))
         )
      ),
      sections: filterNullableItems(
         productList.sections.map(createProductListSection)
      ),
   };
}

type DeviceWiki = Record<string, any>;

async function fetchDeviceWiki(
   deviceTitle: string
): Promise<DeviceWiki | null> {
   const deviceHandle = getDeviceHandle(deviceTitle);
   try {
      const response = await fetch(
         `${IFIXIT_ORIGIN}/api/2.0/wikis/CATEGORY/${deviceHandle}`,
         {
            headers: {
               'Content-Type': 'application/json',
            },
         }
      );
      const payload = await response.json();
      return payload;
   } catch (error: any) {
      return null;
   }
}

function getDeviceImage(deviceWiki: DeviceWiki): ProductListImage | null {
   return deviceWiki.image?.original == null
      ? null
      : {
           url: deviceWiki.image.original,
           alternativeText: null,
        };
}

function getChildDeviceImage(
   deviceWiki: DeviceWiki,
   childDeviceTitle: string
): ProductListImage | null {
   const child = deviceWiki.children?.find(
      (c: any) => c.title === childDeviceTitle
   );
   if (child?.image?.original) {
      return {
         url: child.image.original,
         alternativeText: null,
      };
   }
   return null;
}

/**
 * Convert product list device title to a URL friendly slug
 */
export function getDeviceHandle(deviceTitle: string): string {
   return deviceTitle.replace(/\s+/g, '_');
}

/**
 * Convert URL slug to product list device title
 */
export function getDeviceTitle(handle: string): string {
   return handle.replace(/_+/g, ' ');
}

/**
 * Get product list path
 * @param productList - Product list attributes
 * @returns The product list absolute path
 */
export function getProductListPath(
   productList: Pick<StrapiProductList, 'type' | 'handle' | 'deviceTitle'>
): string {
   switch (productList.type) {
      case Enum_Productlist_Type.Tools: {
         return `/Store/Tools/${productList.handle}`;
      }
      case Enum_Productlist_Type.Marketing: {
         return `/Store/${productList.handle}`;
      }
      default: {
         if (
            productList.deviceTitle != null &&
            productList.deviceTitle.length > 0
         ) {
            const deviceHandle = getDeviceHandle(productList.deviceTitle);
            return `/Store/Parts/${deviceHandle}`;
         }
         return `/Store/${productList.handle}`;
      }
   }
}

export interface CreateProductListSearchContextOptions {
   algoliaIndexName: string;
   urlQuery: ParsedUrlQuery;
   deviceTitle?: string | null;
   filters?: string;
}

/**
 * Create the product list search context using Algolia
 */
export async function createProductListSearchContext({
   algoliaIndexName,
   urlQuery,
   deviceTitle,
   filters,
}: CreateProductListSearchContextOptions): Promise<SearchContext<ProductSearchHit> | null> {
   const filtersPreset =
      filters && filters.length > 0
         ? `${filters} AND public=1`
         : `device:${JSON.stringify(deviceTitle)} AND public=1`;
   const client = createAlgoliaClient(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

   const pageParam = urlQuery[PRODUCT_LIST_PAGE_PARAM];
   const page =
      typeof pageParam === 'string' ? parseInt(pageParam, 10) : undefined;

   if (page != null && page < 1) {
      return null;
   }

   let searchContext = createSearchContext<ProductSearchHit>({
      indexName: algoliaIndexName,
      query: '',
      page: Number.isNaN(page) ? 1 : page,
      filters: {
         allIds: [],
         byId: {},
         preset: filtersPreset,
      },
      limit: 24,
   });

   searchContext = await client.search<ProductSearchHit>(searchContext);
   const searchParams = parseSearchParams(searchContext, urlQuery);
   if (
      searchParams.filters.allIds.length > 0 ||
      searchParams.query !== searchContext.params.query
   ) {
      searchContext = await client.search<ProductSearchHit>(
         applySearchParams(searchContext, searchParams)
      );
   }
   const numberOfPages = searchContext.numberOfPages || 0;
   if (
      searchContext.params.page > 1 &&
      searchContext.params.page > numberOfPages
   ) {
      return null;
   }
   if (searchContext == null) {
      return null;
   }
   return searchContext;
}

type StrapiProductListPageData = NonNullable<
   NonNullable<Awaited<ReturnType<typeof strapi['getProductList']>>>
>;

type ApiProductList = NonNullable<
   NonNullable<
      NonNullable<StrapiProductListPageData['productLists']>['data']
   >[0]['attributes']
>;

function createProductListAncestors(
   parent: ApiProductList['parent']
): ProductListAncestor[] {
   const attributes = parent?.data?.attributes;
   if (attributes == null) {
      return [];
   }
   const ancestors = createProductListAncestors(attributes.parent);

   return ancestors.concat({
      title: attributes.title,
      handle: attributes.handle,
      path: getProductListPath(attributes),
   });
}

type ApiProductListChild = NonNullable<ApiProductList['children']>['data'][0];

function createProductListChild(deviceWiki: DeviceWiki | null) {
   return (apiChild: ApiProductListChild): ProductListChild | null => {
      const { attributes } = apiChild;
      if (attributes == null) {
         return null;
      }
      const imageAttributes = attributes.image?.data?.attributes;
      return {
         title: attributes.title,
         handle: attributes.handle,
         path: getProductListPath(attributes),
         image:
            imageAttributes == null
               ? deviceWiki && attributes.deviceTitle
                  ? getChildDeviceImage(deviceWiki, attributes.deviceTitle)
                  : null
               : getImageFromStrapiImage(imageAttributes, 'medium'),
         sortPriority: attributes.sortPriority || null,
      };
   };
}

function sortProductListChildren(
   children: ProductListChild[]
): ProductListChild[] {
   return children.slice().sort((a, b) => {
      const aPriority = a.sortPriority || 0;
      const bPriority = b.sortPriority || 0;

      if (aPriority === bPriority) {
         return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
      return bPriority - aPriority;
   });
}

type ApiProductListSection = NonNullable<ApiProductList['sections']>[0];

function createProductListSection(
   section: ApiProductListSection
): ProductListSection | null {
   if (section == null) {
      return null;
   }
   switch (section.__typename) {
      case 'ComponentProductListBanner': {
         return {
            type: ProductListSectionType.Banner,
            id: section.id,
            title: section.title,
            description: section.description,
            callToActionLabel: section.callToActionLabel,
            url: section.url,
         };
      }
      case 'ComponentProductListRelatedPosts': {
         return {
            type: ProductListSectionType.RelatedPosts,
            id: section.id,
            tags: section.tags || null,
         };
      }
      case 'ComponentProductListFeaturedProductList': {
         const productList = section.productList?.data?.attributes;
         if (productList == null) {
            return null;
         }
         const image = productList.image?.data?.attributes;
         return {
            type: ProductListSectionType.FeaturedProductList,
            id: section.id,
            productList: {
               handle: productList.handle,
               title: productList.title,
               deviceTitle: productList.deviceTitle ?? null,
               path: getProductListPath(productList),
               description: productList.description,
               image:
                  image == null
                     ? null
                     : getImageFromStrapiImage(image, 'thumbnail'),
               filters: productList.filters ?? null,
            },
         };
      }
      case 'ComponentProductListLinkedProductListSet': {
         return {
            type: ProductListSectionType.ProductListSet,
            id: section.id,
            title: section.title,
            productLists: filterNullableItems(
               section.productLists?.data?.map((item) => {
                  const productList = item.attributes;
                  if (productList == null) {
                     return null;
                  }
                  const image = productList.image?.data?.attributes;
                  return {
                     handle: productList.handle,
                     title: productList.title,
                     deviceTitle: productList.deviceTitle ?? null,
                     path: getProductListPath(productList),
                     description: productList.description,
                     image:
                        image == null
                           ? null
                           : getImageFromStrapiImage(image, 'thumbnail'),
                     filters: productList.filters ?? null,
                  };
               })
            ),
         };
      }
      default: {
         console.warn(
            `Unknown product list section type: ${section.__typename}`
         );
         return null;
      }
   }
}

function applySearchParams(
   context: SearchContext,
   params: SearchParams
): SearchContext {
   return produce(context, (draftContext) => {
      draftContext.params = params;
   });
}
