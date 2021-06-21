/**
 * useRefinementList implements a refinement list on a facet. The refinement list can be
 * both conjunctive (AND) or disjunctive (OR).
 * Under the hood the filter is managed as a ListFilter that represents the expression
 * of multiple basic filters combined (according to refinementType prop).
 */
import produce from 'immer';
import * as React from 'react';
import { useSearchContext } from './context';
import { BasicFilter, FacetValueState, ListFilter, SearchState } from './types';
import { createBasicFilter, mergeUnique } from './utils';

export type UseRefinementListOptions = {
   refinementType?: ListFilter['type'];
};

export type UseRefinementList = {
   values: FacetValueState[];
   currentValueIds: string[];
   isLoaded: boolean;
   add: (valueId: string) => void;
   set: (valueId: string) => void;
   toggle: (valueId: string) => void;
   clear: (valueId?: string) => void;
};

export type RefinementListItem = {
   value: string;
   totalCount: number;
   applicableCount: number;
};

export function useRefinementList(
   facetName: string,
   { refinementType = 'or' }: UseRefinementListOptions = {}
): UseRefinementList {
   const { state, setState } = useSearchContext();

   const currentValueIds = React.useMemo<string[]>(() => {
      const listFilter = state.filters.byId[facetName];
      if (listFilter == null) {
         return [];
      }
      if (listFilter.type === 'and' || listFilter.type === 'or') {
         return listFilter.filterIds
            .map((id) => state.filters.byId[id])
            .map((filter: any) => {
               return (filter as BasicFilter).valueId;
            });
      }
      throw new Error(
         `useRefinementList: unexpected filter type "${listFilter.type}". Allowed values are "and", "or"`
      );
   }, [facetName, state.filters.byId]);

   const values = React.useMemo<FacetValueState[]>(() => {
      const facet = state.facets.byId[facetName];
      return facet.valueIds.map((id) => state.facetValues.byId[id]);
   }, [facetName, state.facetValues.byId, state.facets.byId]);

   const add = React.useCallback(
      (valueId: string) => {
         setState(
            produce((draftState) => {
               if (!draftState.filters.rootIds.includes(facetName)) {
                  draftState.filters.rootIds.push(facetName);
                  draftState.filters.allIds.push(facetName);
               }
               const newItemFilter = createBasicFilter(
                  facetName,
                  valueId,
                  facetName
               );
               const filterItemIds = getListFilterItemIds(
                  draftState,
                  facetName
               );
               draftState.filters.byId[facetName] = {
                  id: facetName,
                  filterIds: mergeUnique(filterItemIds, [newItemFilter.id]),
                  type: refinementType,
               };
               draftState.filters.byId[newItemFilter.id] = newItemFilter;
               draftState.filters.allIds.push(newItemFilter.id);
            })
         );
      },
      [facetName, refinementType, setState]
   );

   const set = React.useCallback(
      (valueId: string) => {
         setState(
            produce((draftState) => {
               if (!draftState.filters.rootIds.includes(facetName)) {
                  draftState.filters.rootIds.push(facetName);
                  draftState.filters.allIds.push(facetName);
               }
               const newItemFilter = createBasicFilter(
                  facetName,
                  valueId,
                  facetName
               );
               draftState.filters.byId[facetName] = {
                  id: facetName,
                  filterIds: [newItemFilter.id],
                  type: refinementType,
               };
               draftState.filters.byId[newItemFilter.id] = newItemFilter;
               draftState.filters.allIds.push(newItemFilter.id);
            })
         );
      },
      [facetName, refinementType, setState]
   );

   const clear = React.useCallback(
      (valueId?: string) => {
         setState(
            produce((draftState) => {
               const listFilter = draftState.filters.byId[
                  facetName
               ] as ListFilter;
               if (valueId) {
                  const itemFilter = createBasicFilter(
                     facetName,
                     valueId,
                     facetName
                  );
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
            })
         );
      },
      [facetName, setState]
   );

   const toggle = React.useCallback(
      (valueId: string) => {
         const newItemFilter = createBasicFilter(facetName, valueId, facetName);
         const filterItemIds = getListFilterItemIds(state, facetName);
         if (filterItemIds.includes(newItemFilter.id)) {
            clear(valueId);
         } else {
            add(valueId);
         }
      },
      [add, clear, facetName, state]
   );

   return {
      values,
      currentValueIds,
      isLoaded: state.isLoaded || false,
      add,
      set,
      toggle,
      clear,
   };
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
