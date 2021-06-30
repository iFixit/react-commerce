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
   draftState: Draft<SearchState>,
   action: ListFilterItemToggledAction
) {
   const newItemFilter = createBasicFilter(
      action.filterId,
      action.valueId,
      action.filterId
   );
   const filterItemIds = getListFilterItemIds(draftState, action.filterId);
   if (filterItemIds.includes(newItemFilter.id)) {
      return listFilterItemCleared(draftState, {
         type: SearchActionType.ListFilterItemCleared,
         filterId: action.filterId,
         valueId: action.valueId,
      });
   }
   return listFilterItemAdded(draftState, {
      type: SearchActionType.ListFilterItemAdded,
      filterId: action.filterId,
      filterType: action.filterType,
      valueId: action.valueId,
      clearFilterIds: action.clearFilterIds,
   });
}
