import { useSelector } from '@lib/fsm-utils';
import { useSearchServiceContext } from './context';
import { SearchMachineState } from './search.machine';

export function useSearchParams() {
   const service = useSearchServiceContext();
   const params = useSelector(service, searchParamsSelector);
   return params;
}

function searchParamsSelector(state: SearchMachineState) {
   return state.context.params;
}
