import { useDerivedState } from '@lib/hooks';
import * as React from 'react';
import { useSearchDispatchContext, useSearchStateContext } from './context';
import { NullablePartial, NumericRange, SearchActionType } from './types';
import { getRangeFromFilter, isSameRange } from './utils';

interface UpdateOptions {
   clearFacets?: string[];
}

export interface UseRangeFilter {
   range: NullablePartial<NumericRange>;
   set: (
      newRange: NullablePartial<NumericRange>,
      options?: UpdateOptions
   ) => void;
}

export function useRangeFilter(facetName: string): UseRangeFilter {
   const state = useSearchStateContext();
   const dispatch = useSearchDispatchContext();

   const range = useDerivedState<NullablePartial<NumericRange>>((current) => {
      const filter = state.params.filters.byId[facetName];
      const newRange = getRangeFromFilter(filter);
      if (current != null && isSameRange(newRange, current)) {
         return current;
      }
      return newRange;
   });

   const set = React.useCallback<UseRangeFilter['set']>(
      (newRange, options) => {
         if (options?.clearFacets) {
            dispatch([
               {
                  type: SearchActionType.RangeFilterSet,
                  filterId: facetName,
                  range: newRange,
               },
               {
                  type: SearchActionType.FiltersCleared,
                  filterIds: options.clearFacets,
               },
            ]);
         } else {
            dispatch({
               type: SearchActionType.RangeFilterSet,
               filterId: facetName,
               range: newRange,
            });
         }
      },
      [dispatch, facetName]
   );

   return {
      range,
      set,
   };
}
