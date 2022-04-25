import { useIsomorphicLayoutEffect } from '@ifixit/ui';
import { immerAssign, useInterpret } from '@lib/fsm-utils';
import { StateMachine } from '@xstate/fsm';
import * as React from 'react';
import { useAlgoliaClient } from './client';
import { SearchState, useSearchMachine } from './search.machine';
import { FilterType, SearchContext, SearchEvent } from './types';
import { createSearchContext } from './utils';

export interface AlgoliaProviderProps<Hit = any> {
   appId: string;
   apiKey: string;
   initialIndexName: string;
   filtersPreset?: string;
   productsPerPage?: number;
   initialContext?: SearchContext<Hit>;
}

export type SearchServiceContext<Hit = any> = StateMachine.Service<
   SearchContext<Hit>,
   SearchEvent<Hit>,
   SearchState<Hit>
>;

const SearchServiceContext = React.createContext<SearchServiceContext | null>(
   null
);

export function AlgoliaProvider({
   appId,
   apiKey,
   initialIndexName,
   filtersPreset,
   productsPerPage,
   initialContext = createSearchContext({
      indexName: initialIndexName,
      filters: {
         byId: {},
         allIds: [],
         preset: filtersPreset,
      },
      limit: productsPerPage,
   }),
   children,
}: React.PropsWithChildren<AlgoliaProviderProps>) {
   const client = useAlgoliaClient(appId, apiKey);
   const searchMachine = useSearchMachine(initialContext);
   const searchService = useInterpret(searchMachine, {
      actions: {
         setQuery: immerAssign((ctx, event) => {
            if (
               event.type === 'SET_QUERY' &&
               ctx.params.query !== event.query
            ) {
               ctx.params.query = event.query;
               ctx.params.page = 1;
            }
         }),
         setPage: immerAssign((ctx, event) => {
            if (event.type === 'SET_PAGE' && ctx.params.page !== event.page) {
               ctx.params.page = event.page;
            }
         }),
         clearFilters: immerAssign((ctx, event) => {
            let filterIds: string[] = [];
            switch (event.type) {
               case 'CLEAR_FILTERS': {
                  if (event.filterIds == null) {
                     // If no filter has been specified, then clear them all
                     ctx.params.filters.byId = {};
                     ctx.params.filters.allIds = [];
                  } else {
                     filterIds = event.filterIds;
                  }
                  break;
               }
               case 'ADD_FACET_OPTION_FILTER':
               case 'SET_FACET_OPTION_FILTER':
               case 'TOGGLE_FACET_OPTION_FILTER':
               case 'SET_RANGE_FILTER': {
                  if (event.clearIds) {
                     filterIds = event.clearIds;
                  }
                  break;
               }
            }
            ctx.params.filters.allIds = ctx.params.filters.allIds.filter(
               (id) => !filterIds.includes(id)
            );
            filterIds.forEach((id) => {
               delete ctx.params.filters.byId[id];
            });
         }),
         addFacetOptionFilter: immerAssign((ctx, event) => {
            if (event.type === 'ADD_FACET_OPTION_FILTER') {
               ctx.params.page = 1;
               const draftFilter = ctx.params.filters.byId[event.filterId];
               if (
                  draftFilter == null ||
                  draftFilter.type !== FilterType.List
               ) {
                  ctx.params.filters.byId[event.filterId] = {
                     type: FilterType.List,
                     id: event.filterId,
                     selectedOptions: [event.optionId],
                  };
                  ctx.params.filters.allIds.push(event.filterId);
               } else {
                  draftFilter.selectedOptions.push(event.optionId);
               }
            }
         }),
         setFacetOptionFilter: immerAssign((ctx, event) => {
            if (event.type === 'SET_FACET_OPTION_FILTER') {
               ctx.params.page = 1;
               if (!ctx.params.filters.allIds.includes(event.filterId)) {
                  ctx.params.filters.allIds.push(event.filterId);
               }
               ctx.params.filters.byId[event.filterId] = {
                  id: event.filterId,
                  type: FilterType.List,
                  selectedOptions: [event.optionId],
               };
            }
         }),
         toggleFacetOptionFilter: immerAssign((ctx, event) => {
            if (event.type === 'TOGGLE_FACET_OPTION_FILTER') {
               ctx.params.page = 1;
               const draftFilter = ctx.params.filters.byId[event.filterId];
               if (
                  draftFilter == null ||
                  draftFilter.type !== FilterType.List
               ) {
                  ctx.params.filters.byId[event.filterId] = {
                     type: FilterType.List,
                     id: event.filterId,
                     selectedOptions: [event.optionId],
                  };
                  ctx.params.filters.allIds.push(event.filterId);
               } else {
                  if (draftFilter.selectedOptions.includes(event.optionId)) {
                     if (draftFilter.selectedOptions.length === 1) {
                        ctx.params.filters.allIds =
                           ctx.params.filters.allIds.filter(
                              (id) => id !== event.filterId
                           );
                        delete ctx.params.filters.byId[event.filterId];
                     } else {
                        draftFilter.selectedOptions =
                           draftFilter.selectedOptions.filter(
                              (option) => option !== event.optionId
                           );
                     }
                  } else {
                     draftFilter.selectedOptions.push(event.optionId);
                  }
               }
            }
         }),
         clearFacetOptionFilter: immerAssign((ctx, event) => {
            if (event.type === 'CLEAR_FACET_OPTION_FILTER') {
               const draftFilter = ctx.params.filters.byId[event.filterId];
               if (
                  draftFilter &&
                  draftFilter.type === FilterType.List &&
                  draftFilter.selectedOptions.includes(event.optionId)
               ) {
                  ctx.params.page = 1;
                  if (draftFilter.selectedOptions.length === 1) {
                     ctx.params.filters.allIds =
                        ctx.params.filters.allIds.filter(
                           (id) => id !== event.filterId
                        );
                     delete ctx.params.filters.byId[event.filterId];
                  } else {
                     draftFilter.selectedOptions =
                        draftFilter.selectedOptions.filter(
                           (option) => option !== event.optionId
                        );
                  }
               }
            }
         }),
         setRangeFilter: immerAssign((ctx, event) => {
            if (event.type === 'SET_RANGE_FILTER') {
               if (isInvalidRange(event.min, event.max)) {
                  return;
               }
               const draftFilter = ctx.params.filters.byId[event.filterId];
               if (
                  draftFilter == null ||
                  draftFilter.type !== FilterType.Range
               ) {
                  if (draftFilter == null) {
                     ctx.params.filters.allIds.push(event.filterId);
                  }
                  ctx.params.page = 1;
                  ctx.params.filters.byId[event.filterId] = {
                     id: event.filterId,
                     type: FilterType.Range,
                     min: event.min,
                     max: event.max,
                  };
               } else if (
                  draftFilter.min !== event.min ||
                  draftFilter.max !== event.max
               ) {
                  ctx.params.page = 1;
                  if (event.min == null && event.max == null) {
                     ctx.params.filters.allIds =
                        ctx.params.filters.allIds.filter(
                           (id) => id !== event.filterId
                        );
                     delete ctx.params.filters.byId[event.filterId];
                  } else {
                     draftFilter.min = event.min;
                     draftFilter.max = event.max;
                  }
               }
            }
         }),
         clearSearchParams: immerAssign((ctx, event) => {
            if (event.type === 'CLEAR_SEARCH_PARAMS') {
               ctx.params.query = '';
               ctx.params.filters.allIds = [];
               ctx.params.filters.byId = {};
               ctx.params.page = 1;
            }
         }),
         updateSearchContext: immerAssign((ctx, event) => {
            if (event.type === 'SEARCH_CONTEXT_UPDATE') {
               return event.context;
            }
         }),
         setError: immerAssign((ctx, event) => {
            if (event.type === 'SEARCH_FAILED') {
               ctx.error = event.error;
               ctx.hits.allIds = [];
               ctx.hits.byId = {};
               ctx.numberOfHits = 0;
               ctx.numberOfPages = 0;
            }
         }),
         search: (ctx, event) => {
            client
               .search(ctx)
               .then((newCtx) => {
                  searchService.send({
                     type: 'SEARCH_CONTEXT_UPDATE',
                     context: newCtx,
                  });
               })
               .catch((error) => {
                  searchService.send({
                     type: 'SEARCH_FAILED',
                     error: error.message,
                  });
               });
         },
      },
   });

   useIsomorphicLayoutEffect(() => {
      searchService.send({
         type: 'INIT',
      });
   }, [searchService]);

   return (
      <SearchServiceContext.Provider value={searchService}>
         {children}
      </SearchServiceContext.Provider>
   );
}

function isInvalidRange(min?: number, max?: number): boolean {
   return min != null && max != null && min > max;
}

export function useSearchServiceContext<
   Hit = any
>(): SearchServiceContext<Hit> {
   const value = React.useContext<SearchServiceContext<Hit> | null>(
      SearchServiceContext
   );
   if (value == null) {
      throw new Error(
         "can't use useSearchStateContext without AlgoliaProvider"
      );
   }
   return value;
}
