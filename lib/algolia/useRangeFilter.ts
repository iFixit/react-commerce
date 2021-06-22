import produce from 'immer';
import * as React from 'react';
import { useSearchContext } from './context';
import {
   Filter,
   NullablePartial,
   NumericComparisonFilter,
   NumericComparisonOperator,
   NumericRangeFilter,
   Range,
} from './types';
import {
   createNumericComparisonFilter,
   createNumericRangeFilter,
   isBoundedRange,
   isInvalidRange,
   isSameRange,
} from './utils';

export type SetNumericRange = React.Dispatch<
   React.SetStateAction<NullablePartial<Range>>
>;

export function useRangeFilter(
   name: string
): [NullablePartial<Range>, SetNumericRange] {
   const { state, setState } = useSearchContext();

   const currentRange = React.useMemo<NullablePartial<Range>>(() => {
      const filter = state.filters.byId[name];
      return getRange(filter);
   }, [name, state.filters.byId]);

   const setRange = React.useCallback<SetNumericRange>(
      (updater) => {
         setState(
            produce((draft) => {
               const filter = draft.filters.byId[name];
               const draftRange = getRange(filter);
               const newRange =
                  typeof updater === 'function' ? updater(draftRange) : updater;
               if (
                  isInvalidRange(newRange) ||
                  isSameRange(newRange, draftRange)
               ) {
                  return;
               }
               let newFilter:
                  | NumericComparisonFilter
                  | NumericRangeFilter
                  | undefined;
               if (isBoundedRange(newRange)) {
                  newFilter = createNumericRangeFilter(name, newRange);
               } else if (newRange.min == null && newRange.max != null) {
                  newFilter = createNumericComparisonFilter(
                     name,
                     newRange.max,
                     NumericComparisonOperator.LessThanOrEqual
                  );
               } else if (newRange.min != null && newRange.max == null) {
                  newFilter = createNumericComparisonFilter(
                     name,
                     newRange.min,
                     NumericComparisonOperator.GreaterThanOrEqual
                  );
               } else {
                  draft.filters.allIds = draft.filters.allIds.filter(
                     (id) => id !== name
                  );
                  draft.filters.rootIds = draft.filters.rootIds.filter(
                     (id) => id !== name
                  );
                  delete draft.filters.byId[name];
               }
               if (newFilter != null) {
                  draft.filters.byId[name] = newFilter;
                  if (filter == null) {
                     draft.filters.allIds.push(name);
                     draft.filters.rootIds.push(name);
                  }
               }
            })
         );
      },
      [name, setState]
   );

   return [currentRange, setRange];
}

function getRange(filter: Filter | undefined | null) {
   if (filter != null) {
      if (filter.type === 'numeric-comparison') {
         switch (filter.operator) {
            case NumericComparisonOperator.GreaterThanOrEqual: {
               return { min: filter.value, max: null };
            }
            case NumericComparisonOperator.LessThanOrEqual: {
               return { min: null, max: filter.value };
            }
            default:
               return { min: null, max: null };
         }
      }
      if (filter.type === 'numeric-range') {
         return filter.range;
      }
   }
   return { min: null, max: null };
}
