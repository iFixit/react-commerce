import { useAlgoliaSearch } from 'app/_data/product-list/useAlgoliaSearch';
import { useMemo } from 'react';

export function useAvailableItemTypes() {
   const { facets } = useAlgoliaSearch();

   return useMemo(() => {
      const itemTypeFacets = facets.find(
         (facet) => facet.name === 'facet_tags.Item Type'
      );
      if (!itemTypeFacets) return [];

      return (
         itemTypeFacets.options?.map((facetOption) => facetOption.value) ?? []
      );
   }, [facets]);
}
