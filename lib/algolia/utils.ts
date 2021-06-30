import * as React from 'react';
import {
   BasicFilter,
   Filter,
   ListFilter,
   Maybe,
   NullablePartial,
   NumericComparisonFilter,
   NumericComparisonOperator,
   NumericRange,
   NumericRangeFilter,
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
