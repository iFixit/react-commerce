import { Draft } from 'immer';
import { FacetFilterOptionToggledAction, SearchState } from '../types';

export function facetFilterOptionToggled(
   draft: Draft<SearchState>,
   action: FacetFilterOptionToggledAction
) {
   draft.isSearching = true;
   draft.params.page = 1;
   const draftFilter = draft.params.filtersByName[action.filterId];
   if (draftFilter == null || draftFilter.type !== 'facet') {
      draft.params.filtersByName[action.filterId] = {
         id: action.filterId,
         type: 'facet',
         selectedOptions: [action.optionHandle],
      };
   } else {
      if (draftFilter.selectedOptions.includes(action.optionHandle)) {
         if (draftFilter.selectedOptions.length === 1) {
            delete draft.params.filtersByName[action.filterId];
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
