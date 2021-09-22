import { Draft } from 'immer';
import { FacetFilterAllOptionsClearedAction, SearchState } from '../types';

export function facetFilterAllOptionsCleared(
   draft: Draft<SearchState>,
   action: FacetFilterAllOptionsClearedAction
) {
   delete draft.params.filtersByName[action.filterId];
}
