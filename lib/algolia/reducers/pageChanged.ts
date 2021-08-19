import { Draft } from 'immer';
import { PageChangedAction, SearchState } from '../types';

export function pageChanged(
   draft: Draft<SearchState>,
   action: PageChangedAction
) {
   draft.isSearching = true;
   draft.params.page = action.page;
}
