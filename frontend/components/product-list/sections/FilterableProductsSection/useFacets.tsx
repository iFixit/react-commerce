import { useDynamicWidgets } from 'react-instantsearch-hooks-web';

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
