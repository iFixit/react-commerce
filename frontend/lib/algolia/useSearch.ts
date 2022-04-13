import * as React from 'react';
import { SearchMachineState } from './search.machine';
import { useSearchServiceContext } from './context';
import { useSelector } from '@lib/fsm-utils';
import { useDebounce } from '@ifixit/ui';

const DEBOUNCE_INTERVAL_MILLIS = 300;

export function useSearch(): [
   query: string,
   search: (newSearch: string) => void
] {
   const service = useSearchServiceContext();
   const contextQuery = useSelector(service, querySelector);
   const [query, setQuery] = React.useState(contextQuery);
   const debouncedQuery = useDebounce(query, DEBOUNCE_INTERVAL_MILLIS);
   const lastDeboucedQueryRef = React.useRef<string | null>(null);

   React.useEffect(() => {
      if (debouncedQuery !== contextQuery) {
         if (lastDeboucedQueryRef.current === debouncedQuery) {
            setQuery(contextQuery);
         } else {
            service.send({
               type: 'SET_QUERY',
               query: debouncedQuery,
            });
         }
      }
      lastDeboucedQueryRef.current = debouncedQuery;
   }, [contextQuery, debouncedQuery, service]);

   return [query, setQuery];
}

function querySelector(state: SearchMachineState) {
   return state.context.params.query;
}
