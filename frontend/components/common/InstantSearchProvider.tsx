import { useSafeLayoutEffect } from '@chakra-ui/react';
import { ALGOLIA_APP_ID, IFIXIT_ORIGIN } from '@config/env';
import { getClientOptions } from '@helpers/algolia-helpers';
import {
   destylizeDeviceItemType,
   destylizeDeviceTitleAndVariant,
   getFacetWidgetType,
   isValidRefinementListValue,
   splitDeviceAndVariant,
   stylizeDeviceItemType,
   stylizeDeviceTitle,
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
import { getRouteData } from '@helpers/path-helpers';

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
               return new URL(IFIXIT_ORIGIN) as unknown as Location;
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
         const { firstPathSegment, deviceHandle } = getRouteData(
            location.pathname
         );
         const isDevicePartsPage = firstPathSegment === 'Parts' && deviceHandle;
         const devicePath = isDevicePartsPage
            ? getDevicePath(deviceHandle, routeState)
            : deviceHandle;
         const devicePathHasVariant =
            isDevicePartsPage && devicePath.includes(':');

         let path = `/${firstPathSegment}`;
         if (devicePath) {
            path += `/${devicePath}`;
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
         if (devicePathHasVariant) {
            delete filterCopy['worksin'];
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
         const { firstPathSegment, deviceHandle, itemType } = getRouteData(
            location.pathname
         );
         const isDevicePartsPage = firstPathSegment === 'Parts' && deviceHandle;
         const devicePathHasVariant =
            isDevicePartsPage && deviceHandle.includes(':');

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

         if (devicePathHasVariant) {
            filterObject['worksin'] = destylizeDeviceTitleAndVariant(
               decodeURIComponent(deviceHandle)
            );
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

function getDevicePath(handle: string, routeState: RouteState): string {
   const { device, variant } = splitDeviceAndVariant(handle);
   const variantFromRouteState = routeState.filter?.worksin;

   if (variant && !variantFromRouteState) {
      return device;
   }

   if (!variant && variantFromRouteState) {
      return stylizeDeviceTitle(handle, variantFromRouteState);
   }

   return handle;
}
