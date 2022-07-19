import { useSafeLayoutEffect } from '@chakra-ui/react';
import { useSearchCache } from '@components/product-list/sections/FilterableProductsSection/useSearchCache';
import { ALGOLIA_APP_ID } from '@config/env';
import {
   decodeDeviceItemType,
   encodeDeviceItemType,
} from '@helpers/product-list-helpers';
import { cypressWindowLog } from '@helpers/test-helpers';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { usePrevious } from '@ifixit/ui';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { history } from 'instantsearch.js/es/lib/routers';
import { RouterProps } from 'instantsearch.js/es/middlewares';
import { UiState } from 'instantsearch.js/es/types';
import { mapValues } from 'lodash';
import { NextRouter, useRouter } from 'next/router';
import QueryString, { ParsedQs } from 'qs';
import * as React from 'react';
import {
   InstantSearch,
   InstantSearchServerState,
   InstantSearchSSRProvider,
} from 'react-instantsearch-hooks-web';

type InstantSearchProviderProps = React.PropsWithChildren<AlgoliaProps>;

export type AlgoliaProps = {
   url: string;
   indexName: string;
   serverState?: Partial<InstantSearchServerState>;
   apiKey: string;
};

type RouteState = Partial<{
   q: string;
   p: number;
   filter: Record<string, any>;
   // range: Record<string, string>;
}>;

type IndexUiState = Record<string, any>;

