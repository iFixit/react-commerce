import { Draft } from 'immer';
import { FiltersClearedAction, SearchState } from '../types';

export function filtersCleared(
   draft: Draft<SearchState>,
   action: FiltersClearedAction
) {
   draft.params.page = 1;
   const { filterIds: removedIds } = action;
   if (removedIds == null) {
      draft.params.filters.byId = {};
      draft.params.filters.allIds = [];
   } else {
      draft.params.filters.allIds = draft.params.filters.allIds.filter(
         (id) => !removedIds.includes(id)
      );
      removedIds.forEach((filterId) => {
         delete draft.params.filters.byId[filterId];
      });
   }
}
