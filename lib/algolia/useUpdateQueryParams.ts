import * as React from 'react';
import { useSearchStateContext } from './context';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { assertNever } from '@lib/utils';

export function useUpdateQueryParams() {
   const state = useSearchStateContext();
   const router = useRouter();
   const { page, query, filtersByName } = state.params;

   React.useEffect(() => {
      const existingParams = queryWithoutSearchStateParams(
         router.query,
         Object.keys(state.facetsByHandle)
      );
      const searchParams: ParsedUrlQuery = {};
      if (query.length > 0) {
         searchParams.q = query;
      }
      if (page > 1) {
         searchParams.p = String(page);
      }
      Object.keys(filtersByName).forEach((id) => {
         const filter = filtersByName[id];
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
   }, [page, query, filtersByName, state.facetsByHandle]);
}

function queryWithoutSearchStateParams(
   query: ParsedUrlQuery,
   availableFacetHandles: string[]
) {
   console.log({ query });
   const searchStateParamsList = availableFacetHandles.concat(['q', 'p']);
   const remainingParams = Object.keys(query).filter((param) => {
      return !searchStateParamsList.includes(param);
   });
   return remainingParams.reduce((params, param) => {
      params[param] = query[param];
      return params;
   }, {} as Record<string, any>);
}
