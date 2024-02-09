import { createFetchRequester } from '@algolia/requester-fetch';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import algoliasearch, { SearchClient } from 'algoliasearch';

export type { SearchResponse } from '@algolia/client-search';

export function createClient() {
   const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY, {
      requester: createFetchRequester(),
   });
   return client;
}

export type MultipleQueriesQuery = Parameters<
   SearchClient['multipleQueries']
>[0][number];
