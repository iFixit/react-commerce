/**
 * useFacetFilterList implements a list of basic filters on a facet. The filter list can be
 * both conjunctive (AND) or disjunctive (OR).
 * Under the hood the filter is managed as a ListFilter that represents the expression
 * of multiple basic filters combined (according to refinementType prop).
 */
import { useDerivedState } from '@lib/hooks';
import * as React from 'react';
import { useSearchDispatchContext, useSearchStateContext } from './context';
import { BasicFilter, ListFilter, SearchActionType } from './types';

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
   const state = useSearchStateContext();
   const dispatch = useSearchDispatchContext();

   const selectedValueIds = useDerivedState<string[]>((current) => {
      let ids: string[] = [];
      const listFilter = state.params.filters.byId[facetName];
      if (listFilter != null) {
         if (listFilter.type === 'and' || listFilter.type === 'or') {
            ids = listFilter.filterIds
               .map((id) => state.params.filters.byId[id])
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
         if (options?.clearFacets) {
            dispatch([
               {
                  type: SearchActionType.ListFilterItemAdded,
                  filterId: facetName,
                  filterType,
                  valueId,
               },
               {
                  type: SearchActionType.FiltersCleared,
                  filterIds: options.clearFacets,
               },
            ]);
         } else {
            dispatch({
               type: SearchActionType.ListFilterItemAdded,
               filterId: facetName,
               filterType,
               valueId,
            });
         }
      },
      [dispatch, facetName, filterType]
   );

   const set = React.useCallback<UseFacetFilterList['set']>(
      (valueId, options) => {
         if (options?.clearFacets) {
            dispatch([
               {
                  type: SearchActionType.ListFilterItemSet,
                  filterId: facetName,
                  filterType,
                  valueId,
               },
               {
                  type: SearchActionType.FiltersCleared,
                  filterIds: options.clearFacets,
               },
            ]);
         } else {
            dispatch({
               type: SearchActionType.ListFilterItemSet,
               filterId: facetName,
               filterType,
               valueId,
            });
         }
      },
      [dispatch, facetName, filterType]
   );

   const toggle = React.useCallback<UseFacetFilterList['toggle']>(
      (valueId, options) => {
         if (options?.clearFacets) {
            dispatch([
               {
                  type: SearchActionType.ListFilterItemToggled,
                  filterId: facetName,
                  filterType,
                  valueId,
               },
               {
                  type: SearchActionType.FiltersCleared,
                  filterIds: options.clearFacets,
               },
            ]);
         } else {
            dispatch({
               type: SearchActionType.ListFilterItemToggled,
               filterId: facetName,
               filterType,
               valueId,
            });
         }
      },
      [dispatch, facetName, filterType]
   );

   const clear = React.useCallback<UseFacetFilterList['clear']>(
      (valueId) => {
         if (valueId) {
            dispatch({
               type: SearchActionType.ListFilterItemCleared,
               filterId: facetName,
               valueId,
            });
         } else {
            dispatch({
               type: SearchActionType.ListFilterAllItemsCleared,
               filterId: facetName,
            });
         }
      },
      [dispatch, facetName]
   );

   return {
      selectedValueIds,
      add,
      set,
      toggle,
      clear,
   };
}
