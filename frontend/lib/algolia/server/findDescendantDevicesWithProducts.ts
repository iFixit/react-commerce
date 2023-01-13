import {
   ALGOLIA_API_KEY,
   ALGOLIA_APP_ID,
   ALGOLIA_PRODUCT_INDEX_NAME,
} from '@config/env';
import { CLIENT_OPTIONS, escapeFilterValue } from '@helpers/algolia-helpers';
import { timeAsync } from '@ifixit/stats';
import algoliasearch from 'algoliasearch';

export async function findDescendantDevicesWithProducts(device: string) {
   return timeAsync('algolia.findDescendantDevicesWithProducts', async () => {
      const client = algoliasearch(
         ALGOLIA_APP_ID,
         ALGOLIA_API_KEY,
         CLIENT_OPTIONS
      );
      const index = client.initIndex(ALGOLIA_PRODUCT_INDEX_NAME);
      const deviceSuffix = device
         ? ` AND device:"${escapeFilterValue(device)}"`
         : '';
      const { facets } = await index.search('', {
         facets: ['device'],
         filters: `public = 1${deviceSuffix}`,
         maxValuesPerFacet: 1000,
         hitsPerPage: 0,
      });
      return facets?.device ? Object.keys(facets?.device) : [];
   });
}
