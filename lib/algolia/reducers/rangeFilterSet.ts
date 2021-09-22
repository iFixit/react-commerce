import { Draft } from 'immer';
import { RangeFilterSetAction, SearchState } from '../types';

export function rangeFilterSet(
   draft: Draft<SearchState>,
   action: RangeFilterSetAction
) {
   if (isInvalidRange(action.min, action.max)) {
      return;
   }

   const draftFilter = draft.params.filtersByName[action.filterId];
   if (draftFilter == null || draftFilter.type !== 'range') {
      draft.isSearching = true;
      draft.params.page = 1;
      draft.params.filtersByName[action.filterId] = {
         id: action.filterId,
         type: 'range',
         min: action.min,
         max: action.max,
      };
   } else if (
      draftFilter.min !== action.min ||
      draftFilter.max !== action.max
   ) {
      draft.isSearching = true;
      draft.params.page = 1;
      draftFilter.min = action.min;
      draftFilter.max = action.max;
   }
}

function isInvalidRange(min?: number, max?: number): boolean {
   return (
      (min == null && max == null) || (min != null && max != null && min > max)
   );
}
