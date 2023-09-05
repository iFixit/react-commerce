import { useMemo } from 'react';
import { useHits } from 'react-instantsearch-hooks-web';

export function useAvailableItemTypes() {
   const { results } = useHits();

   return useMemo(() => {
      const itemTypeFacets = results?.hierarchicalFacets.find(
         (facet) => facet.name === 'facet_tags.Item Type'
      );
      if (!itemTypeFacets) return [];

      return itemTypeFacets.data?.map((facet) => facet.name) ?? [];
   }, [results]);
}
