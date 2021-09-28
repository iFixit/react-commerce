import { Draft } from 'immer';
import { FacetFilterOptionToggledAction, SearchState } from '../types';

export function facetFilterOptionToggled(
   draft: Draft<SearchState>,
   action: FacetFilterOptionToggledAction
) {
   draft.isSearching = true;
   draft.params.page = 1;
   const draftFilter = draft.params.filters.byId[action.filterId];
   if (draftFilter == null || draftFilter.type !== 'facet') {
      draft.params.filters.byId[action.filterId] = {
         id: action.filterId,
         type: 'facet',
         selectedOptions: [action.optionHandle],
      };
      draft.params.filters.allIds.push(action.filterId);
   } else {
      if (draftFilter.selectedOptions.includes(action.optionHandle)) {
         if (draftFilter.selectedOptions.length === 1) {
            draft.params.filters.allIds = draft.params.filters.allIds.filter(
               (id) => id !== action.filterId
            );
            delete draft.params.filters.byId[action.filterId];
         } else {
            draftFilter.selectedOptions = draftFilter.selectedOptions.filter(
               (option) => option !== action.optionHandle
            );
         }
      } else {
         draftFilter.selectedOptions.push(action.optionHandle);
      }
   }
}
