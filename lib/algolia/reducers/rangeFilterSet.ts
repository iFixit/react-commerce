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
   draft: Draft<SearchState>,
   action: RangeFilterSetAction
) {
   draft.params.page = 1;
   const filter = draft.params.filters.byId[action.filterId];
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
      draft.params.filters.allIds = draft.params.filters.allIds.filter(
         (id) => id !== action.filterId
      );
      draft.params.filters.rootIds = draft.params.filters.rootIds.filter(
         (id) => id !== action.filterId
      );
      delete draft.params.filters.byId[action.filterId];
   }
   if (newFilter != null) {
      draft.params.filters.byId[action.filterId] = newFilter;
      if (filter == null) {
         draft.params.filters.allIds.push(action.filterId);
         draft.params.filters.rootIds.push(action.filterId);
      }
   }
}
