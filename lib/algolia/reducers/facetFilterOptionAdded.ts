import { Draft } from 'immer';
import { FacetFilterOptionAddedAction, SearchState } from '../types';

export function facetFilterOptionAdded(
   draft: Draft<SearchState>,
   action: FacetFilterOptionAddedAction
) {
   draft.isSearching = true;
   draft.params.page = 1;
   const draftFilter = draft.params.filtersByName[action.filterId];
   if (draftFilter == null || draftFilter.type !== 'facet') {
      draft.params.filtersByName[action.filterId] = {
         type: 'facet',
         id: action.filterId,
         selectedOptions: [action.optionHandle],
      };
   } else {
      draftFilter.selectedOptions.push(action.optionHandle);
   }
}
