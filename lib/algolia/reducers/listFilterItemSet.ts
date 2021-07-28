import { Draft } from 'immer';
import { ListFilterItemSetAction, SearchState } from '../types';
import { createBasicFilter } from '../utils';

export function listFilterItemSet(
   draft: Draft<SearchState>,
   action: ListFilterItemSetAction
) {
   if (!draft.params.filters.rootIds.includes(action.filterId)) {
      draft.params.filters.rootIds.push(action.filterId);
   }
   if (!draft.params.filters.allIds.includes(action.filterId)) {
      draft.params.filters.allIds.push(action.filterId);
   }
   const newItemFilter = createBasicFilter(
      action.filterId,
      action.valueId,
      action.filterId
   );
   draft.params.filters.byId[action.filterId] = {
      id: action.filterId,
      filterIds: [newItemFilter.id],
      type: action.filterType,
   };
   draft.params.filters.byId[newItemFilter.id] = newItemFilter;
   draft.params.filters.allIds.push(newItemFilter.id);
}
