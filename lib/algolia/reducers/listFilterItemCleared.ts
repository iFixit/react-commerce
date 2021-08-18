import { Draft } from 'immer';
import { ListFilterItemClearedAction, SearchState } from '../types';
import { createBasicFilter, isListFilter } from '../utils';

export function listFilterItemCleared(
   draft: Draft<SearchState>,
   action: ListFilterItemClearedAction
) {
   const filter = draft.params.filters.byId[action.filterId];
   if (isListFilter(filter)) {
      draft.isSearching = true;
      draft.params.page = 1;
      const itemFilter = createBasicFilter(
         action.filterId,
         action.valueId,
         action.filterId
      );
      delete draft.params.filters.byId[itemFilter.id];
      draft.params.filters.allIds = draft.params.filters.allIds.filter(
         (id) => id != itemFilter.id
      );
      filter.filterIds = filter.filterIds.filter((id) => id !== itemFilter.id);
      if (filter.filterIds.length === 0) {
         delete draft.params.filters.byId[filter.id];
         draft.params.filters.allIds = draft.params.filters.allIds.filter(
            (id) => id !== filter.id
         );
         draft.params.filters.rootIds = draft.params.filters.rootIds.filter(
            (id) => id !== filter.id
         );
      }
   }
}
