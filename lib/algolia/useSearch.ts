import { useDebounce } from '@lib/hooks';
import * as React from 'react';
import { SearchMachineState } from './search.machine';
import { useSearchServiceContext } from './context';
import { useSelector } from '@lib/fsm-utils';

const DEBOUNCE_INTERVAL_MILLIS = 300;

export function useSearch(): [
   query: string,
   search: (newSearch: string) => void
] {
   const service = useSearchServiceContext();
   const contextQuery = useSelector(service, querySelector);
   const [query, setQuery] = React.useState(contextQuery);
   const debouncedQuery = useDebounce(query, DEBOUNCE_INTERVAL_MILLIS);

   React.useEffect(() => {
      setQuery((current) => {
         if (current !== contextQuery) {
            return contextQuery;
         }
         return current;
      });
   }, [contextQuery]);

   React.useEffect(() => {
      service.send({
         type: 'SET_QUERY',
         query: debouncedQuery,
      });
   }, [debouncedQuery, service]);

   return [query, setQuery];
}

function querySelector(state: SearchMachineState) {
   return state.context.params.query;
}
