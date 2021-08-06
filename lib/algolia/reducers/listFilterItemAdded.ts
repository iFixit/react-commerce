import { Draft } from 'immer';
import { ListFilterItemAddedAction, SearchState } from '../types';
import { createBasicFilter, getListFilterItemIds, mergeUnique } from '../utils';

export function listFilterItemAdded(
   draft: Draft<SearchState>,
   action: ListFilterItemAddedAction
) {
   draft.params.page = 1;
   if (!draft.params.filters.rootIds.includes(action.filterId)) {
      draft.params.filters.rootIds.push(action.filterId);
      draft.params.filters.allIds.push(action.filterId);
   }
   const newItemFilter = createBasicFilter(
      action.filterId,
      action.valueId,
      action.filterId
   );
   const filterItemIds = getListFilterItemIds(draft, action.filterId);
   draft.params.filters.byId[action.filterId] = {
      id: action.filterId,
      filterIds: mergeUnique(filterItemIds, [newItemFilter.id]),
      type: action.filterType,
   };
   draft.params.filters.byId[newItemFilter.id] = newItemFilter;
   draft.params.filters.allIds.push(newItemFilter.id);
}
