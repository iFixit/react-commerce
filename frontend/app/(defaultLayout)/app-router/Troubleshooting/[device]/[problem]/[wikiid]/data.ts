import {
   IFixitAPIClient,
   VarnishBypassHeader,
} from '@ifixit/ifixit-api-client';
import { SentryError } from '@ifixit/sentry';
import { TroubleshootingApiData } from '@templates/troubleshooting/hooks/useTroubleshootingProps';
import { ifixitOrigin } from 'app/_helpers/app-helpers';
import { cache } from 'react';

export const findProblemWiki = cache(
   async (wikiid: string): Promise<TroubleshootingApiData | null> => {
      const client = new IFixitAPIClient({
         origin: ifixitOrigin(),
         headers: VarnishBypassHeader,
      });

      const resp = await client.getRaw(
         `Troubleshooting/wikiid/${wikiid}`,
         'troubleshooting'
      );

      if (resp.status === 404) {
         return null;
      }

      if (!resp.ok) {
         throw new SentryError(resp.statusText);
      }

      return await resp.json();
   }
);
