import { Draft } from 'immer';
import { FacetFilterOptionSetAction, SearchState } from '../types';

export function facetFilterSet(
   draft: Draft<SearchState>,
   action: FacetFilterOptionSetAction
) {
   draft.isSearching = true;
   draft.params.page = 1;
   if (!draft.params.filters.allIds.includes(action.filterId)) {
      draft.params.filters.allIds.push(action.filterId);
   }
   draft.params.filters.byId[action.filterId] = {
      id: action.filterId,
      type: 'facet',
      selectedOptions: [action.optionHandle],
   };
}
