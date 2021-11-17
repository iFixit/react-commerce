import { useSelector } from '@lib/fsm-utils';
import * as React from 'react';
import { useSearchServiceContext } from './context';
import { SearchMachineState } from './search.machine';

export function useHits<Hit = any>(): Hit[] {
   const service = useSearchServiceContext<Hit>();
   const hitsEntity = useSelector(service, hitsEntitySelector);

   const hits = React.useMemo<Hit[]>(() => {
      return hitsEntity.allIds.map((id) => hitsEntity.byId[id]);
   }, [hitsEntity.allIds, hitsEntity.byId]);

   return hits;
}

function hitsEntitySelector<Hit = any>(state: SearchMachineState<Hit>) {
   return state.context.hits;
}
