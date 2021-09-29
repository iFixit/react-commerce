import * as React from 'react';
import { SearchMachineState } from './search.machine';
import { useSearchServiceContext } from './context';
import { Facet } from './types';
import { useSelector } from '@lib/fsm-utils';

export function useFacet(facetId: string): Facet {
   const service = useSearchServiceContext();
   const facetSelector = React.useCallback(
      (state: SearchMachineState) => {
         return state.context.facets.byId[facetId];
      },
      [facetId]
   );
   const facet = useSelector(service, facetSelector);

   return facet;
}
