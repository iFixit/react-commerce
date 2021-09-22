import * as React from 'react';
import { useSearchStateContext } from './context';
import { Facet } from './types';

export function useFacets() {
   const state = useSearchStateContext();

   const facets = React.useMemo<Facet[]>(() => {
      return Object.keys(state.facetsByHandle).map((facetHandle) => {
         return state.facetsByHandle[facetHandle];
      });
   }, [state.facetsByHandle]);

   return { facets, isSearching: state.isSearching };
}
