/**
 * useFacetFilterList implements a list of basic filters on a facet. The filter list can be
 * both conjunctive (AND) or disjunctive (OR).
 * Under the hood the filter is managed as a ListFilter that represents the expression
 * of multiple basic filters combined (according to refinementType prop).
 */
import { useDerivedState } from '@lib/hooks';
import * as React from 'react';
import { useSearchContext } from './context';
import { BasicFilter, ListFilter } from './types';
import {
   addListFilterItem,
   clearFilter,
   clearListFilterItem,
   setListFilterItem,
   toggleListFilterItem,
} from './utils';

export interface UseFacetFilterListOptions {
   filterType?: ListFilter['type'];
}

interface UpdateOptions {
   clearFacets?: string[];
}

export interface UseFacetFilterList {
   selectedValueIds: string[];
   add: (valueId: string, options?: UpdateOptions) => void;
   set: (valueId: string, options?: UpdateOptions) => void;
   toggle: (valueId: string, options?: UpdateOptions) => void;
   clear: (valueId?: string) => void;
}

export function useFacetFilterList(
   facetName: string,
   { filterType = 'or' }: UseFacetFilterListOptions = {}
): UseFacetFilterList {
   const { state, setState } = useSearchContext();

   const selectedValueIds = useDerivedState<string[]>((current) => {
      let ids: string[] = [];
      const listFilter = state.filters.byId[facetName];
      if (listFilter != null) {
         if (listFilter.type === 'and' || listFilter.type === 'or') {
            ids = listFilter.filterIds
               .map((id) => state.filters.byId[id])
               .map((filter: any) => {
                  return (filter as BasicFilter).valueId;
               });
         } else {
            throw new Error(
               `useFacetFilterList: unexpected filter type "${listFilter.type}". Allowed values are "and", "or"`
            );
         }
      }
      if (
         current &&
         current.every((id) => ids.includes(id)) &&
         ids.every((id) => current.includes(id))
      ) {
         return current;
      }
      return ids;
   });

   const add = React.useCallback<UseFacetFilterList['add']>(
      (valueId, options) => {
         setState((state) => {
            let newState = addListFilterItem(state, {
               facetName,
               refinementType: filterType,
               valueId,
            });
            if (options?.clearFacets) {
               newState = clearFilter(newState, options.clearFacets);
            }
            return newState;
         });
      },
      [facetName, filterType, setState]
   );

   const set = React.useCallback<UseFacetFilterList['set']>(
      (valueId, options) => {
         setState((state) => {
            let newState = setListFilterItem(state, {
               facetName,
               refinementType: filterType,
               valueId,
            });
            if (options?.clearFacets) {
               newState = clearFilter(newState, options.clearFacets);
            }
            return newState;
         });
      },
      [facetName, filterType, setState]
   );

   const toggle = React.useCallback<UseFacetFilterList['toggle']>(
      (valueId, options) => {
         setState((state) => {
            let newState = toggleListFilterItem(state, {
               facetName,
               refinementType: filterType,
               valueId,
            });
            if (options?.clearFacets) {
               newState = clearFilter(newState, options.clearFacets);
            }
            return newState;
         });
      },
      [facetName, filterType, setState]
   );

   const clear = React.useCallback<UseFacetFilterList['clear']>(
      (valueId) => {
         setState((state) =>
            clearListFilterItem(state, {
               facetName,
               valueId,
            })
         );
      },
      [facetName, setState]
   );

   return {
      selectedValueIds,
      add,
      set,
      toggle,
      clear,
   };
}
