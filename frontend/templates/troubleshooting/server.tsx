import { DEFAULT_STORE_CODE } from '@config/env';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import { getLayoutServerSideProps } from '@layouts/default/server';
import {
   GetServerSideProps,
   GetServerSidePropsContext,
   PreviewData,
} from 'next';
import {
   TroubleshootingProps,
   TroubleshootingData,
   TroubleshootingApiData,
} from './hooks/useTroubleshootingProps';
import { withLogging, withNoindexDevDomains } from '@helpers/next-helpers';
import { withCacheLong } from '@helpers/cache-control-helpers';
import compose from 'lodash/flowRight';
import { ParsedUrlQuery } from 'querystring';

const withMiddleware = compose(
   withLogging<TroubleshootingProps>,
   withCacheLong<TroubleshootingProps>,
   withNoindexDevDomains<TroubleshootingProps>
);

function rethrowUnless404(e: any) {
   // If e is from IFixitAPIClient and fetch() didn't error,
   // e.message is the response's statusText
   if (typeof e === 'object' && (e as Error)?.message === 'Not Found') {
      return;
   }
   throw e;
}

async function getTroubleshootingData(
   context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): Promise<TroubleshootingApiData | null> {
   const ifixitOrigin = ifixitOriginFromHost(context);
   const client = new IFixitAPIClient({ origin: ifixitOrigin });

   const wikiname = context.params?.wikiname;

   if (!wikiname) {
      return null;
   }

   try {
      return await client.get<TroubleshootingApiData>(
         `Troubleshooting/${wikiname}?vulcan=1`,
         'troubleshooting'
      );
   } catch (e) {
      rethrowUnless404(e);
      return null;
   }
}

export const getServerSideProps: GetServerSideProps<TroubleshootingProps> =
   withMiddleware(async (context) => {
      const layoutProps = await getLayoutServerSideProps({
         storeCode: DEFAULT_STORE_CODE,
      });

      const troubleshootingData = await getTroubleshootingData(context);

      if (!troubleshootingData) {
         return {
            notFound: true,
         };
      }

      const canonicalUrl = new URL(troubleshootingData.canonicalUrl);
      /*
       * Since `resolvedUrl` doesn't include a hostname or protocol,
       * we're providing a fake one. We never actually read it out,
       * so it doesn't much matter what we use.
       */
      const currentUrl = new URL(
         context.resolvedUrl,
         'https://vulcan.ifixit.com'
      );

      if (currentUrl.pathname.toString() !== canonicalUrl.pathname.toString()) {
         return {
            redirect: {
               destination:
                  canonicalUrl.pathname.toString() +
                  currentUrl.search.toString(),
               permanent: true,
            },
         };
      }

      const wikiData: TroubleshootingData = {
         ...troubleshootingData,
      };

      const ifixitOrigin = ifixitOriginFromHost(context);
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
