import { Draft } from 'immer';
import { FacetFilterOptionSetAction, SearchState } from '../types';

export function facetFilterSet(
   draft: Draft<SearchState>,
   action: FacetFilterOptionSetAction
) {
   draft.isSearching = true;
   draft.params.page = 1;
   draft.params.filtersByName[action.filterId] = {
      id: action.filterId,
      type: 'facet',
      selectedOptions: [action.optionHandle],
   };
}
