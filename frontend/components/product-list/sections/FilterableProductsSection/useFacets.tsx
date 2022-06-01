import { useDynamicWidgets } from 'react-instantsearch-hooks-web';

export function useFacets() {
   const { attributesToRender } = useDynamicWidgets({
      maxValuesPerFacet: 200,
   });

   return attributesToRender;
}
