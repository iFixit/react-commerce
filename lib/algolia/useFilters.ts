import * as React from 'react';
import { useSearchStateContext } from './context';
import { Filter } from './types';

export function useFilters(): Filter[] {
   const searchState = useSearchStateContext();

   const filters = React.useMemo(() => {
      return searchState.params.filters.allIds.map(
         (id) => searchState.params.filters.byId[id]
      );
   }, [searchState.params.filters]);

   return filters;
}
