import * as React from 'react';
import { useSearchDispatchContext, useSearchStateContext } from './context';
import { SearchActionType } from './types';

interface UpdateOptions {
   clearFacets?: string[];
}

export interface UseFacetFilter {
   selectedOptions: string[];
   add: (optionHandle: string, options?: UpdateOptions) => void;
   set: (optionHandle: string, options?: UpdateOptions) => void;
   toggle: (optionHandle: string, options?: UpdateOptions) => void;
   clear: (optionHandle?: string) => void;
}

export function useFacetFilter(facetHandle: string): UseFacetFilter {
   const state = useSearchStateContext();
   const dispatch = useSearchDispatchContext();

   const selectedOptions = React.useMemo(() => {
      const filter = state.params.filtersByName[facetHandle];
      if (filter && filter.type === 'facet') {
         return filter.selectedOptions;
      }
      return [];
   }, [facetHandle, state.params.filtersByName]);

   const add = React.useCallback<UseFacetFilter['add']>(
      (optionHandle, options) => {
         if (options?.clearFacets) {
            dispatch([
               {
                  type: SearchActionType.FacetFilterOptionAdded,
                  filterId: facetHandle,
                  optionHandle,
               },
               {
                  type: SearchActionType.FiltersCleared,
                  filterIds: options.clearFacets,
               },
            ]);
         } else {
            dispatch({
               type: SearchActionType.FacetFilterOptionAdded,
               filterId: facetHandle,
               optionHandle,
            });
         }
      },
      [dispatch, facetHandle]
   );

   const set = React.useCallback<UseFacetFilter['set']>(
      (optionHandle, options) => {
         if (options?.clearFacets) {
            dispatch([
               {
                  type: SearchActionType.FacetFilterOptionSet,
                  filterId: facetHandle,
                  optionHandle,
               },
               {
                  type: SearchActionType.FiltersCleared,
                  filterIds: options.clearFacets,
               },
            ]);
         } else {
            dispatch({
               type: SearchActionType.FacetFilterOptionSet,
               filterId: facetHandle,
               optionHandle,
            });
         }
      },
      [dispatch, facetHandle]
   );

   const toggle = React.useCallback<UseFacetFilter['toggle']>(
      (optionHandle, options) => {
         if (options?.clearFacets) {
            dispatch([
               {
                  type: SearchActionType.FacetFilterOptionToggled,
                  filterId: facetHandle,
                  optionHandle,
               },
               {
                  type: SearchActionType.FiltersCleared,
                  filterIds: options.clearFacets,
               },
            ]);
         } else {
            dispatch({
               type: SearchActionType.FacetFilterOptionToggled,
               filterId: facetHandle,
               optionHandle,
            });
         }
      },
      [dispatch, facetHandle]
   );

   const clear = React.useCallback<UseFacetFilter['clear']>(
      (optionHandle) => {
         if (optionHandle) {
            dispatch({
               type: SearchActionType.FacetFilterOptionCleared,
               filterId: facetHandle,
               optionHandle,
            });
         } else {
            dispatch({
               type: SearchActionType.FacetFilterAllOptionsCleared,
               filterId: facetHandle,
            });
         }
      },
      [dispatch, facetHandle]
   );

   return {
      selectedOptions,
      add,
      set,
      toggle,
      clear,
   };
}
