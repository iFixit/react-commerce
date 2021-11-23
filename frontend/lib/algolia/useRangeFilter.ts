import * as React from 'react';
import { SearchMachineState } from './search.machine';
import { useSearchServiceContext } from './context';
import { RangeFilter } from './types';
import { useSelector } from '@lib/fsm-utils';

interface UpdateOptions {
   clearFacets?: string[];
}

export interface UseRangeFilter {
   filter: RangeFilter | null;
   set: (
      min?: number | null,
      max?: number | null,
      options?: UpdateOptions
   ) => void;
}

export function useRangeFilter(filterId: string): UseRangeFilter {
   const service = useSearchServiceContext();

   const rangeFilterSelector = React.useCallback(
      (state: SearchMachineState) => {
         const filter = state.context.params.filters.byId[filterId];
         return filter && filter.type === 'range' ? filter : null;
      },
      [filterId]
   );
   const rangeFilter = useSelector(service, rangeFilterSelector);

   const set = React.useCallback<UseRangeFilter['set']>(
      (min, max, options) => {
         service.send({
            type: 'SET_RANGE_FILTER',
            filterId: filterId,
            min: min || undefined,
            max: max || undefined,
            clearIds: options?.clearFacets,
         });
      },
      [filterId, service]
   );

   return {
      filter: rangeFilter,
      set,
   };
}
