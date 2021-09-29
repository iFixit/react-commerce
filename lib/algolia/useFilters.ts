import * as React from 'react';
import { SearchMachineState } from './search.machine';
import { useSearchServiceContext } from './context';
import { Filter } from './types';
import { useSelector } from '@lib/fsm-utils';

export function useFilters(): Filter[] {
   const service = useSearchServiceContext();
   const filtersEntity = useSelector(service, filtersEntitySelector);

   const filters = React.useMemo(() => {
      return filtersEntity.allIds.map((id) => filtersEntity.byId[id]);
   }, [filtersEntity.allIds, filtersEntity.byId]);

   return filters;
}

function filtersEntitySelector(state: SearchMachineState) {
   return state.context.params.filters;
}
