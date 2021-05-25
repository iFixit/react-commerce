import * as React from 'react';
import { BasicFilter } from './types';

export function mergeUnique(a: string[], b: string[]): string[] {
   const result = a.slice();
   b.forEach((item) => {
      if (!result.includes(item)) {
         result.push(item);
      }
   });
   return result;
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
      facetId: facetName,
      valueId,
   };
   return newFilter;
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
