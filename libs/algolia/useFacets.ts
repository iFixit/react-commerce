import * as React from 'react';
import { useSearchContext } from './context';
import { FacetItemsByValue } from './types';

export type Facet = {
   name: string;
   itemsByValue: FacetItemsByValue;
};

export function useFacets(): Facet[] {
   const { searchResult } = useSearchContext();

   const facets = React.useMemo<Facet[]>(() => {
      return Object.keys(searchResult.facetsByName).map((facetName) => {
         return {
            name: facetName,
            itemsByValue: searchResult.facetsByName[facetName],
         };
      });
   }, [searchResult]);

   return facets;
}
