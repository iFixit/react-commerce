import { Draft } from 'immer';
import { FacetFilterOptionClearedAction, SearchState } from '../types';

export function facetFilterOptionCleared(
   draft: Draft<SearchState>,
   action: FacetFilterOptionClearedAction
) {
   const draftFilter = draft.params.filtersByName[action.filterId];
   if (
      draftFilter &&
      draftFilter.type === 'facet' &&
      draftFilter.selectedOptions.includes(action.optionHandle)
   ) {
      draft.isSearching = true;
      draft.params.page = 1;
      if (draftFilter.selectedOptions.length === 1) {
         delete draft.params.filtersByName[action.filterId];
      } else {
         draftFilter.selectedOptions = draftFilter.selectedOptions.filter(
            (option) => option !== action.optionHandle
         );
      }
   }
}
