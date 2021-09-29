import { SearchContext, SearchParams } from './types';

export function createSearchContext<Hit = any>({
   indexName,
   filters = { byId: {}, allIds: [] },
   limit = 24,
   page = 1,
   query = '',
}: Partial<SearchParams> & { indexName: string }): SearchContext<Hit> {
   return {
      params: {
         indexName,
         filters,
         query,
         page,
         limit,
      },
      isLoaded: false,
      hits: {
         byId: {},
         allIds: [],
      },
      facets: {
         allIds: [],
         byId: {},
      },
   };
}
