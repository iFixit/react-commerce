import * as React from 'react';
import { useSearchStateContext } from './context';
import { Facet } from './types';

export function useFacets() {
   const state = useSearchStateContext();

   const facets = React.useMemo<Facet[]>(() => {
      return state.facets.allIds.map((id) => {
         return state.facets.byId[id];
      });
   }, [state.facets]);

   return { facets, isSearching: state.isSearching };
}
