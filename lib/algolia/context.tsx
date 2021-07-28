import * as React from 'react';
import { getInitialState, reducer } from './reducers';
import { useFiltersQueryString } from './search';
import { SearchAction, SearchActionType, SearchState } from './types';
import { useAlgoliaClient } from './useAlgoliaClient';
import { useAlgoliaIndex } from './useAlgoliaIndex';

export interface SearchDispatch {
   (action: SearchAction | SearchAction[]): void;
}

export interface AlgoliaProviderProps<Hit = any> {
   appId: string;
   apiKey: string;
   initialIndexName: string;
   initialRawFilters?: string;
   initialState?: Partial<SearchState<Hit>>;
}

const SearchStateContext = React.createContext<SearchState | null>(null);

const SearchDispatchContext = React.createContext<SearchDispatch | null>(null);

export function AlgoliaProvider(
   props: React.PropsWithChildren<AlgoliaProviderProps>
) {
   const { appId, apiKey, initialIndexName, initialRawFilters } = props;
   const [state, dispatch] = React.useReducer(reducer, {
      ...getInitialState({
         indexName: initialIndexName,
         rawFilters: initialRawFilters,
      }),
      ...props.initialState,
   });
   const client = useAlgoliaClient(appId, apiKey);
   const index = useAlgoliaIndex(client, state.params.indexName);
   const filters = useFiltersQueryString(state);

   React.useEffect(() => {
      index
         .search(state.params.query, {
            distinct: 1,
            filters,
            facets: ['*'],
            page: state.params.page - 1,
            hitsPerPage: state.params.limit,
         })
         .then((result) => {
            dispatch({
               type: SearchActionType.SearchResultUpdated,
               data: result,
            });
         });
   }, [
      filters,
      index,
      state.params.limit,
      state.params.page,
      state.params.query,
   ]);

   return (
      <SearchDispatchContext.Provider value={dispatch}>
         <SearchStateContext.Provider value={state}>
            {props.children}
         </SearchStateContext.Provider>
      </SearchDispatchContext.Provider>
   );
}

export function useSearchStateContext<Hit = any>(): SearchState<Hit> {
   const value = React.useContext(SearchStateContext);
   if (value == null) {
      throw new Error(
         "can't use useSearchStateContext without AlgoliaProvider"
      );
   }
   return value;
}

export function useSearchDispatchContext(): SearchDispatch {
   const value = React.useContext(SearchDispatchContext);
   if (value == null) {
      throw new Error(
         "can't use useSearchDispatchContext without AlgoliaProvider"
      );
   }
   return value;
}
