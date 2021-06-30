import { Draft } from 'immer';
import { ListFilterItemAddedAction, SearchState } from '../types';
import { createBasicFilter, getListFilterItemIds, mergeUnique } from '../utils';

export function listFilterItemAdded(
   draftState: Draft<SearchState>,
   action: ListFilterItemAddedAction
) {
   if (!draftState.params.filters.rootIds.includes(action.filterId)) {
      draftState.params.filters.rootIds.push(action.filterId);
      draftState.params.filters.allIds.push(action.filterId);
   }
   const newItemFilter = createBasicFilter(
      action.filterId,
      action.valueId,
      action.filterId
   );
   const filterItemIds = getListFilterItemIds(draftState, action.filterId);
   draftState.params.filters.byId[action.filterId] = {
      id: action.filterId,
      filterIds: mergeUnique(filterItemIds, [newItemFilter.id]),
      type: action.filterType,
   };
   draftState.params.filters.byId[newItemFilter.id] = newItemFilter;
   draftState.params.filters.allIds.push(newItemFilter.id);
}
