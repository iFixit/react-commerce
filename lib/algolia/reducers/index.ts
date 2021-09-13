import { assertNever } from '@lib/utils';
import produce from 'immer';
import { SearchAction, SearchActionType, SearchState } from '../types';
import { filtersCleared } from './filtersCleared';
import { listFilterAllItemsCleared } from './listFilterAllItemsCleared';
import { listFilterItemAdded } from './listFilterItemAdded';
import { listFilterItemCleared } from './listFilterItemCleared';
import { listFilterItemSet } from './listFilterItemSet';
import { listFilterItemToggled } from './listFilterItemToggled';
import { pageChanged } from './pageChanged';
import { queryChanged } from './queryChanged';
import { rangeFilterSet } from './rangeFilterSet';
import { searchResultUpdated } from './searchResultUpdated';
import { withMultipleActions } from './utils';

export const reducer = withMultipleActions<SearchState, SearchAction>(
   produce((draftState, action) => {
      switch (action.type) {
         case SearchActionType.QueryChanged: {
            return queryChanged(draftState, action);
         }
         case SearchActionType.SearchResultUpdated: {
            return searchResultUpdated(draftState, action);
         }
         case SearchActionType.FiltersCleared: {
            return filtersCleared(draftState, action);
         }
         case SearchActionType.PageChanged: {
            return pageChanged(draftState, action);
         }
         case SearchActionType.ListFilterItemAdded: {
            return listFilterItemAdded(draftState, action);
         }
         case SearchActionType.ListFilterItemSet: {
            return listFilterItemSet(draftState, action);
         }
         case SearchActionType.ListFilterItemToggled: {
            return listFilterItemToggled(draftState, action);
         }
         case SearchActionType.ListFilterItemCleared: {
            return listFilterItemCleared(draftState, action);
         }
         case SearchActionType.ListFilterAllItemsCleared: {
            return listFilterAllItemsCleared(draftState, action);
         }
         case SearchActionType.RangeFilterSet: {
            return rangeFilterSet(draftState, action);
         }
         default:
            return assertNever(action);
      }
   })
);
