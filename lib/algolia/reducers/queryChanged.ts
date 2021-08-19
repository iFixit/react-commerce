import { Draft } from 'immer';
import { QueryChangedAction, SearchState } from '../types';

export function queryChanged(
   draft: Draft<SearchState>,
   action: QueryChangedAction
) {
   draft.params.query = action.query;
   draft.params.page = 1;
   draft.isSearching = true;
}
