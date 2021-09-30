import { useSelector } from '@lib/fsm-utils';
import { useSearchServiceContext } from './context';
import { SearchMachineState } from './search.machine';

export function useIsSearching() {
   const service = useSearchServiceContext();
   const isSearching = useSelector(service, isSearchingSelector);

   return isSearching;
}

function isSearchingSelector(state: SearchMachineState) {
   return state.matches('search');
}
