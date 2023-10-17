import { DEFAULT_STORE_CODE } from '@config/env';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import {
   IFixitAPIClient,
   VarnishBypassHeader,
} from '@ifixit/ifixit-api-client';
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
import { withLogging } from '@helpers/next-helpers';
import {
   hasDisableCacheGets,
   withCache,
   CacheLong,
   GetCacheControlOptions,
} from '@helpers/cache-control-helpers';
import compose from 'lodash/flowRight';
import { ParsedUrlQuery } from 'querystring';

const CacheOrDisableOnHeadRevision: GetCacheControlOptions = (context) => {
   const wantsHeadRevision =
      context.query.revisionid?.toString().toUpperCase() === 'HEAD';

   if (wantsHeadRevision) {
      return { disabled: true };
   }

   return CacheLong;
};

const withMiddleware = compose(
   withLogging<TroubleshootingProps>,
   withCache(CacheOrDisableOnHeadRevision)<TroubleshootingProps>
);

async function getTroubleshootingData(
   context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): Promise<TroubleshootingApiData | null> {
   const ifixitOrigin = ifixitOriginFromHost(context);
   const client = new IFixitAPIClient({
      origin: ifixitOrigin,
      headers: VarnishBypassHeader,
   });

   const url = getTroubleshootingApiUrl(context);
   if (!url) {
      return null;
   }

   const resp = await client.get(url, 'troubleshooting');

   if (resp.status === 404) {
      return null;
   }

   if (!resp.ok) {
      throw new Error(resp.statusText);
   }

   return await resp.json();
}

function getTroubleshootingApiUrl(
   context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): null | string {
   const wikiname = context.params?.wikiname;

   if (wikiname && typeof wikiname === 'string') {
      return `Troubleshooting/${wikiname}`;
   }

   const wikiid = context.params?.wikiid;

   if (wikiid && typeof wikiid === 'string') {
      return `Troubleshooting/wikiid/${wikiid}`;
   }

   return null;
}

export const getServerSideProps: GetServerSideProps<TroubleshootingProps> =
   withMiddleware(async (context) => {
      const layoutProps = await getLayoutServerSideProps({
         storeCode: DEFAULT_STORE_CODE,
         forceMiss: hasDisableCacheGets(context),
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
         decodeURIComponent(context.resolvedUrl),
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

      const wikiData: TroubleshootingData = troubleshootingData;

      const ifixitOrigin = ifixitOriginFromHost(context);
      const pageProps: TroubleshootingProps = {
         wikiData,
         layoutProps: {
            ...layoutProps,
            title: `${wikiData.title} - iFixit Troubleshooting`,
         },
         appProps: {
            ifixitOrigin,
         },
      };
      return {
         props: pageProps,
      };
   });
