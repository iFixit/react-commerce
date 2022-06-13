import * as React from 'react';
import { useDynamicWidgets } from 'react-instantsearch-hooks-web';
import { WikiInfoEntry } from '@models/product-list/types';

export function useFacets() {
   const { attributesToRender } = useDynamicWidgets({
      maxValuesPerFacet: 200,
   });

   return [
      'facet_tags.Capacity',
      'device',
      'facet_tags.Device Brand',
      'facet_tags.Device Category',
      'facet_tags.Device Type',
      'facet_tags.Item Type',
      'facet_tags.OS',
      'facet_tags.Part or Kit',
      'price_range',
      'worksin',
   ];
   // return attributesToRender;
}

export function useFilteredFacets(wikiInfo: WikiInfoEntry[]) {
   const facets = useFacets();

   const infoNames = React.useMemo(() => {
      return new Set(wikiInfo.map((info) => `facet_tags.${info.name}`));
   }, [wikiInfo]);

   const usefulFacets = React.useMemo(() => {
      const usefulFacets = facets
         .slice()
         .filter((facet) => !infoNames.has(facet));
      return usefulFacets;
   }, [facets, infoNames]);

   return usefulFacets;
}
