import {
   PRODUCT_LIST_PAGE_PARAM,
   PRODUCT_LIST_QUERY_PARAM,
} from '@config/constants';
import {
   Facet,
   Filter,
   RangeFilter,
   SearchContext,
   SearchParams,
   useFacets,
   usePagination,
   useSearchParams,
} from '@lib/algolia';
import { usePrevious } from '@lib/hooks';
import { assertNever, keyBy } from '@helpers/application-helpers';
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
      .concat([PRODUCT_LIST_QUERY_PARAM, PRODUCT_LIST_PAGE_PARAM]);
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
      urlQuery[PRODUCT_LIST_QUERY_PARAM] = params.query;
   }
   if (params.page > 1) {
      urlQuery[PRODUCT_LIST_PAGE_PARAM] = String(params.page);
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
   const params = Object.keys(urlQuery);
   const facetHandles = params.filter(
      (paramKey) =>
         context.facets.allIds.includes(paramKey) && urlQuery[paramKey] != null
   );
   const rangeHandles = params.reduce((handles, paramKey) => {
      if (!context.facets.allIds.includes(paramKey)) {
         let handle: string | undefined;
         if (paramKey.endsWith('_min')) {
            handle = paramKey.replace(/_min$/, '');
         } else if (paramKey.endsWith('_max')) {
            handle = paramKey.replace(/_max$/, '');
         }
         if (
            handle &&
            !handles.includes(handle) &&
            context.facets.allIds.includes(handle)
         ) {
            handles.push(handle);
         }
      }
      return handles;
   }, [] as string[]);
   const indexName = context.params.indexName;
   const queryParam = urlQuery[PRODUCT_LIST_QUERY_PARAM];
   const query = typeof queryParam === 'string' ? queryParam : '';
   const pageParam = urlQuery[PRODUCT_LIST_PAGE_PARAM];
   const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
   const filters = facetHandles.map<Filter>((handle) => {
      const filterValue = urlQuery[handle]!;
      return {
         id: handle,
         type: 'facet',
         selectedOptions: Array.isArray(filterValue)
            ? filterValue
            : [filterValue],
      };
   });
   rangeHandles.forEach((handle) => {
      const minParam = urlQuery[`${handle}_min`];
      const maxParam = urlQuery[`${handle}_max`];
      let min: number | undefined;
      let max: number | undefined;

      const range: RangeFilter = {
         id: handle,
         type: 'range',
      };

      if (typeof minParam === 'string') {
         min = parseInt(minParam, 10);
         if (!Number.isNaN(min)) {
            range.min = min;
         }
      }
      if (typeof maxParam === 'string') {
         max = parseInt(maxParam, 10);
         if (!Number.isNaN(max)) {
            range.max = max;
         }
      }
      if (range.min != null || range.max != null) {
         filters.push(range);
      }
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
