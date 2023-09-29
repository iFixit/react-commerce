import { useSafeLayoutEffect } from '@chakra-ui/react';
import { ALGOLIA_APP_ID, IFIXIT_ORIGIN } from '@config/env';
import { getClientOptions } from '@helpers/algolia-helpers';
import {
   destylizeDeviceItemType,
   getFacetWidgetType,
   isValidRefinementListValue,
   stylizeDeviceItemType,
} from '@helpers/product-list-helpers';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { assertNever } from '@ifixit/helpers';
import { usePrevious } from '@ifixit/ui';
import { FacetWidgetType } from '@models/product-list';
import { useFacets } from '@templates/product-list/sections/FilterableProductsSection/facets/useFacets';
import algoliasearch from 'algoliasearch/lite';
import singletonRouter from 'next/router';
import qs from 'qs';
import * as React from 'react';
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs';
import {
   InstantSearch,
   InstantSearchServerState,
   InstantSearchSSRProvider,
} from 'react-instantsearch';
import { useSearchCache } from './useSearchCache';

export type InstantSearchProviderProps = React.PropsWithChildren<AlgoliaProps>;

export type AlgoliaProps = {
   url: string;
   indexName: string;
   serverState?: InstantSearchServerState;
   apiKey: string;
   logContextName: string;
};

type RouteState = Partial<{
   q: string;
   p: number;
   filter: Record<string, any>;
}>;

type IndexUiState = Record<string, any>;

