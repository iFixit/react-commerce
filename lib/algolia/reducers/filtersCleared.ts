import { Draft } from 'immer';
import { FiltersClearedAction, SearchState } from '../types';

export function filtersCleared(
   draft: Draft<SearchState>,
   action: FiltersClearedAction
) {
   draft.params.page = 1;
   if (action.filterIds == null) {
      draft.params.filtersByName = {};
   } else {
      action.filterIds.forEach((filterId) => {
         delete draft.params.filtersByName[filterId];
      });
   }
}
