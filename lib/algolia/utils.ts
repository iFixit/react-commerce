import produce, { Draft } from 'immer';
import * as React from 'react';
import {
   BasicFilter,
   FacetValueState,
   Filter,
   ListFilter,
   Maybe,
   NullablePartial,
   NumericComparisonFilter,
   NumericComparisonOperator,
   NumericRange,
   NumericRangeFilter,
   SearchResponse,
   SearchState,
} from './types';

export function mergeUnique(a: string[], b: string[]): string[] {
   const result = a.slice();
   b.forEach((item) => {
      if (!result.includes(item)) {
         result.push(item);
      }
   });
   return result;
}

export function generateId(...args: Array<string | undefined | null>): string {
   return args.filter((arg) => arg != null).join('//');
}

export function useDebounce<Value = any>(value: Value, delay: number): Value {
   const [debouncedValue, setDebouncedValue] = React.useState(value);

   React.useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);
      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return debouncedValue;
}

export function filterListNullableItems<T>(list: Maybe<T>[]): T[] {
   return list.filter((val) => val != null) as T[];
}

// FILTER UTILS

export function isListFilter(filter: Filter): filter is ListFilter {
   return filter.type === 'and' || filter.type === 'or';
}

export function createBasicFilter(
   facetName: string,
   valueId: string,
   parentId?: string
): BasicFilter {
   const newFilterId = generateId(parentId, valueId);
   const newFilter: BasicFilter = {
      id: newFilterId,
      type: 'basic',
      facetName,
      valueId,
      parentId,
   };
   return newFilter;
}

export function createNumericComparisonFilter(
   facetName: string,
   value: number,
   operator: NumericComparisonOperator,
   parentId?: string
): NumericComparisonFilter {
   const newFilterId = generateId(parentId, facetName);
   return {
      type: 'numeric-comparison',
      id: newFilterId,
      facetName,
      operator,
      value,
      parentId,
   };
}

export function createNumericRangeFilter(
   facetName: string,
   range: NumericRange,
   parentId?: string
): NumericRangeFilter {
   const newFilterId = generateId(parentId, facetName);
   return {
      type: 'numeric-range',
      id: newFilterId,
      facetName,
      range,
      parentId,
   };
}

export function isBoundedRange(
   range: NullablePartial<NumericRange>
): range is NumericRange {
   return range.min != null && range.max != null;
}

export function isSameRange(
   a: NullablePartial<NumericRange>,
   b: NullablePartial<NumericRange>
): boolean {
   return a.min === b.min && a.max === b.max;
}

export function isInvalidRange(range: NullablePartial<NumericRange>): boolean {
   return range.min != null && range.max != null && range.min > range.max;
}

export function getListFilterItemIds(
   state: SearchState,
   listFilterId: string
): string[] {
   const currentListFilter: ListFilter = state.params.filters.byId[
      listFilterId
   ] as any;
   return currentListFilter?.filterIds || [];
}

export function getRangeFromFilter(filter: Filter | undefined | null) {
   if (filter != null) {
      if (filter.type === 'numeric-comparison') {
         switch (filter.operator) {
            case NumericComparisonOperator.GreaterThanOrEqual: {
               return { min: filter.value, max: null };
            }
            case NumericComparisonOperator.LessThanOrEqual: {
               return { min: null, max: filter.value };
            }
            default:
               return { min: null, max: null };
         }
      }
      if (filter.type === 'numeric-range') {
         return filter.range;
      }
   }
   return { min: null, max: null };
}

export interface CreateInitialStateArgs {
   indexName: string;
   rawFilters?: string;
   limit?: number;
}
export function createInitialState({
   indexName,
   rawFilters,
   limit = 24,
}: CreateInitialStateArgs): SearchState {
   return {
      params: {
         indexName,
         rawFilters,
         query: '',
         page: 1,
         filters: {
            byId: {},
            rootIds: [],
            allIds: [],
         },
         limit,
      },
      isLoaded: false,
      isSearching: false,
      hits: {
         byId: {},
         allIds: [],
      },
      facets: {
         byId: {},
         allIds: [],
      },
      facetValues: {
         byId: {},
         allIds: [],
      },
   };
}

export interface CreateSearchStateParams {
   indexName: string;
   rawFilters?: string;
}
export function createSearchState<Hit = any>(
   params: CreateSearchStateParams,
   searchResponse: SearchResponse
): SearchState<Hit> {
   const initialState = createInitialState({
      indexName: params.indexName,
      rawFilters: params.rawFilters,
   });
   const producer = produce(updateSearchStateRecipe);
   const state = producer(initialState, searchResponse);
   return state;
}

export function updateSearchStateRecipe(
   draftState: Draft<SearchState>,
   data: SearchResponse
) {
   const responseFacets = data.facets || {};
   const newFacetNames = Object.keys(responseFacets);
   draftState.isLoaded = true;
   draftState.isSearching = false;
   draftState.numberOfPages = data.nbPages;
   draftState.numberOfHits = data.nbHits;
   draftState.hits.allIds = [];
   data.hits.forEach((hit) => {
      draftState.hits.byId[hit.objectID] = hit as any;
      draftState.hits.allIds.push(hit.objectID);
   });
   // Update facets
   newFacetNames.forEach((facetName) => {
      const newValues = Object.keys(responseFacets[facetName]);
      const newValueStates = newValues.map<FacetValueState>((value) => {
         const id = generateId(facetName, value);
         const count = responseFacets[facetName][value];
         return {
            id,
            facetId: facetName,
            value,
            filteredHitCount: count,
            totalHitCount:
               draftState.facetValues.byId[id]?.totalHitCount || count,
         };
      });
      const newValueIds = newValueStates.map((valueState) => valueState.id);
      if (draftState.facets.byId[facetName] == null) {
         draftState.facets.byId[facetName] = {
            name: facetName,
            valueIds: newValueIds,
         };
         draftState.facets.allIds.push(facetName);
      } else {
         draftState.facets.byId[facetName].valueIds = mergeUnique(
            draftState.facets.byId[facetName].valueIds,
            newValueIds
         );
      }
      newValueStates.forEach((newValueState) => {
         draftState.facetValues.byId[newValueState.id] = newValueState;
         if (!draftState.facetValues.allIds.includes(newValueState.id)) {
            draftState.facetValues.allIds.push(newValueState.id);
         }
      });
   });
   draftState.facetValues.allIds.forEach((id) => {
      const facetValue = draftState.facetValues.byId[id];
      if (data.facets?.[facetValue.facetId]?.[facetValue.value] == null) {
         facetValue.filteredHitCount = 0;
      }
   });
}
