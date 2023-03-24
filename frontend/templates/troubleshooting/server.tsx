import { DEFAULT_STORE_CODE } from '@config/env';
import { withSentry } from '@helpers/next-helpers';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { GetServerSideProps } from 'next';
import {
   TroubleshootingProps,
   TroubleshootingData,
} from './hooks/useTroubleshootingProps';

const withMiddleware = withSentry<TroubleshootingProps>;

export const getServerSideProps: GetServerSideProps<TroubleshootingProps> =
   withMiddleware(async (context) => {
      const layoutProps = await getLayoutServerSideProps({
         storeCode: DEFAULT_STORE_CODE,
      });

      const ifixitOrigin = ifixitOriginFromHost(context);
      const client = new IFixitAPIClient({ origin: ifixitOrigin });

      const wikiname = context.params?.wikiname;

      if (!wikiname) {
         return {
            notFound: true,
         };
      }

      const wikiData = await client.get<TroubleshootingData>(
         `Troubleshooting/${wikiname}`,
         {
            credentials: 'include',
         }
      );

      const pageProps: TroubleshootingProps = {
         wikiData,
         layoutProps,
         appProps: {
            ifixitOrigin,
         },
      };
      return {
         props: pageProps,
      };
   });
