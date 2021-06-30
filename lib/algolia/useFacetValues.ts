import * as React from 'react';
import { useSearchStateContext } from './context';
import { FacetValueState } from './types';

export interface UseFacetValues {
   isLoaded: boolean;
   values: FacetValueState[];
}

export function useFacetValues(facetName: string): UseFacetValues {
   const state = useSearchStateContext();

   const values = React.useMemo<FacetValueState[]>(() => {
      const facet = state.facets.byId[facetName];
      return facet.valueIds.map((id) => state.facetValues.byId[id]);
   }, [facetName, state.facetValues.byId, state.facets.byId]);

   return {
      isLoaded: state.isLoaded,
      values,
   };
}
