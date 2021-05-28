import { SearchClient, SearchIndex } from 'algoliasearch/lite';
import * as React from 'react';

export function useAlgoliaIndex(
   client: SearchClient,
   indexName: string
): SearchIndex {
   const index = React.useMemo(() => {
      return client.initIndex(indexName);
   }, [indexName, client]);
   return index;
}
