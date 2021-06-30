import { Draft } from 'immer';
import { QueryChangedAction, SearchState } from '../types';

export function queryChanged(
   draftState: Draft<SearchState>,
   action: QueryChangedAction
) {
   draftState.params.query = action.query;
}
