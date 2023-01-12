import {
   ALGOLIA_API_KEY,
   ALGOLIA_APP_ID,
   ALGOLIA_PRODUCT_INDEX_NAME,
} from '@config/env';
import { CLIENT_OPTIONS } from '@helpers/algolia-helpers';
import { timeAsync } from '@ifixit/stats';
import { cache } from '@lib/cache';
import algoliasearch from 'algoliasearch';

export async function findDescendantDevicesWithProducts(device: string) {
   return cache(
      `algolia.findDescendantDevicesWithProducts.${device}`,
      () =>
         timeAsync('algolia.findDescendantDevicesWithProducts', () =>
            fetchDevices(device)
         ),
      60 * 10
   );
}

async function fetchDevices(device: string) {
   const client = algoliasearch(
      ALGOLIA_APP_ID,
      ALGOLIA_API_KEY,
      CLIENT_OPTIONS
   );
   const index = client.initIndex(ALGOLIA_PRODUCT_INDEX_NAME);
   const { facets } = await index.search('', {
      facets: ['device'],
      filters: `public = 1${device ? ` AND device:"${device}"` : ''}`,
      maxValuesPerFacet: 1000,
      hitsPerPage: 0,
   });
   return facets?.device ? Object.keys(facets?.device) : [];
}
