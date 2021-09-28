import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { ProductHit } from '@features/collection';
import {
   AlgoliaClient,
   createSearchState,
   Filter,
   SearchState,
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
   const searchState = await loadCollectionSearchState({
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
         searchState,
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

async function loadCollectionSearchState({
   indexName,
   query,
   filtersPreset,
}: LoadCollectionSearchStateArgs): Promise<SearchState<ProductHit>> {
   const client = new AlgoliaClient(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

   const page = typeof query.p === 'string' ? parseInt(query.p, 10) : undefined;

   let state = createSearchState<ProductHit>({
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

   state = await client.search<ProductHit>(state);
   const filters = getFiltersFromUrlQuery(state, query);
   if (filters.length > 0) {
      state = await client.search<ProductHit>(applyFilters(state, filters));
   }
   return state;
}

function getFiltersFromUrlQuery(
   state: SearchState,
   query: ParsedUrlQuery
): Filter[] {
   const filterHandles = Object.keys(query).filter(
      (paramKey) =>
         state.facets.allIds.includes(paramKey) && query[paramKey] != null
   );
   return filterHandles.map<Filter>((handle) => {
      const filterValue = query[handle]!;
      return {
         id: handle,
         type: 'facet',
         selectedOptions: Array.isArray(filterValue)
            ? filterValue
            : [filterValue],
      };
   });
}

function applyFilters(state: SearchState, filters: Filter[]): SearchState {
   return produce(state, (draft) => {
      draft.params.filters.allIds = filters.map((filter) => filter.id);
      draft.params.filters.byId = keyBy(filters, 'id');
   });
}
