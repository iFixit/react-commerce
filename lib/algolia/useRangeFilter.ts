import { useDerivedState } from '@lib/hooks';
import * as React from 'react';
import { useSearchContext } from './context';
import { NullablePartial, Range } from './types';
import {
   clearFilter,
   getRangeFromFilter,
   isSameRange,
   setRangeFilter,
} from './utils';

interface UpdateOptions {
   clearFacets?: string[];
}

export interface UseRangeFilter {
   range: NullablePartial<Range>;
   set: (newRange: NullablePartial<Range>, options?: UpdateOptions) => void;
}

export function useRangeFilter(facetName: string): UseRangeFilter {
   const { state, setState } = useSearchContext();

   const range = useDerivedState<NullablePartial<Range>>((current) => {
      const filter = state.filters.byId[facetName];
      const newRange = getRangeFromFilter(filter);
      if (current != null && isSameRange(newRange, current)) {
         return current;
      }
      return newRange;
   });

   const set = React.useCallback<UseRangeFilter['set']>(
      (newRange, options) => {
         setState((state) => {
            let newState = setRangeFilter(state, {
               facetName,
               range: newRange,
            });
            if (options?.clearFacets) {
               newState = clearFilter(newState, options.clearFacets);
            }
            return newState;
         });
      },
      [facetName, setState]
   );

   return {
      range,
      set,
   };
}
