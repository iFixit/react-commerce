import {
   Facet,
   Filter,
   SearchContext,
   SearchParams,
   useFacets,
   usePagination,
   useSearchParams,
} from '@lib/algolia';
import { usePrevious } from '@lib/hooks';
import { assertNever, keyBy } from '@lib/utils';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import type { ParsedUrlQuery } from 'querystring';
import * as React from 'react';

export function useUpdateUrlQuery() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const facets = useFacets();
   const previousRouterUrlQuery = usePrevious(router.query);
   const previousSearchParams = usePrevious(searchParams);
   const { setPage } = usePagination();
   const urlQueryWithoutSearchParams = removeSearchParams(router.query, facets);
   const searchParamsUrlQuery = createUrlQuery(searchParams);
   const routerQueryString = queryString.stringify(router.query);
   const searchQueryString = queryString.stringify({
      ...urlQueryWithoutSearchParams,
      ...searchParamsUrlQuery,
   });

   React.useEffect(() => {
      if (searchQueryString !== routerQueryString) {
         if (router.query.p === previousRouterUrlQuery?.p) {
            if (searchParams.page === previousSearchParams?.page) {
               router.replace(`?${searchQueryString}`, undefined, {
                  shallow: true,
               });
            } else {
               router.push(`?${searchQueryString}`, undefined, {
                  shallow: true,
               });
            }
         } else {
            const pageParam = router.query.p;
            const page =
               typeof pageParam === 'string' && /\d+/.test(pageParam)
                  ? parseInt(pageParam)
                  : 1;
            setPage(page);
         }
      }
   }, [
      previousRouterUrlQuery?.p,
      previousSearchParams?.page,
      router,
      routerQueryString,
      searchParams.page,
      searchQueryString,
      setPage,
   ]);
}

function removeSearchParams(
   query: ParsedUrlQuery,
   facets: Facet[]
): ParsedUrlQuery {
   const searchStateParamsList = facets
      .map((facet) => facet.handle)
      .concat(['q', 'p']);
   const remainingParams = Object.keys(query).filter((param) => {
      const paramId = param.replace(/(_min|_max)$/, '');
      return !searchStateParamsList.includes(paramId);
   });
   return remainingParams.reduce((params, param) => {
      params[param] = query[param];
      return params;
   }, {} as Record<string, any>);
}

function createUrlQuery(params: SearchParams): ParsedUrlQuery {
   const urlQuery: ParsedUrlQuery = {};
   if (params.query.length > 0) {
      urlQuery.q = params.query;
   }
   if (params.page > 1) {
      urlQuery.p = String(params.page);
   }
   params.filters.allIds.forEach((id) => {
      const filter = params.filters.byId[id];
      switch (filter.type) {
         case 'facet': {
            urlQuery[filter.id] = filter.selectedOptions;
            break;
         }
         case 'range': {
            if (filter.min) {
               urlQuery[`${filter.id}_min`] = String(filter.min);
            }
            if (filter.max) {
               urlQuery[`${filter.id}_max`] = String(filter.max);
            }
            break;
         }
         default:
            return assertNever(filter);
      }
   });
   return urlQuery;
}

export function parseSearchParams(
   context: SearchContext,
   urlQuery: ParsedUrlQuery
): SearchParams {
   const filterHandles = Object.keys(urlQuery).filter(
      (paramKey) =>
         context.facets.allIds.includes(paramKey) && urlQuery[paramKey] != null
   );
   const indexName = context.params.indexName;
   const query = typeof urlQuery.q === 'string' ? urlQuery.q : '';
   const page = typeof urlQuery.p === 'string' ? parseInt(urlQuery.p, 10) : 1;
   const filters = filterHandles.map<Filter>((handle) => {
      const filterValue = urlQuery[handle]!;
      return {
         id: handle,
         type: 'facet',
         selectedOptions: Array.isArray(filterValue)
            ? filterValue
            : [filterValue],
      };
   });

   return {
      indexName,
      limit: context.params.limit,
      query,
      page,
      filters: {
         preset: context.params.filters.preset,
         byId: keyBy(filters, 'id'),
         allIds: filters.map((filter) => filter.id),
      },
   };
}
