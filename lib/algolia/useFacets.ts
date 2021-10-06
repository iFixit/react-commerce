import { useSelector } from '@lib/fsm-utils';
import * as React from 'react';
import { useSearchServiceContext } from './context';
import { SearchMachineState } from './search.machine';
import { Facet } from './types';

export function useFacets() {
   const service = useSearchServiceContext();
   const facetsEntity = useSelector(service, facetsEntitySelector);

   const facets = React.useMemo<Facet[]>(() => {
      return facetsEntity.allIds.map((id) => {
         return facetsEntity.byId[id];
      });
   }, [facetsEntity.allIds, facetsEntity.byId]);

   return facets;
}

function facetsEntitySelector(state: SearchMachineState) {
   return state.context.facets;
}