export function InstantSearchProvider({
   children,
   url,
   indexName,
   serverState,
   apiKey,
}: InstantSearchProviderProps) {
   const user = useAuthenticatedUser();
   cypressWindowLog({ userLoaded: user.isFetched });
   const algoliaApiKey = user.data?.algoliaApiKeyProducts || apiKey;
   const previousApiKey = usePrevious(algoliaApiKey);

   const algoliaClient = React.useMemo(() => {
      return algoliasearch(ALGOLIA_APP_ID, algoliaApiKey);
   }, [algoliaApiKey]);

   const router = useRouter();

   // Currently, Algolia routing does not play well with Next.js routing, since Next.js
   // is not aware of url changes that happens without interacting with its builtin router.
   // To make popstate work (i.e. whenever the browser back button is pressed), we do a
   // a full page reload as a workaround.
   // This should be only a temporary workaround until Algolia routing is fixed.
   useSafeLayoutEffect(() => {
      const handleRouteChange = () => {
         // When the back button is pressed, the popstate event is fired, and
         // Algolia tries to re-render the page (although in a broken state).
         // To avoid seeing this broken re-render we hide the page while we wait for
         // the page to be reloaded.
         window.document.body.hidden = true;
         window.location.reload();
      };
      window.addEventListener('popstate', handleRouteChange);
      return () => {
         window.removeEventListener('popstate', handleRouteChange);
      };
   }, [router]);

   // We're using this to make `InstantSearch` unmount every time Next routing
   // differs from the InstantSearch route. This causes a full refresh of
   // InstantSearch's internal state when the user navigates via a Next link.
   const count = useCountRouteMismatches(router, url);

   const routing: RouterProps<UiState, RouteState> = {
      stateMapping: {
         stateToRoute(uiState) {
            console.log('stateToRoute', uiState);
            const indexUiState = uiState[indexName];
            const ret = indexUiStateToRoute(indexUiState);
            console.log('stateToRoute ret', ret);
            return ret;
         },
         routeToState(routeState: RouteState) {
            console.log('routeToState', routeState);
            const stateObject: IndexUiState = {};
            if (routeState.q != null) {
               stateObject.query = routeState.q;
            }
            if (routeState.p != null) {
               stateObject.page = routeState.p;
            }
            if (routeState.filter != null) {
               stateObject.refinementList = routeState.filter;
            }
            // if (routeState.range != null) {
            //    stateObject.range = routeState.range;
            // }
            const ret = {
               [indexName]: stateObject,
            };
            console.log('routeToState ret', ret);
            return ret;
         },
      },
      router: history({
         getLocation() {
            if (typeof window === 'undefined') {
               return new URL(url) as unknown as Location;
            }

            return window.location;
         },
         createURL({ routeState, location }) {
            console.log('location', location);
            console.log('routeState createUrl', routeState);
            const baseUrl = location.origin;
            const pathParts = location.pathname
               .split('/')
               .filter((part) => part !== '');
            const partsOrTools = pathParts.length >= 1 ? pathParts[0] : '';
            const deviceHandle = pathParts.length >= 2 ? pathParts[1] : '';

            const ignoreFilterKeys = [];
            let path = '';
            if (partsOrTools) {
               path += `/${partsOrTools}`;
               if (deviceHandle) {
                  path += `/${deviceHandle}`;
                  ignoreFilterKeys.push('facet_tags.Item Type');
                  const raw: string | string[] | undefined =
                     routeState.filter?.['facet_tags.Item Type'];
                  console.log('raw', raw);
                  const itemType = Array.isArray(raw) ? raw[0] : raw;
                  if (itemType?.length) {
                     const encodedItemType = encodeDeviceItemType(itemType);
                     path += `/${encodedItemType}`;
                  }
               }
            }

            const queryString = routeToQueryString(
               routeState,
               ignoreFilterKeys
            );

            const final = `${baseUrl}${path}${queryString}`;
            console.log('final', final);
            return final;
         },
         parseURL({ qsModule, location }) {
            const pathParts = location.pathname
               .split('/')
               .filter((part) => part !== '');
            const deviceHandle = pathParts.length >= 2 ? pathParts[1] : '';
            const itemType = pathParts.length >= 3 ? pathParts[2] : '';

            const {
               q = '',
               p,
               filter = {},
               // range = {},
            } = qsModule.parse(location.search.slice(1));

            const decodedFilters = decodeParsedQuery(filter);
            if (deviceHandle && itemType) {
               decodedFilters['facet_tags.Item Type'] = [
                  decodeDeviceItemType(decodeURIComponent(itemType)),
               ];
            }

            const state = {
               q: decodeURIComponent(String(q)),
               p: Number(p),
               filter: decodedFilters,
               // range: decodeParsedQuery(range),
            };
            console.log(state);

            return state;
         },
      }),
   };

   return (
      <InstantSearchSSRProvider {...serverState}>
         <InstantSearch
            key={count}
            searchClient={algoliaClient}
            indexName={indexName}
            routing={routing}
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

function useCountRouteMismatches(router: NextRouter, url: string) {
   const countRef = React.useRef(0);
   React.useEffect(() => {
      const urlPath = new URL(url).pathname;
      if (router?.asPath && router.asPath !== urlPath) {
         countRef.current++;
      }
   }, [router, url]);
   return countRef.current;
}

export function uiStateToQueryString(
   indexUiState: IndexUiState,
   ignoreFilterKeys: string[] = []
): string {
   const routeState = indexUiStateToRoute(indexUiState);
   return routeToQueryString(routeState, ignoreFilterKeys);
}

export function indexUiStateToRoute(indexUiState: IndexUiState) {
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
   // if (indexUiState.range != null) {
   //    routeState.range = indexUiState.range;
   // }
   return routeState;
}

function routeToQueryString(
   routeState: RouteState,
   ignoreFilterKeys: string[] = []
): string {
   const filterCopy = { ...routeState.filter };
   ignoreFilterKeys.forEach((key) => {
      delete filterCopy[key];
   });
   return QueryString.stringify(
      { ...routeState, filter: filterCopy },
      {
         addQueryPrefix: true,
         arrayFormat: 'indices',
      }
   );
}

function decodeParsedQuery(parsed: string | ParsedQs | string[] | ParsedQs[]) {
   return typeof parsed === 'object'
      ? mapValues<Record<string, any>, any>(parsed, (parsedValues) => {
           return Array.isArray(parsedValues)
              ? parsedValues.map((v: any) =>
                   typeof v === 'string' ? decodeURIComponent(v) : v
                )
              : decodeURIComponent(parsedValues);
        })
      : {};
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
