import algoliasearch from 'algoliasearch/lite';
import { SearchState } from './types';
import { createSearchState } from './utils';

export interface SearchOptions {
   appId: string;
   apiKey: string;
   params: {
      indexName: string;
      query: string;
      page?: number;
      limit?: number;
      rawFilters?: string;
   };
}
export async function search<Hit = any>({
   appId,
   apiKey,
   params,
}: SearchOptions): Promise<SearchState<Hit>> {
   const client = algoliasearch(appId, apiKey);
   const index = client.initIndex(params.indexName);
   const page = params.page == null ? 1 : params.page;
   const result = await index.search(params.query, {
      distinct: 1,
      filters: params.rawFilters,
      facets: ['*'],
      page: page - 1,
      hitsPerPage: params.limit,
   });
   const state = createSearchState(
      {
         indexName: params.indexName,
         rawFilters: params.rawFilters,
      },
      result
   );
   return state;
}
