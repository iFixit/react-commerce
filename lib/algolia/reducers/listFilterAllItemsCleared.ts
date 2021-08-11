import { Draft } from 'immer';
import { ListFilterAllItemsClearedAction, SearchState } from '../types';
import { isListFilter } from '../utils';

export function listFilterAllItemsCleared(
   draft: Draft<SearchState>,
   action: ListFilterAllItemsClearedAction
) {
   const filter = draft.params.filters.byId[action.filterId];

   if (isListFilter(filter)) {
      draft.params.page = 1;
      filter.filterIds.forEach((itemId) => {
         delete draft.params.filters.byId[itemId];
         draft.params.filters.allIds = draft.params.filters.allIds.filter(
            (id) => id != itemId
         );
      });
      filter.filterIds = [];
   }
}
