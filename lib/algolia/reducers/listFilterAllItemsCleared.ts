import { Draft } from 'immer';
import { ListFilterAllItemsClearedAction, SearchState } from '../types';
import { isListFilter } from '../utils';

export function listFilterAllItemsCleared(
   draftState: Draft<SearchState>,
   action: ListFilterAllItemsClearedAction
) {
   const filter = draftState.params.filters.byId[action.filterId];

   if (isListFilter(filter)) {
      filter.filterIds.forEach((itemId) => {
         delete draftState.params.filters.byId[itemId];
         draftState.params.filters.allIds = draftState.params.filters.allIds.filter(
            (id) => id != itemId
         );
      });
      filter.filterIds = [];
   }
}
