import { Draft } from 'immer';
import { SearchResultUpdatedAction, SearchState } from '../types';
import { updateSearchStateRecipe } from '../utils';

export function searchResultUpdated(
   draftState: Draft<SearchState>,
   action: SearchResultUpdatedAction
) {
   return updateSearchStateRecipe(draftState, action.data);
}
