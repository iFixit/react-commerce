import { useSelector } from '@lib/fsm-utils';
import { assertNever } from '@lib/utils';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { useSearchServiceContext } from './context';
import { SearchMachineState } from './search.machine';
import { Filter, SearchContext } from './types';

export function useUpdateUrlQuery() {
   const service = useSearchServiceContext();
   const router = useRouter();
   const query = useSelector(service, querySelector);
   const page = useSelector(service, pageSelector);
   const filters = useSelector(service, filtersEntitySelector);
   const facetsIds = useSelector(service, facetsIdsSelector);

   React.useEffect(() => {
      const existingParams = queryWithoutSearchStateParams(
         router.query,
         facetsIds
      );
      const searchParams: ParsedUrlQuery = {};
      if (query.length > 0) {
         searchParams.q = query;
      }
      if (page > 1) {
         searchParams.p = String(page);
      }
      filters.allIds.forEach((id) => {
         const filter = filters.byId[id];
         switch (filter.type) {
            case 'facet': {
               searchParams[filter.id] = filter.selectedOptions;
               break;
            }
            case 'range': {
               if (filter.min) {
                  searchParams[`${filter.id}_min`] = String(filter.min);
               }
               if (filter.max) {
                  searchParams[`${filter.id}_max`] = String(filter.max);
               }
               break;
            }
            default:
               return assertNever(filter);
         }
      });

      const currentUrlQuery = queryString.stringify(router.query);
      const newUrlQuery = queryString.stringify({
         ...existingParams,
         ...searchParams,
      });
      if (newUrlQuery !== currentUrlQuery) {
         router.replace(`?${newUrlQuery}`, undefined, { shallow: true });
      }
   }, [facetsIds, filters.allIds, filters.byId, page, query, router]);
}

function queryWithoutSearchStateParams(
   query: ParsedUrlQuery,
   availableFacetHandles: string[]
) {
   const searchStateParamsList = availableFacetHandles.concat(['q', 'p']);
   const remainingParams = Object.keys(query).filter((param) => {
      const paramId = param.replace(/(_min|_max)$/, '');
      return !searchStateParamsList.includes(paramId);
   });
   return remainingParams.reduce((params, param) => {
      params[param] = query[param];
      return params;
   }, {} as Record<string, any>);
}

function querySelector(state: SearchMachineState) {
   return state.context.params.query;
}

function pageSelector(state: SearchMachineState) {
   return state.context.params.page;
}

function filtersEntitySelector(state: SearchMachineState) {
   return state.context.params.filters;
}

function facetsIdsSelector(state: SearchMachineState) {
   return state.context.facets.allIds;
}

export function parseFiltersFromUrlQuery(
   context: SearchContext,
   query: ParsedUrlQuery
): Filter[] {
   const filterHandles = Object.keys(query).filter(
      (paramKey) =>
         context.facets.allIds.includes(paramKey) && query[paramKey] != null
   );
   return filterHandles.map<Filter>((handle) => {
      const filterValue = query[handle]!;
      return {
         id: handle,
         type: 'facet',
         selectedOptions: Array.isArray(filterValue)
            ? filterValue
            : [filterValue],
      };
   });
}
