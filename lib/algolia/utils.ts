import produce from 'immer';
import * as React from 'react';
import {
   BasicFilter,
   Filter,
   ListFilter,
   Maybe,
   NullablePartial,
   NumericComparisonFilter,
   NumericComparisonOperator,
   NumericRangeFilter,
   Range,
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
   range: Range,
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

export function isBoundedRange(range: NullablePartial<Range>): range is Range {
   return range.min != null && range.max != null;
}

export function isSameRange(
   a: NullablePartial<Range>,
   b: NullablePartial<Range>
): boolean {
   return a.min === b.min && a.max === b.max;
}

export function isInvalidRange(range: NullablePartial<Range>): boolean {
   return range.min != null && range.max != null && range.min > range.max;
}

export function clearFilter(
   state: SearchState,
   filtersIds?: string[]
): SearchState {
   return produce(state, (draft) => {
      if (filtersIds == null) {
         draft.filters.allIds = [];
         draft.filters.rootIds = [];
         draft.filters.byId = {};
      } else {
         filtersIds.forEach((filterId) => {
            const filter = draft.filters.byId[filterId];
            if (filter != null) {
               // If it is a list filter then remove also its children
               if (filter.type === 'and' || filter.type === 'or') {
                  clearFilter(draft, filter.filterIds);
               }
               // If it has a parent that is a list filter that remove the filter reference from the parent
               if (filter.parentId) {
                  const parentFilter = draft.filters.byId[filter.parentId];
                  if (
                     parentFilter.type === 'and' ||
                     parentFilter.type === 'or'
                  ) {
                     parentFilter.filterIds = parentFilter.filterIds.filter(
                        (id) => id !== filterId
                     );
                  }
               }
               draft.filters.allIds = draft.filters.allIds.filter(
                  (id) => id !== filterId
               );
               draft.filters.rootIds = draft.filters.rootIds.filter(
                  (id) => id !== filterId
               );
               delete draft.filters.byId[filterId];
            }
         });
      }
   });
}

export interface AddListFilterItemInput {
   facetName: string;
   refinementType: ListFilter['type'];
   valueId: string;
}
export function addListFilterItem(
   state: SearchState,
   { facetName, refinementType, valueId }: AddListFilterItemInput
) {
   return produce(state, (draftState) => {
      if (!draftState.filters.rootIds.includes(facetName)) {
         draftState.filters.rootIds.push(facetName);
         draftState.filters.allIds.push(facetName);
      }
      const newItemFilter = createBasicFilter(facetName, valueId, facetName);
      const filterItemIds = getListFilterItemIds(draftState, facetName);
      draftState.filters.byId[facetName] = {
         id: facetName,
         filterIds: mergeUnique(filterItemIds, [newItemFilter.id]),
         type: refinementType,
      };
      draftState.filters.byId[newItemFilter.id] = newItemFilter;
      draftState.filters.allIds.push(newItemFilter.id);
   });
}

function getListFilterItemIds(
   state: SearchState,
   listFilterId: string
): string[] {
   const currentListFilter: ListFilter = state.filters.byId[
      listFilterId
   ] as any;
   return currentListFilter?.filterIds || [];
}

export interface SetListFilterInput {
   facetName: string;
   refinementType: ListFilter['type'];
   valueId: string;
}

export function setListFilterItem(
   state: SearchState,
   { facetName, refinementType, valueId }: SetListFilterInput
) {
   return produce(state, (draft) => {
      if (!draft.filters.rootIds.includes(facetName)) {
         draft.filters.rootIds.push(facetName);
         draft.filters.allIds.push(facetName);
      }
      const newItemFilter = createBasicFilter(facetName, valueId, facetName);
      draft.filters.byId[facetName] = {
         id: facetName,
         filterIds: [newItemFilter.id],
         type: refinementType,
      };
      draft.filters.byId[newItemFilter.id] = newItemFilter;
      draft.filters.allIds.push(newItemFilter.id);
   });
}

interface ClearListFilterItemInput {
   facetName: string;
   valueId?: string;
}

export function clearListFilterItem(
   state: SearchState,
   { facetName, valueId }: ClearListFilterItemInput
) {
   return produce(state, (draftState) => {
      const listFilter = draftState.filters.byId[facetName] as ListFilter;
      if (valueId) {
         const itemFilter = createBasicFilter(facetName, valueId, facetName);
         delete draftState.filters.byId[itemFilter.id];
         draftState.filters.allIds = draftState.filters.allIds.filter(
            (id) => id != itemFilter.id
         );
         listFilter.filterIds = listFilter.filterIds.filter(
            (id) => id !== itemFilter.id
         );
         if (listFilter.filterIds.length === 0) {
            delete draftState.filters.byId[listFilter.id];
            draftState.filters.allIds = draftState.filters.allIds.filter(
               (id) => id !== listFilter.id
            );
            draftState.filters.rootIds = draftState.filters.rootIds.filter(
               (id) => id !== listFilter.id
            );
         }
      } else {
         listFilter.filterIds.forEach((itemId) => {
            delete draftState.filters.byId[itemId];
            draftState.filters.allIds = draftState.filters.allIds.filter(
               (id) => id != itemId
            );
         });
         listFilter.filterIds = [];
      }
   });
}

export interface ToggleListFilterItemInput {
   facetName: string;
   valueId: string;
   refinementType: ListFilter['type'];
}

export function toggleListFilterItem(
   state: SearchState,
   { facetName, valueId, refinementType }: ToggleListFilterItemInput
) {
   const newItemFilter = createBasicFilter(facetName, valueId, facetName);
   const filterItemIds = getListFilterItemIds(state, facetName);
   if (filterItemIds.includes(newItemFilter.id)) {
      return clearListFilterItem(state, { facetName, valueId });
   }
   return addListFilterItem(state, { facetName, refinementType, valueId });
}

export interface SetRangeFilterInput {
   facetName: string;
   range: NullablePartial<Range>;
}

export function setRangeFilter(
   state: SearchState,
   { facetName, range }: SetRangeFilterInput
) {
   return produce(state, (draft) => {
      const filter = draft.filters.byId[facetName];
      const draftRange = getRangeFromFilter(filter);
      if (isInvalidRange(range) || isSameRange(range, draftRange)) {
         return;
      }
      let newFilter: NumericComparisonFilter | NumericRangeFilter | undefined;
      if (isBoundedRange(range)) {
         newFilter = createNumericRangeFilter(facetName, range);
      } else if (range.min == null && range.max != null) {
         newFilter = createNumericComparisonFilter(
            facetName,
            range.max,
            NumericComparisonOperator.LessThanOrEqual
         );
      } else if (range.min != null && range.max == null) {
         newFilter = createNumericComparisonFilter(
            facetName,
            range.min,
            NumericComparisonOperator.GreaterThanOrEqual
         );
      } else {
         draft.filters.allIds = draft.filters.allIds.filter(
            (id) => id !== facetName
         );
         draft.filters.rootIds = draft.filters.rootIds.filter(
            (id) => id !== facetName
         );
         delete draft.filters.byId[facetName];
      }
      if (newFilter != null) {
         draft.filters.byId[facetName] = newFilter;
         if (filter == null) {
            draft.filters.allIds.push(facetName);
            draft.filters.rootIds.push(facetName);
         }
      }
   });
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
