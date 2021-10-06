import { createMachine, StateMachine } from '@xstate/fsm';
import * as React from 'react';
import { SearchContext, SearchEvent } from './types';

export type SearchState<Hit = any> =
   | {
        value: 'init';
        context: SearchContext<Hit>;
     }
   | {
        value: 'idle';
        context: SearchContext<Hit>;
     }
   | {
        value: 'load';
        context: SearchContext<Hit>;
     }
   | {
        value: 'search';
        context: SearchContext<Hit>;
     }
   | {
        value: 'error';
        context: SearchContext<Hit>;
     };

export type SearchMachineState<Hit = any> = StateMachine.State<
   SearchContext<Hit>,
   SearchEvent<Hit>,
   SearchState<Hit>
>;

export const createSearchMachine = <Hit = any>(context: SearchContext<Hit>) =>
   createMachine<SearchContext<Hit>, SearchEvent<Hit>, SearchState<Hit>>({
      id: 'search',
      initial: 'init',
      context,
      states: {
         init: {
            on: {
               INIT: [
                  {
                     target: 'idle',
                     cond: function hasHits(ctx, event) {
                        return ctx.hits.allIds.length > 0;
                     },
                  },
                  {
                     target: 'load',
                  },
               ],
            },
         },
         idle: {
            on: {
               SET_QUERY: {
                  target: 'search',
                  actions: ['setQuery'],
               },
               SET_PAGE: {
                  target: 'search',
                  actions: ['setPage'],
               },
               CLEAR_FILTERS: {
                  target: 'search',
                  actions: ['clearFilters'],
               },
               ADD_FACET_OPTION_FILTER: {
                  target: 'search',
                  actions: ['addFacetOptionFilter'],
               },
               SET_FACET_OPTION_FILTER: {
                  target: 'search',
                  actions: ['setFacetOptionFilter'],
               },
               TOGGLE_FACET_OPTION_FILTER: {
                  target: 'search',
                  actions: ['toggleFacetOptionFilter'],
               },
               CLEAR_FACET_OPTION_FILTER: {
                  target: 'search',
                  actions: ['clearFacetOptionFilter'],
               },
               SET_RANGE_FILTER: {
                  target: 'search',
                  actions: ['setRangeFilter'],
               },
            },
         },
         load: {
            entry: ['search'],
            on: {
               SEARCH_CONTEXT_UPDATE: {
                  target: 'idle',
                  actions: ['updateSearchContext'],
               },
               SEARCH_FAILED: {
                  target: 'error',
                  actions: 'setError',
               },
            },
         },
         search: {
            entry: ['search'],
            on: {
               SEARCH_CONTEXT_UPDATE: {
                  target: 'idle',
                  actions: ['updateSearchContext'],
               },
               SEARCH_FAILED: {
                  target: 'error',
                  actions: 'setError',
               },
            },
         },
         error: {
            on: {
               RETRY: {
                  target: 'search',
               },
            },
         },
      },
   });

export function useSearchMachine<Hit = any>(context: SearchContext<Hit>) {
   const searchMachineRef = React.useRef<
      StateMachine.Machine<
         SearchContext<Hit>,
         SearchEvent<Hit>,
         SearchState<Hit>
      >
   >();

   if (searchMachineRef.current == null) {
      searchMachineRef.current = createSearchMachine(context);
   }

   return searchMachineRef.current;
}
