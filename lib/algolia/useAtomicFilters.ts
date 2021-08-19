import { assertNever } from '@lib/utils';
import * as React from 'react';
import { useSearchStateContext } from './context';
import { AtomicFilter, SearchParams } from './types';

export interface UseAtomicFilters {
   appliedFilters: AtomicFilter[];
   clear(id?: string): void;
}

export interface ClearFilterFn {
   (id?: string): void;
}

export function useAtomicFilters(): AtomicFilter[] {
   const {
      params: { filters },
   } = useSearchStateContext();

   const atomicFilters = React.useMemo(() => {
      return getAtomicFilters(filters);
   }, [filters]);

   return atomicFilters;
}

function getAtomicFilters(
   filters: SearchParams['filters'],
   id?: string
): AtomicFilter[] {
   if (id == null) {
      return filters.rootIds.reduce<AtomicFilter[]>((list, rootId) => {
         return list.concat(getAtomicFilters(filters, rootId));
      }, []);
   }
   const filter = filters.byId[id];
   if (filter == null) {
      return [];
   }

   switch (filter.type) {
      case 'or':
      case 'and': {
         return filter.filterIds
            .map((id) => getAtomicFilters(filters, id))
            .flat();
      }
      case 'numeric-range':
      case 'numeric-comparison':
      case 'basic': {
         return [filter];
      }
      default:
         return assertNever(filter);
   }
}
