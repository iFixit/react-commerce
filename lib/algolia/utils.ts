import produce from 'immer';
import * as React from 'react';
import {
   BasicFilter,
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
