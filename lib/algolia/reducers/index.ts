import { assertNever } from '@lib/utils';
import produce from 'immer';
import { SearchAction, SearchActionType, SearchState } from '../types';
import { updateSearchStateRecipe } from '../utils';
import { filtersCleared } from './filtersCleared';
import { facetFilterAllOptionsCleared } from './facetFilterAllOptionsCleared';
import { facetFilterOptionAdded } from './facetFilterOptionAdded';
import { facetFilterOptionCleared } from './facetFilterOptionCleared';
import { facetFilterSet } from './facetFilterSet';
import { facetFilterOptionToggled } from './facetFilterOptionToggled';
import { pageChanged } from './pageChanged';
import { queryChanged } from './queryChanged';
import { rangeFilterSet } from './rangeFilterSet';
import { withMultipleActions } from './utils';

export const reducer = withMultipleActions<SearchState, SearchAction>(
   produce((draftState, action) => {
      switch (action.type) {
         case SearchActionType.QueryChanged: {
            return queryChanged(draftState, action);
         }
         case SearchActionType.SearchResultUpdated: {
            return updateSearchStateRecipe(draftState, action.data);
         }
         case SearchActionType.FiltersCleared: {
            return filtersCleared(draftState, action);
         }
         case SearchActionType.PageChanged: {
            return pageChanged(draftState, action);
         }
         case SearchActionType.FacetFilterOptionAdded: {
            return facetFilterOptionAdded(draftState, action);
         }
         case SearchActionType.FacetFilterOptionSet: {
            return facetFilterSet(draftState, action);
         }
         case SearchActionType.FacetFilterOptionToggled: {
            return facetFilterOptionToggled(draftState, action);
         }
         case SearchActionType.FacetFilterOptionCleared: {
            return facetFilterOptionCleared(draftState, action);
         }
         case SearchActionType.FacetFilterAllOptionsCleared: {
            return facetFilterAllOptionsCleared(draftState, action);
         }
         case SearchActionType.RangeFilterSet: {
            return rangeFilterSet(draftState, action);
         }
         default:
            return assertNever(action);
      }
   })
);
