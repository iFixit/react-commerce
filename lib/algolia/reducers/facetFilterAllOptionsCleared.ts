import { Draft } from 'immer';
import { FacetFilterAllOptionsClearedAction, SearchState } from '../types';

export function facetFilterAllOptionsCleared(
   draft: Draft<SearchState>,
   action: FacetFilterAllOptionsClearedAction
) {
   draft.params.filters.allIds = draft.params.filters.allIds.filter(
      (id) => id !== action.filterId
   );
   delete draft.params.filters.byId[action.filterId];
}
