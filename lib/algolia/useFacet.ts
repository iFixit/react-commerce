import { useSearchStateContext } from './context';
import { Facet } from './types';

export function useFacet(facetHandle: string): Facet {
   const state = useSearchStateContext();

   return state.facetsByHandle[facetHandle];
}
