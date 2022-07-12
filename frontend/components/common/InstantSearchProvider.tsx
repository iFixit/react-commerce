import { useSafeLayoutEffect } from '@chakra-ui/react';
import { ALGOLIA_APP_ID } from '@config/env';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { history } from 'instantsearch.js/es/lib/routers';
import { RouterProps } from 'instantsearch.js/es/middlewares';
import { UiState } from 'instantsearch.js/es/types';
import { mapValues } from 'lodash';
import { useRouter } from 'next/router';
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
   range: Record<string, string>;
}>;

type IndexUiState = Record<string, any>;

export function InstantSearchProvider({
   children,
   url,
   indexName,
   serverState,
   apiKey,
}: InstantSearchProviderProps) {
   const algoliaClientRef = React.useRef<SearchClient>();
   algoliaClientRef.current =
      algoliaClientRef.current ?? algoliasearch(ALGOLIA_APP_ID, apiKey);

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

   // We're using this to make `InstantSearch` unmount at every re-render, since as of version 6.28.0 it breaks when
   // it re-renders. Re-rendering though should be relatively infrequent in this component, so this should be fine.
   const count = useCountRenders();

   const routing: RouterProps<UiState, RouteState> = {
      stateMapping: {
         stateToRoute(uiState) {
            const indexUiState = uiState[indexName];
            return indexUiStateToRoute(indexUiState);
         },
         routeToState(routeState: RouteState) {
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
            if (routeState.range != null) {
               stateObject.range = routeState.range;
            }
            return {
               [indexName]: stateObject,
            };
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
            let baseUrl = location.origin;
            const pathParts = location.pathname
               .split('/')
               .filter((part) => part !== '');
            const partsOrTools = pathParts.length >= 1 ? pathParts[0] : '';
            const deviceHandle = pathParts.length >= 2 ? pathParts[1] : '';

            const ignoreFilterKeys = [];
            if (partsOrTools) {
               baseUrl += `/${partsOrTools}`;
               if (deviceHandle) {
                  baseUrl += `/${deviceHandle}`;
                  ignoreFilterKeys.push('facet_tags.Item Type');
                  const itemType = routeState.filter?.['facet_tags.Item Type'];
                  if (itemType) {
                     baseUrl += `/${itemType}`;
                  }
               }
            }

            const queryString = routeToQueryString(
               routeState,
               ignoreFilterKeys
            );

            return `${baseUrl}${queryString}`;
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
               range = {},
            } = qsModule.parse(location.search.slice(1));

            const decodedFilters = decodeParsedQuery(filter);
            if (deviceHandle && itemType) {
               decodedFilters['facet_tags.Item Type'] =
                  decodeURIComponent(itemType);
            }

            return {
               q: decodeURIComponent(String(q)),
               p: Number(p),
               filter: decodedFilters,
               range: decodeParsedQuery(range),
            };
         },
      }),
   };

   return (
      <InstantSearchSSRProvider {...serverState}>
         <InstantSearch
            key={count}
            searchClient={algoliaClientRef.current}
            indexName={indexName}
            routing={routing}
         >
            {children}
         </InstantSearch>
      </InstantSearchSSRProvider>
   );
}

function useCountRenders() {
   const countRef = React.useRef(0);
   countRef.current++;
   return countRef.current;
}

export function uiStateToQueryString(
   indexUiState: IndexUiState,
   ignoreFilterKeys: string[] = []
): string {
   const routeState = indexUiStateToRoute(indexUiState);
   return routeToQueryString(routeState, ignoreFilterKeys);
}

function indexUiStateToRoute(indexUiState: IndexUiState) {
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
   if (indexUiState.range != null) {
      routeState.range = indexUiState.range;
   }
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
