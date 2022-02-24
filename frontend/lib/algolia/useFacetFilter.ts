import * as React from 'react';
import { SearchMachineState } from './search.machine';
import { useSearchServiceContext } from './context';
import { useSelector } from '@lib/fsm-utils';
import { FilterType } from '.';

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

export function useFacetFilter(filterId: string): UseFacetFilter {
   const service = useSearchServiceContext();

   const selectedOptionsSelector = React.useCallback(
      (state: SearchMachineState) => {
         const filter = state.context.params.filters.byId[filterId];
         if (filter && filter.type === FilterType.List) {
            return filter.selectedOptions;
         }
         return [];
      },
      [filterId]
   );

   const selectedOptions = useSelector(service, selectedOptionsSelector);

   const add = React.useCallback<UseFacetFilter['add']>(
      (optionId, options) => {
         service.send({
            type: 'ADD_FACET_OPTION_FILTER',
            filterId: filterId,
            optionId,
            clearIds: options?.clearFacets,
         });
      },
      [filterId, service]
   );

   const set = React.useCallback<UseFacetFilter['set']>(
      (optionId, options) => {
         service.send({
            type: 'SET_FACET_OPTION_FILTER',
            filterId: filterId,
            optionId,
            clearIds: options?.clearFacets,
         });
      },
      [service, filterId]
   );

   const toggle = React.useCallback<UseFacetFilter['toggle']>(
      (optionId, options) => {
         service.send({
            type: 'TOGGLE_FACET_OPTION_FILTER',
            filterId: filterId,
            optionId,
            clearIds: options?.clearFacets,
         });
      },
      [service, filterId]
   );

   const clear = React.useCallback<UseFacetFilter['clear']>(
      (optionId) => {
         if (optionId) {
            service.send({
               type: 'CLEAR_FACET_OPTION_FILTER',
               filterId: filterId,
               optionId,
            });
         } else {
            service.send({
               type: 'CLEAR_FILTERS',
               filterIds: [filterId],
            });
         }
      },
      [service, filterId]
   );

   return {
      selectedOptions,
      add,
      set,
      toggle,
      clear,
   };
}
