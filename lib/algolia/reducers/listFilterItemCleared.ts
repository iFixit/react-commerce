import { Draft } from 'immer';
import { ListFilterItemClearedAction, SearchState } from '../types';
import { createBasicFilter, isListFilter } from '../utils';

export function listFilterItemCleared(
   draftState: Draft<SearchState>,
   action: ListFilterItemClearedAction
) {
   const filter = draftState.params.filters.byId[action.filterId];
   if (isListFilter(filter)) {
      const itemFilter = createBasicFilter(
         action.filterId,
         action.valueId,
         action.filterId
      );
      delete draftState.params.filters.byId[itemFilter.id];
      draftState.params.filters.allIds = draftState.params.filters.allIds.filter(
         (id) => id != itemFilter.id
      );
      filter.filterIds = filter.filterIds.filter((id) => id !== itemFilter.id);
      if (filter.filterIds.length === 0) {
         delete draftState.params.filters.byId[filter.id];
         draftState.params.filters.allIds = draftState.params.filters.allIds.filter(
            (id) => id !== filter.id
         );
         draftState.params.filters.rootIds = draftState.params.filters.rootIds.filter(
            (id) => id !== filter.id
         );
      }
   }
}
