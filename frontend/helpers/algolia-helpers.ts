import { capitalize } from '@helpers/application-helpers';
import { AlgoliaSearchOptions } from 'algoliasearch';
import { createNodeHttpRequester } from '@algolia/requester-node-http';
import { Requester, Request, Response } from '@algolia/requester-common';
import { timeAsync } from '@ifixit/helpers';
import { useMenu } from 'react-instantsearch';

const FACETS_NAME_OVERRIDES: { [rawName: string]: string } = {
   price_range: 'Price Range',
};

const requester =
   typeof window === 'undefined' ? createNodeHttpRequester() : undefined;

/**
 * @param logContextName: log the timing of each algolia request under this
 * name (or don't log if it's null)
 */
export function getClientOptions(
   logContextName: string | null = 'algolia.request'
): AlgoliaSearchOptions {
   const requesterOptions =
      requester && logContextName
         ? { requester: withRequestLogging(logContextName, requester) }
         : undefined;

   return {
      // Default timeouts: connect = 2s, read = 5s, write = 30s
      timeouts: {
         connect: 5,
         read: 5,
         write: 30,
      },
      ...requesterOptions,
   };
}

function withRequestLogging(
   logContextName: string,
   requester: Requester
): Requester {
   let count = 0;
   return {
      send(request: Request): Promise<Response> {
         count++;
         const eventSuffix = count > 1 ? count : '';
         const eventName = logContextName + eventSuffix;
         return timeAsync(eventName, () => requester.send(request));
      },
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

/**
 * This temporary hack allows to correctly populate the itemType facet during SSR
 * see: https://github.com/algolia/instantsearch/issues/5571
 */
export function AlgoliaAttributeSSRHack(attributeName: string) {
   useMenu({ attribute: attributeName });
}
