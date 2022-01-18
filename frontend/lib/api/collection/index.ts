import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { COLLECTION_PAGE_PARAM } from '@config/constants';
import { ProductHit } from '@features/productList';
import {
   createAlgoliaClient,
   createSearchContext,
   SearchContext,
   SearchParams,
} from '@lib/algolia';
import { parseSearchParams } from '@lib/algolia-utils';
import { Awaited, filterNullableItems } from '@lib/utils';
import produce from 'immer';
import { ParsedUrlQuery } from 'querystring';
import { getLayoutProps } from '../layout';
import { strapi } from '../strapi';
import { getImageFromStrapiImage } from '../utils';

interface FetchCollectionPageDataOptions {
   collectionHandle: string;
   algoliaIndexName: string;
   storeCode: string;
   urlQuery: ParsedUrlQuery;
}

export async function fetchCollectionPageData(
   options: FetchCollectionPageDataOptions
) {
   const result = await strapi.getProductListPageData({
      productListFilters: { handle: { eq: options.collectionHandle } },
      currentStoreFilters: {
         code: { eq: options.storeCode },
      },
   });
   const productList = result.productLists?.data?.[0].attributes;
   if (productList == null) {
      return null;
   }
   const filtersPreset =
      productList.filters && productList.filters.length > 0
         ? productList.filters
         : `collections:${options.collectionHandle}`;
   const searchContext = await loadProductListSearchContext({
      indexName: options.algoliaIndexName,
      filtersPreset,
      urlQuery: options.urlQuery,
   });
   if (searchContext == null) {
      return null;
   }
   const productListImageAttributes = productList.image?.data?.attributes;
   return {
      ...getLayoutProps(result),
      global: {
         newsletterForm:
            result.global?.data?.attributes?.newsletterForm || null,
      },
      collection: {
         handle: productList.handle,
         title: productList.title,
         tagline: productList.tagline,
         description: productList.description,
         metaDescription: productList.metaDescription,
         filtersPreset: productList.filters,
         image:
            productListImageAttributes == null
               ? null
               : getImageFromStrapiImage(productListImageAttributes, 'large'),
         ancestors: getAncestors(productList.parent),
         children: filterNullableItems(
            productList.children?.data.map(({ attributes }) => {
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
               };
            })
         ),
         sections: filterNullableItems(
            productList.sections.map((section) => {
               if (section == null) {
                  return null;
               }
               if (
                  section.__typename ===
                  'ComponentProductListLinkedProductListSet'
               ) {
                  return {
                     ...section,
                     productLists: filterNullableItems(
                        section.productLists?.data.map(({ attributes }) => {
                           if (attributes == null) {
                              return null;
                           }

                           const imageAttributes =
                              attributes.image?.data?.attributes;
                           return {
                              ...attributes,
                              image:
                                 imageAttributes == null
                                    ? null
                                    : getImageFromStrapiImage(
                                         imageAttributes,
                                         'thumbnail'
                                      ),
                           };
                        })
                     ),
                  };
               }
               if (
                  section.__typename ===
                  'ComponentProductListFeaturedProductList'
               ) {
                  const productListAttributes =
                     section.productList?.data?.attributes;
                  if (productListAttributes == null) {
                     return null;
                  }
                  const imageAttributes =
                     productListAttributes?.image?.data?.attributes;
                  return {
                     ...section,
                     productList: {
                        ...productListAttributes,
                        image:
                           imageAttributes == null
                              ? null
                              : getImageFromStrapiImage(
                                   imageAttributes,
                                   'thumbnail'
                                ),
                     },
                  };
               }
               return section;
            })
         ),
         searchContext,
      },
   };
}

export type CollectionData = NonNullable<
   Awaited<ReturnType<typeof fetchCollectionPageData>>
>['collection'];

export type ProductListGlobal = NonNullable<
   Awaited<ReturnType<typeof fetchCollectionPageData>>
>['global'];

type StrapiProductListPageData = NonNullable<
   NonNullable<Awaited<ReturnType<typeof strapi['getProductListPageData']>>>
>;

type StrapiProductList = NonNullable<
   NonNullable<
      NonNullable<StrapiProductListPageData['productLists']>['data']
   >[0]['attributes']
>;

interface Ancestor {
   handle: string;
   title: string;
}

function getAncestors(parent: StrapiProductList['parent']): Ancestor[] {
   const attributes = parent?.data?.attributes;
   if (attributes == null) {
      return [];
   }
   const ancestors = getAncestors(attributes.parent);
   return ancestors.concat({
      handle: attributes.handle,
      title: attributes.title,
   });
}

interface LoadProductListSearchStateArgs {
   indexName: string;
   urlQuery: ParsedUrlQuery;
   filtersPreset: string;
}

async function loadProductListSearchContext({
   indexName,
   urlQuery,
   filtersPreset,
}: LoadProductListSearchStateArgs): Promise<SearchContext<ProductHit> | null> {
   const client = createAlgoliaClient(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

   const pageParam = urlQuery[COLLECTION_PAGE_PARAM];
   const page =
      typeof pageParam === 'string' ? parseInt(pageParam, 10) : undefined;

   if (page != null && page < 1) {
      return null;
   }

   let context = createSearchContext<ProductHit>({
      indexName,
      query: '',
      page: Number.isNaN(page) ? 1 : page,
      filters: {
         allIds: [],
         byId: {},
         preset: filtersPreset,
      },
      limit: 24,
   });

   context = await client.search<ProductHit>(context);
   const searchParams = parseSearchParams(context, urlQuery);
   if (
      searchParams.filters.allIds.length > 0 ||
      searchParams.query !== context.params.query
   ) {
      context = await client.search<ProductHit>(
         applySearchParams(context, searchParams)
      );
   }
   const numberOfPages = context.numberOfPages || 0;
   if (context.params.page > 1 && context.params.page > numberOfPages) {
      return null;
   }
   return context;
}

function applySearchParams(
   context: SearchContext,
   params: SearchParams
): SearchContext {
   return produce(context, (draftContext) => {
      draftContext.params = params;
   });
}
