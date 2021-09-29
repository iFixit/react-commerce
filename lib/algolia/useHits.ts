import { useSelector } from '@lib/fsm-utils';
import * as React from 'react';
import { useSearchServiceContext } from './context';
import { SearchMachineState } from './search.machine';

interface UseHits<Hit = any> {
   isLoaded: boolean;
   isSearching: boolean;
   numberOfHits: number;
   hits: Hit[];
}

export function useHits<Hit = any>(): UseHits<Hit> {
   const service = useSearchServiceContext<Hit>();
   const hitsEntity = useSelector(service, hitsEntitySelector);
   const numberOfHits = useSelector(service, numberOfHitsSelector);
   const isSearching = useSelector(service, isSearchingSelector);
   const isLoaded = useSelector(service, isLoadedSelector);

   const result = React.useMemo<UseHits>(() => {
      const hits = hitsEntity.allIds.map((id) => hitsEntity.byId[id]);
      return {
         isLoaded,
         isSearching,
         numberOfHits,
         hits,
      };
   }, [
      hitsEntity.allIds,
      hitsEntity.byId,
      isLoaded,
      isSearching,
      numberOfHits,
   ]);
   return result;
}

function hitsEntitySelector<Hit = any>(state: SearchMachineState<Hit>) {
   return state.context.hits;
}

function numberOfHitsSelector(state: SearchMachineState) {
   return state.context.numberOfHits || 0;
}

function isSearchingSelector(state: SearchMachineState) {
   return state.matches('search');
}

function isLoadedSelector(state: SearchMachineState) {
   return state.context.isLoaded;
}
