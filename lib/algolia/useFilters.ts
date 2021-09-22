import * as React from 'react';
import { useSearchStateContext } from './context';
import { Filter } from './types';

export function useFilters(): Filter[] {
   const searchState = useSearchStateContext();

   const filters = React.useMemo(() => {
      return Object.keys(searchState.params.filtersByName).map(
         (name) => searchState.params.filtersByName[name]
      );
   }, [searchState.params.filtersByName]);

   return filters;
}
