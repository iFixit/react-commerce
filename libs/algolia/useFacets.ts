import * as React from 'react';
import { useSearchContext } from './context';
import { FacetValueState } from './types';

export interface Facet {
   name: string;
   values: FacetValueState[];
}

export function useFacets(): Facet[] {
   const { state } = useSearchContext();

   const facets = React.useMemo<Facet[]>(() => {
      return state.facets.allIds.map<Facet>((id) => {
         const facet = state.facets.byId[id];
         return {
            name: facet.name,
            values: facet.valueIds.map((id) => state.facetValues.byId[id]),
         };
      });
   }, [state.facetValues.byId, state.facets.allIds, state.facets.byId]);

   return facets;
}
