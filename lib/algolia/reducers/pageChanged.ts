import { Draft } from 'immer';
import { PageChangedAction, SearchState } from '../types';

export function pageChanged(
   draftState: Draft<SearchState>,
   action: PageChangedAction
) {
   draftState.params.page = action.page;
}
