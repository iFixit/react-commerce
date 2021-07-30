import * as React from 'react';
import { useSearchDispatchContext, useSearchStateContext } from './context';
import { SearchActionType } from './types';
import { useDebounce } from './utils';

const DEBOUNCE_INTERVAL_MILLIS = 300;

export function useSearch(): [
   query: string,
   search: (newSearch: string) => void
] {
   const state = useSearchStateContext();
   const dispatch = useSearchDispatchContext();
   const [query, setQuery] = React.useState(state.params.query);
   const debouncedQuery = useDebounce(query, DEBOUNCE_INTERVAL_MILLIS);

   React.useEffect(() => {
      console.log('context changed');
      setQuery((current) => {
         if (current !== state.params.query) {
            return state.params.query;
         }
         return current;
      });
   }, [state.params.query]);

   React.useEffect(() => {
      console.log('debounced query changed');
      dispatch({
         type: SearchActionType.QueryChanged,
         query: debouncedQuery,
      });
   }, [debouncedQuery, dispatch]);

   return [query, setQuery];
}
