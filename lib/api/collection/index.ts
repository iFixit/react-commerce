import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { COLLECTION_PAGE_PARAM } from '@constants';
import { ProductHit } from '@features/collection';
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
   const result = await strapi.getCollectionPageData({
      whereCollection: { handle: options.collectionHandle },
      whereStoreSettings: {
         code: options.storeCode,
      },
   });
   const collection = result.collections?.[0];
   if (collection == null) {
      return null;
   }
   const filtersPreset =
      collection.filters && collection.filters.length > 0
         ? collection.filters
         : `collections:${options.collectionHandle}`;
   const searchContext = await loadCollectionSearchContext({
      indexName: options.algoliaIndexName,
      filtersPreset,
      urlQuery: options.urlQuery,
   });
   if (searchContext == null) {
      return null;
   }
   return {
      ...getLayoutProps(result),
      collection: {
         handle: collection.handle,
         title: collection.title,
         description: collection.description,
         metaDescription: collection.metaDescription,
         filtersPreset: collection.filters,
         image: getImageFromStrapiImage(collection.image, 'large'),
         ancestors: getAncestors(collection.parent),
         children: filterNullableItems(collection.children).map((child) => {
            return {
               handle: child.handle,
               title: child.title,
               image: getImageFromStrapiImage(child.image, 'medium'),
            };
         }),
         sections: filterNullableItems(collection.sections).map((section) => {
            if (
               section.__typename ===
               'ComponentCollectionFeaturedSubcollections'
            ) {
               return {
                  ...section,
                  collections: filterNullableItems(section.collections).map(
                     (collection) => {
                        return {
                           ...collection,
                           image: getImageFromStrapiImage(
                              collection.image,
                              'thumbnail'
                           ),
                        };
                     }
                  ),
               };
            }
            return section;
         }),
         searchContext,
      },
   };
}

export type CollectionData = NonNullable<
   Awaited<ReturnType<typeof fetchCollectionPageData>>
>['collection'];

type StrapiCollectionPageData = NonNullable<
   NonNullable<Awaited<ReturnType<typeof strapi['getCollectionPageData']>>>
>;

type StrapiCollection = NonNullable<
   NonNullable<StrapiCollectionPageData['collections']>[0]
>;

interface Ancestor {
   handle: string;
   title: string;
}

function getAncestors(parent: StrapiCollection['parent']): Ancestor[] {
   if (parent == null) {
      return [];
   }
   const ancestors = getAncestors(parent.parent);
   return ancestors.concat({
      handle: parent.handle,
      title: parent.title,
   });
}

interface LoadCollectionSearchStateArgs {
   indexName: string;
   urlQuery: ParsedUrlQuery;
   filtersPreset: string;
}

async function loadCollectionSearchContext({
   indexName,
   urlQuery,
   filtersPreset,
}: LoadCollectionSearchStateArgs): Promise<SearchContext<ProductHit> | null> {
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
   if (numberOfPages > 0 && context.params.page > numberOfPages) {
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
