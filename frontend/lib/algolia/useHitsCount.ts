import { useSelector } from '@lib/fsm-utils';
import { useSearchServiceContext } from './context';
import { SearchMachineState } from './search.machine';

export function useHitsCount(): number {
   const service = useSearchServiceContext();
   const hitsCount = useSelector(service, hitsCountSelector);
   return hitsCount;
}

function hitsCountSelector(state: SearchMachineState) {
   return state.context.numberOfHits || 0;
}
