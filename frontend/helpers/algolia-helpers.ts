import { capitalize } from '@helpers/application-helpers';
import { AlgoliaSearchOptions } from 'algoliasearch';
import { createNodeHttpRequester } from '@algolia/requester-node-http';
import { Requester } from '@algolia/requester-common';
import { withTiming } from '@ifixit/helpers';

const FACETS_NAME_OVERRIDES: { [rawName: string]: string } = {
   price_range: 'Price Range',
};

const requesterOptions =
   typeof window === 'undefined'
      ? { requester: withRequestLogging(createNodeHttpRequester()) }
      : undefined;

export const CLIENT_OPTIONS: AlgoliaSearchOptions = {
   // Default timeouts: connect = 2s, read = 5s, write = 30s
   timeouts: {
      connect: 5,
      read: 5,
      write: 30,
   },
   ...requesterOptions,
};

function withRequestLogging(requester: Requester): Requester {
   return {
      send: withTiming('algolia.request', requester.send),
   };
}

export function formatFacetName(algoliaName: string): string {
   if (FACETS_NAME_OVERRIDES[algoliaName] == null) {
      let name = algoliaName.replace(/(options\.|facet_tags\.)/gi, '');
      name = name.replace(/_/g, ' ');
      name = capitalize(name);
      return name;
   }
   return FACETS_NAME_OVERRIDES[algoliaName];
}

/**
 * https://www.algolia.com/doc/api-reference/api-parameters/filters/#usage-notes
 */
export function escapeFilterValue(value: string) {
   return value.replaceAll("'", "\\'").replaceAll('"', '\\"');
}
