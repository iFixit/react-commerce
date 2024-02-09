import { ProductListType } from '@models/product-list';
import {
   MultipleQueriesQuery,
   SearchResponse,
   createClient,
} from './concerns/algolia';
import { SUPPORTED_FACETS, createFacets } from './concerns/facets';
import type { ProductSearchHit } from './concerns/hits';
import {
   createFacetFilters,
   createFilters,
   createQuery,
} from './concerns/queries';

const HITS_PER_PAGE = 24;

export interface AlgoliaSearchOptions {
   productListType: ProductListType;
   baseFilters?: string;
   query: string;
   page: number;
   refinements: Record<string, string[]>;
   excludePro?: boolean;
}

export type AlgoliaSearchResult = Awaited<ReturnType<typeof search>>;

export async function search({
   productListType,
   baseFilters = '',
   query,
   page,
   refinements,
   excludePro = true,
}: AlgoliaSearchOptions) {
   const client = createClient();

   const baseParams: MultipleQueriesQuery['params'] = {
      filters: createFilters({ productListType, baseFilters, excludePro }),
      facetingAfterDistinct: true,
   };

   const refinedFacetNames = Object.keys(refinements);
   const response = await client.multipleQueries<ProductSearchHit>([
      createQuery(query, {
         ...baseParams,
         facetFilters: createFacetFilters(refinements),
         facets: SUPPORTED_FACETS,
         hitsPerPage: HITS_PER_PAGE,
      }),
      ...refinedFacetNames.map((facetName): MultipleQueriesQuery => {
         const { [facetName]: _, ...otherFacets } = refinements;
         return createQuery(query, {
            ...baseParams,
            facets: [facetName],
            facetFilters: createFacetFilters(otherFacets),
            hitsPerPage: 0,
         });
      }),
   ]);

   const results = response.results as SearchResponse[];

   const facets = createFacets({
      productListType,
      results,
      refinements,
   });

   const hits = results[0].hits as ProductSearchHit[];

   return {
      hits,
      hitsCount: results[0].nbHits,
      facets,
      page,
      query,
   };
}
