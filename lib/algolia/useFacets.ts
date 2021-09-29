import * as React from 'react';
import { SearchMachineState } from './search.machine';
import { useSearchServiceContext } from './context';
import { Facet } from './types';
import { useSelector } from '@lib/fsm-utils';

export function useFacets() {
   const service = useSearchServiceContext();
   const facetsEntity = useSelector(service, facetsEntitySelector);
   const isSearching = useSelector(service, isSearchingSelector);

   const facets = React.useMemo<Facet[]>(() => {
      return facetsEntity.allIds.map((id) => {
         return facetsEntity.byId[id];
      });
   }, [facetsEntity.allIds, facetsEntity.byId]);

   return { facets, isSearching };
}

function facetsEntitySelector(state: SearchMachineState) {
   return state.context.facets;
}

function isSearchingSelector(state: SearchMachineState) {
   return state.matches('search');
}
