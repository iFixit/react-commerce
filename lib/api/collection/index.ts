import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { ProductHit } from '@features/collection';
import {
   AlgoliaClient,
   createSearchContext,
   Filter,
   parseFiltersFromUrlQuery,
   SearchContext,
} from '@lib/algolia';
import { Awaited, filterNullableItems, keyBy } from '@lib/utils';
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
      collection.filters ?? `collections:${options.collectionHandle}`;
   const searchContext = await loadCollectionSearchContext({
      indexName: options.algoliaIndexName,
      filtersPreset,
      query: options.urlQuery,
   });
   return {
      ...getLayoutProps(result),
      collection: {
         handle: collection.handle,
         title: collection.title,
         description: collection.description,
         filtersPreset: collection.filters,
         image: getImageFromStrapiImage(collection.image, 'medium'),
         ancestors: getAncestors(collection.parent),
         children: filterNullableItems(collection.children).map((child) => {
            return {
               handle: child.handle,
               title: child.title,
               image: getImageFromStrapiImage(child.image, 'thumbnail'),
            };
         }),
         sections: filterNullableItems(collection.sections),
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
   query: ParsedUrlQuery;
   filtersPreset: string;
}

async function loadCollectionSearchContext({
   indexName,
   query,
   filtersPreset,
}: LoadCollectionSearchStateArgs): Promise<SearchContext<ProductHit>> {
   const client = new AlgoliaClient(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

   const page = typeof query.p === 'string' ? parseInt(query.p, 10) : undefined;

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
   const filters = parseFiltersFromUrlQuery(context, query);
   if (filters.length > 0) {
      context = await client.search<ProductHit>(applyFilters(context, filters));
   }
   return context;
}

function applyFilters(
   context: SearchContext,
   filters: Filter[]
): SearchContext {
   return produce(context, (draftContext) => {
      draftContext.params.filters.allIds = filters.map((filter) => filter.id);
      draftContext.params.filters.byId = keyBy(filters, 'id');
   });
}
