import { PRODUCT_LIST_PAGE_PARAM } from '@config/constants';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import {
   createAlgoliaClient,
   createSearchContext,
   SearchContext,
   SearchParams,
} from '@lib/algolia';
import { parseSearchParams } from '@helpers/algolia-helpers';
import { strapi } from '@lib/strapi-sdk';
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
} from './types';
import { getImageFromStrapiImage } from '@helpers/strapi-helpers';

export { ProductListSectionType } from './types';
export type {
   ProductSearchHit,
   ProductList,
   ProductListSection,
} from './types';

/**
 * Get the product list data from the API
 */
export async function getProductListByHandle(
   handle: string
): Promise<ProductList | null> {
   const result = await strapi.getProductList({
      filters: { handle: { eq: handle } },
   });
   const productList = result.productLists?.data?.[0]?.attributes;
   if (productList == null) {
      return null;
   }
   const productListImageAttributes = productList.image?.data?.attributes;
   return {
      handle: productList.handle,
      deviceTitle: productList.deviceTitle || null,
      title: productList.title,
      tagline: productList.tagline || null,
      description: productList.description,
      metaDescription: productList.metaDescription || null,
      filters: productList.filters || null,
      image:
         productListImageAttributes == null
            ? null
            : getImageFromStrapiImage(productListImageAttributes, 'large'),
      ancestors: createProductListAncestors(productList.parent),
      // Strapi sort order is case sensitive, so we need to improve on it in memory
      children: sortProductListChildren(
         filterNullableItems(
            productList.children?.data.map(createProductListChild)
         )
      ),
      sections: filterNullableItems(
         productList.sections.map(createProductListSection)
      ),
   };
}

export interface CreateProductListSearchContextOptions {
   algoliaIndexName: string;
   urlQuery: ParsedUrlQuery;
   deviceHandle?: string | null;
   filters?: string;
}

/**
 * Create the product list search context using Algolia
 */
export async function createProductListSearchContext({
   algoliaIndexName,
   urlQuery,
   deviceHandle,
   filters,
}: CreateProductListSearchContextOptions): Promise<SearchContext<ProductSearchHit> | null> {
   const filtersPreset =
      filters && filters.length > 0 ? filters : `device:${deviceHandle}`;
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
      handle: attributes.handle,
      title: attributes.title,
   });
}

type ApiProductListChild = NonNullable<ApiProductList['children']>['data'][0];

function createProductListChild(
   apiChild: ApiProductListChild
): ProductListChild | null {
   const { attributes } = apiChild;
   if (attributes == null) {
      return null;
   }
   const imageAttributes = attributes.image?.data?.attributes;
   return {
      handle: attributes.handle,
      title: attributes.title,
      image:
         imageAttributes == null
            ? null
            : getImageFromStrapiImage(imageAttributes, 'medium'),
      sortPriority: attributes.sortPriority || null,
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
               description: productList.description,
               image:
                  image == null
                     ? null
                     : getImageFromStrapiImage(image, 'thumbnail'),
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
                     description: productList.description,
                     image:
                        image == null
                           ? null
                           : getImageFromStrapiImage(image, 'thumbnail'),
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
