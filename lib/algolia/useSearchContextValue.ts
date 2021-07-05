import * as React from 'react';
import { search } from './search';
import { AlgoliaProviderProps, SearchContext, SearchState } from './types';
import { useAlgoliaClient } from './useAlgoliaClient';
import { useAlgoliaIndex } from './useAlgoliaIndex';

export function useSearchContextValue<Hit = any>(
   props: AlgoliaProviderProps
): SearchContext {
   const {
      appId,
      apiKey,
      indexName,
      onIndexNameChange,
      initialState,
      state: controlledState,
      onChange,
   } = props;
   const client = useAlgoliaClient(appId, apiKey);
   const [internalState, setInternalState] = React.useState<SearchState<Hit>>({
      query: '',
      page: 1,
      isLoaded: false,
      hits: {
         byId: {},
         allIds: [],
      },
      facets: {
         byId: {},
         allIds: [],
      },
      facetValues: {
         byId: {},
         allIds: [],
      },
      filters: {
         byId: {},
         rootIds: [],
         allIds: [],
      },
      ...initialState,
   });
   const state = React.useMemo(() => {
      return controlledState || internalState;
   }, [controlledState, internalState]);
   const isControlled = controlledState != null;
   const previousState = usePrevious(state);
   const previousIndexName = usePrevious(indexName);

   const index = useAlgoliaIndex(client, indexName);

   const setState = React.useCallback(
      (updater: React.SetStateAction<SearchState<Hit>>) => {
         if (isControlled) {
            if (typeof updater === 'function') {
               onChange?.(updater(state));
            } else {
               onChange?.(updater);
            }
         } else {
            setInternalState(updater);
         }
      },
      [isControlled, onChange, state]
   );

   React.useEffect(() => {
      async function update() {
         if (
            index.indexName !== previousIndexName ||
            previousState == null ||
            shouldUpdateSearchResults(previousState, state)
         ) {
            const newState = await search(state, index);
            setInternalState(newState);
         }
      }
      update();
   }, [state, previousState, index, previousIndexName]);

   const value: SearchContext = {
      state,
      setState,
      index,
   };

   return value;
}

function usePrevious<Value = any>(value: Value): Value | null {
   const ref = React.useRef<Value | null>(null);
   React.useEffect(() => {
      ref.current = value;
   }, [value]);
   return ref.current;
}

function shouldUpdateSearchResults<Hit = any>(
   previousState: SearchState<Hit>,
   newState: SearchState<Hit>
): boolean {
   return (
      previousState.query !== newState.query ||
      previousState.page !== newState.page ||
      previousState.limit !== newState.limit ||
      previousState.rawFilters !== newState.rawFilters ||
      previousState.filters !== newState.filters
   );
}
