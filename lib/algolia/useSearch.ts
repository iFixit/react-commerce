import produce from 'immer';
import * as React from 'react';
import { useSearchContext } from './context';
import { useDebounce } from './utils';

const DEBOUNCE_INTERVAL_MILLIS = 300;
export function useSearch(): [
   query: string,
   search: (newSearch: string) => void
] {
   const { state, setState } = useSearchContext();
   const [query, setQuery] = React.useState(state.query);
   const debouncedQuery = useDebounce(query, DEBOUNCE_INTERVAL_MILLIS);

   React.useEffect(() => {
      setState(
         produce((draftState) => {
            draftState.query = debouncedQuery;
         })
      );
   }, [debouncedQuery, setState]);

   return [query, setQuery];
}
