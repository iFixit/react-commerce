import { assertNever } from '@lib/utils';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { useSearchStateContext } from './context';

export function useUpdateQueryParams() {
   const state = useSearchStateContext();
   const router = useRouter();
   const { page, query, filters } = state.params;

   React.useEffect(() => {
      const existingParams = queryWithoutSearchStateParams(
         router.query,
         state.facets.allIds
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
               break;
            }
            default:
               return assertNever(filter);
         }
      });

      const newQueryString = queryString.stringify({
         ...existingParams,
         ...searchParams,
      });
      router.replace(`?${newQueryString}`, undefined, { shallow: true });
      // ..
   }, [page, query, filters, state.facets]);
}

function queryWithoutSearchStateParams(
   query: ParsedUrlQuery,
   availableFacetHandles: string[]
) {
   const searchStateParamsList = availableFacetHandles.concat(['q', 'p']);
   const remainingParams = Object.keys(query).filter((param) => {
      return !searchStateParamsList.includes(param);
   });
   return remainingParams.reduce((params, param) => {
      params[param] = query[param];
      return params;
   }, {} as Record<string, any>);
}
