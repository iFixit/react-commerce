import * as React from 'react';
import { useSearchDispatchContext, useSearchStateContext } from './context';
import { RangeFilter, SearchActionType } from './types';

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

export function useRangeFilter(facetHandle: string): UseRangeFilter {
   const state = useSearchStateContext();
   const dispatch = useSearchDispatchContext();

   const rangeFilter = React.useMemo(() => {
      const filter = state.params.filtersByName[facetHandle];
      return filter && filter.type === 'range' ? filter : null;
   }, [facetHandle, state.params.filtersByName]);

   const set = React.useCallback<UseRangeFilter['set']>(
      (min, max, options) => {
         if (options?.clearFacets) {
            dispatch([
               {
                  type: SearchActionType.RangeFilterSet,
                  filterId: facetHandle,
                  min: min || undefined,
                  max: max || undefined,
               },
               {
                  type: SearchActionType.FiltersCleared,
                  filterIds: options.clearFacets,
               },
            ]);
         } else {
            dispatch({
               type: SearchActionType.RangeFilterSet,
               filterId: facetHandle,
               min: min || undefined,
               max: max || undefined,
            });
         }
      },
      [dispatch, facetHandle]
   );

   return {
      filter: rangeFilter,
      set,
   };
}
