import { useSelector } from '@lib/fsm-utils';
import { useSearchServiceContext } from './context';
import { SearchMachineState } from './search.machine';

export function useSearchState() {
   const service = useSearchServiceContext();
   const searchState = useSelector(service, searchStateSelector);
   return searchState;
}

function searchStateSelector(state: SearchMachineState) {
   return state.value;
}
