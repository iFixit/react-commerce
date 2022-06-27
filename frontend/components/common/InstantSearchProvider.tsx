import { ALGOLIA_APP_ID } from '@config/env';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { history } from 'instantsearch.js/es/lib/routers';
import * as React from 'react';
import {
   InstantSearch,
   InstantSearchServerState,
   InstantSearchSSRProvider,
} from 'react-instantsearch-hooks-web';

type InstantSearchProviderProps = React.PropsWithChildren<AlgoliaProps>;

type ApiKey = string;

export type AlgoliaProps = {
   url: string;
   indexName: string;
   serverState?: Partial<InstantSearchServerState>;
   apiKey: ApiKey;
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
   const algoliaApiKey = user.data?.algoliaApiKeyProducts || apiKey;
   const algoliaClient = React.useMemo(() => {
      return algoliasearch(ALGOLIA_APP_ID, algoliaApiKey);
   }, [algoliaApiKey]);

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
