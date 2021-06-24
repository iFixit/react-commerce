import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import * as React from 'react';

export function useAlgoliaClient(appId: string, apiKey: string): SearchClient {
   const clientRef = React.useRef<SearchClient>();
   if (clientRef.current == null) {
      clientRef.current = algoliasearch(appId, apiKey);
   }
   return clientRef.current;
}
