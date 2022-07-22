import { useSafeLayoutEffect } from '@chakra-ui/react';
import { useSearchCache } from '@components/product-list/sections/FilterableProductsSection/useSearchCache';
import { ALGOLIA_APP_ID } from '@config/env';
import { cypressWindowLog } from '@helpers/test-helpers';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { usePrevious } from '@ifixit/ui';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { history } from 'instantsearch.js/es/lib/routers';
import { useRouter } from 'next/router';
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

   // We're using this to make `InstantSearch` unmount at every re-render, since as of version 6.28.0 it breaks when
   // it re-renders. Re-rendering though should be relatively infrequent in this component, so this should be fine.
   const count = useCountRenders();

   return (
      <InstantSearchSSRProvider {...serverState}>
         <InstantSearch
            key={count}
            searchClient={algoliaClient}
            indexName={indexName}
            routing={{
               stateMapping: {
                  stateToRoute(uiState): any {
                     const indexUiState = uiState[indexName];
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
                  },
                  routeToState(routeState: RouteState) {
                     const stateObject: Record<string, any> = {};
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
               }),
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

function useCountRenders() {
   const countRef = React.useRef(0);
   countRef.current++;
   return countRef.current;
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
