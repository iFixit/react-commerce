import { Draft } from 'immer';
import { FacetFilterOptionAddedAction, SearchState } from '../types';

export function facetFilterOptionAdded(
   draft: Draft<SearchState>,
   action: FacetFilterOptionAddedAction
) {
   draft.isSearching = true;
   draft.params.page = 1;
   const draftFilter = draft.params.filters.byId[action.filterId];
   if (draftFilter == null || draftFilter.type !== 'facet') {
      draft.params.filters.byId[action.filterId] = {
         type: 'facet',
         id: action.filterId,
         selectedOptions: [action.optionHandle],
      };
      draft.params.filters.allIds.push(action.filterId);
   } else {
      draftFilter.selectedOptions.push(action.optionHandle);
   }
}
