import { Draft } from 'immer';
import {
   ListFilterItemToggledAction,
   SearchActionType,
   SearchState,
} from '../types';
import { createBasicFilter, getListFilterItemIds } from '../utils';
import { listFilterItemAdded } from './listFilterItemAdded';
import { listFilterItemCleared } from './listFilterItemCleared';

export function listFilterItemToggled(
   draft: Draft<SearchState>,
   action: ListFilterItemToggledAction
) {
   draft.isSearching = true;
   draft.params.page = 1;
   const newItemFilter = createBasicFilter(
      action.filterId,
      action.valueId,
      action.filterId
   );
   const filterItemIds = getListFilterItemIds(draft, action.filterId);
   if (filterItemIds.includes(newItemFilter.id)) {
      return listFilterItemCleared(draft, {
         type: SearchActionType.ListFilterItemCleared,
         filterId: action.filterId,
         valueId: action.valueId,
      });
   }
   return listFilterItemAdded(draft, {
      type: SearchActionType.ListFilterItemAdded,
      filterId: action.filterId,
      filterType: action.filterType,
      valueId: action.valueId,
   });
}
