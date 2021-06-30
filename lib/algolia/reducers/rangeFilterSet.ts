import { Draft } from 'immer';
import {
   NumericComparisonFilter,
   NumericComparisonOperator,
   NumericRangeFilter,
   RangeFilterSetAction,
   SearchState,
} from '../types';
import {
   createNumericComparisonFilter,
   createNumericRangeFilter,
   getRangeFromFilter,
   isBoundedRange,
   isInvalidRange,
   isSameRange,
} from '../utils';

export function rangeFilterSet(
   draftState: Draft<SearchState>,
   action: RangeFilterSetAction
) {
   const filter = draftState.params.filters.byId[action.filterId];
   const draftRange = getRangeFromFilter(filter);
   if (isInvalidRange(action.range) || isSameRange(action.range, draftRange)) {
      return;
   }
   let newFilter: NumericComparisonFilter | NumericRangeFilter | undefined;
   if (isBoundedRange(action.range)) {
      newFilter = createNumericRangeFilter(action.filterId, action.range);
   } else if (action.range.min == null && action.range.max != null) {
      newFilter = createNumericComparisonFilter(
         action.filterId,
         action.range.max,
         NumericComparisonOperator.LessThanOrEqual
      );
   } else if (action.range.min != null && action.range.max == null) {
      newFilter = createNumericComparisonFilter(
         action.filterId,
         action.range.min,
         NumericComparisonOperator.GreaterThanOrEqual
      );
   } else {
      draftState.params.filters.allIds = draftState.params.filters.allIds.filter(
         (id) => id !== action.filterId
      );
      draftState.params.filters.rootIds = draftState.params.filters.rootIds.filter(
         (id) => id !== action.filterId
      );
      delete draftState.params.filters.byId[action.filterId];
   }
   if (newFilter != null) {
      draftState.params.filters.byId[action.filterId] = newFilter;
      if (filter == null) {
         draftState.params.filters.allIds.push(action.filterId);
         draftState.params.filters.rootIds.push(action.filterId);
      }
   }
}