export function InstantSearchProvider({
   children,
   url,
   indexName,
   serverState,
   apiKey,
   logContextName,
}: InstantSearchProviderProps) {
   const user = useAuthenticatedUser();

   const algoliaApiKey = user.data?.algoliaApiKeyProducts || apiKey;
   const previousApiKey = usePrevious(algoliaApiKey);
   const algoliaClient = React.useMemo(() => {
      return algoliasearch(
         ALGOLIA_APP_ID,
         algoliaApiKey,
         getClientOptions(logContextName)
      );
   }, [algoliaApiKey, logContextName]);

   const facets = useFacets();

   const routerOptions = {
      getLocation() {
         if (typeof window === 'undefined') {
            try {
               return new URL(url) as unknown as Location;
            } catch (e) {
               return new URL(IFIXIT_ORIGIN);
            }
         }

         return window.location;
      },
      createURL({
         qsModule,
         routeState,
         location,
      }: {
         qsModule: typeof qs;
         routeState: RouteState;
         location: Location;
      }) {
         const baseUrl = getBaseOrigin(location);
         const pathParts = location.pathname
            .split('/')
            .filter((part) => part !== '');
         const firstPathSegment = pathParts.length >= 1 ? pathParts[0] : '';
         const deviceHandle = pathParts.length >= 2 ? pathParts[1] : '';
         const isDevicePartsPage = firstPathSegment === 'Parts' && deviceHandle;

         let path = `/${firstPathSegment}`;
         if (deviceHandle) {
            path += `/${deviceHandle}`;
            const raw: string | string[] | undefined =
               routeState.filter?.['facet_tags.Item Type'];
            const itemType = Array.isArray(raw) ? raw[0] : raw;
            if (isDevicePartsPage && itemType?.length) {
               const encodedItemType = encodeURIComponent(
                  stylizeDeviceItemType(itemType)
               );
               path += `/${encodedItemType}`;
            }
         }

         const filterCopy = { ...routeState.filter };
         if (isDevicePartsPage) {
            // Item Type is the slug on device pages, not in the query.
            delete filterCopy['facet_tags.Item Type'];
         }
         const { q, p, filter, ...otherParams } = qsModule.parse(
            location.search,
            {
               ignoreQueryPrefix: true,
            }
         );
         const queryString = qsModule.stringify(
            {
               ...otherParams,
               ...routeState,
               filter: filterCopy,
            },
            {
               addQueryPrefix: true,
               arrayFormat: 'indices',
            }
         );

         return `${baseUrl}${path}${queryString}`;
      },
      parseURL({
         qsModule,
         location,
      }: {
         qsModule: typeof qs;
         location: Location;
      }) {
         const pathParts = location.pathname
            .split('/')
            .filter((part) => part !== '');
         const firstPathSegment = pathParts.length >= 1 ? pathParts[0] : '';
         const deviceHandle = pathParts.length >= 2 ? pathParts[1] : '';
         const itemType = pathParts.length >= 3 ? pathParts[2] : '';
         const isDevicePartsPage = firstPathSegment === 'Parts' && deviceHandle;

         const { q, p, filter } = qsModule.parse(location.search, {
            ignoreQueryPrefix: true,
         });

         const filterObject =
            typeof filter === 'object' && !Array.isArray(filter) ? filter : {};

         Object.entries(filterObject).forEach(([attribute, value]) => {
            if (!facets.includes(attribute)) {
               delete filterObject[attribute];
               return;
            }
            const widgetType = getFacetWidgetType(attribute);
            switch (widgetType) {
               case FacetWidgetType.Menu: {
                  if (isValidRefinementListValue(value)) {
                     filterObject[attribute] = (value as string[])[0];
                  } else if (typeof value !== 'string') {
                     delete filterObject[attribute];
                  }
                  break;
               }
               case FacetWidgetType.RefinementList: {
                  if (!isValidRefinementListValue(value)) {
                     delete filterObject[attribute];
                  }
                  break;
               }
               default: {
                  return assertNever(widgetType);
               }
            }
         });

         if (isDevicePartsPage && itemType) {
            filterObject['facet_tags.Item Type'] = destylizeDeviceItemType(
               decodeURIComponent(itemType)
            ).trim();
         }

         return {
            q: String(q || ''),
            p:
               typeof p === 'string' && parseInt(p) >= 0
                  ? parseInt(p)
                  : undefined,
            filter: filterObject,
         };
      },
   };

   const stateMapping = {
      stateToRoute(uiState: IndexUiState) {
         const indexUiState = uiState[indexName];
         if (!indexUiState) {
            return {};
         }
         const routeState: RouteState = {};
         if (indexUiState.query) {
            routeState.q = indexUiState.query;
         }
         if (indexUiState.page) {
            routeState.p = indexUiState.page;
         }
         if (indexUiState.refinementList) {
            routeState.filter = indexUiState.refinementList;
         }
         if (indexUiState.menu) {
            routeState.filter = {
               ...routeState.filter,
               ...indexUiState.menu,
            };
         }
         return routeState;
      },
      routeToState(routeState: RouteState) {
         const stateObject: IndexUiState = {};
         if (routeState.q != null) {
            stateObject.query = routeState.q;
         }
         if (routeState.p != null) {
            stateObject.page = routeState.p;
         }
         const filter = routeState.filter;
         if (filter != null) {
            stateObject.menu = {};
            stateObject.refinementList = {};
            Object.keys(filter).forEach((attribute) => {
               const widgetType = getFacetWidgetType(attribute);
               switch (widgetType) {
                  case FacetWidgetType.Menu: {
                     stateObject.menu[attribute] = filter[attribute];
                     break;
                  }
                  case FacetWidgetType.RefinementList: {
                     stateObject.refinementList[attribute] = filter[attribute];
                     break;
                  }
                  default: {
                     return assertNever(widgetType);
                  }
               }
            });
         }
         return {
            [indexName]: stateObject,
         };
      },
   };

   return (
      <InstantSearchSSRProvider {...serverState}>
         <InstantSearch
            searchClient={algoliaClient}
            indexName={indexName}
            routing={{
               router: createInstantSearchRouterNext<RouteState>({
                  serverUrl: url,
                  singletonRouter,
                  routerOptions,
               }),
               stateMapping,
            }}
         >
            <RefreshSearchResults
               apiKey={algoliaApiKey}
               prevApiKey={previousApiKey}
            />
            {children}
         </InstantSearch>
      </InstantSearchSSRProvider>
   );
}

type RefreshSearchResultsProps = {
   apiKey: string;
   prevApiKey: string | undefined;
};

/**
 * Refreshes search results if the API key changes
 * (but only refreshes once for each api key change).
 */
function RefreshSearchResults({
   apiKey,
   prevApiKey,
}: RefreshSearchResultsProps): null {
   const { refresh } = useSearchCache();
   useSafeLayoutEffect(() => {
      const isFirstRender = !prevApiKey;
      const hasApiKeyChanged = prevApiKey !== apiKey;
      if (hasApiKeyChanged && !isFirstRender) {
         refresh();
      }
   }, [apiKey, prevApiKey]);
   return null;
}

function getBaseOrigin(location: Location): string {
   if (typeof window === 'undefined' && IFIXIT_ORIGIN) {
      // On the server, use the IFIXIT_ORIGIN url
      // This ensures that the SSR produces the correct links on Vercel
      // (where the Host header doesn't match the page URL.)
      const publicOrigin = new URL(IFIXIT_ORIGIN);
      return publicOrigin.origin;
   }
   return location.origin;
}
