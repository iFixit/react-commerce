/* eslint-disable @typescript-eslint/no-use-before-define */
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch/lite';
import * as React from 'react';
import { Filter } from './types';

export function useAlgoliaClient(appId: string, apiKey: string): SearchClient {
   const clientRef = React.useRef<SearchClient>();
   if (clientRef.current == null) {
      clientRef.current = algoliasearch(appId, apiKey);
   }
   return clientRef.current;
}

export function useAlgoliaIndex(
   indexName: string,
   client: SearchClient
): SearchIndex {
   const indexRef = React.useRef<SearchIndex>();
   const mountedRef = React.useRef(false);

   if (indexRef.current == null) {
      indexRef.current = client.initIndex(indexName);
   }

   React.useEffect(() => {
      if (mountedRef.current === false) {
         mountedRef.current = true;
      } else {
         indexRef.current = client.initIndex(indexName);
      }
   }, [indexName, client]);

   return indexRef.current;
}

export function getFiltersString(filters: Filter[]): string {
   return filters.map(getFilterString).join(' AND ');
}

export function getFilterString(filter: Filter): string {
   switch (filter.type) {
      case 'or': {
         return `(${filter.filters.map(getFilterString).join(' OR ')})`;
      }
      case 'and': {
         return `(${filter.filters.map(getFilterString).join(' AND ')})`;
      }
      case 'basic': {
         return `"${filter.facet}":"${filter.value}"`;
      }
      case 'numeric-comparison': {
         return `"${filter.facet}" ${filter.operator} ${filter.value}`;
      }
      case 'numeric-range': {
         return `"${filter.facet}":${filter.lowerValue} TO ${filter.higherValue}`;
      }
   }
}
