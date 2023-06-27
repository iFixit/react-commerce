import { DEFAULT_STORE_CODE } from '@config/env';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import { IFixitAPIClient } from '@ifixit/ifixit-api-client';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { GetServerSideProps } from 'next';
import {
   TroubleshootingProps,
   TroubleshootingData,
   TroubleshootingApiData,
   ApiSolutionSection,
   SolutionSection,
} from './hooks/useTroubleshootingProps';
import { Guide } from './hooks/GuideModel';
import Product from '@pages/api/nextjs/cache/product';
import type { Product as ProductType } from '@models/product';
import {
   hasDisableCacheGets,
   withLogging,
   withNoindexDevDomains,
} from '@helpers/next-helpers';
import { withCacheLong } from '@helpers/cache-control-helpers';
import compose from 'lodash/flowRight';

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

      async function fetchDataForSolution(
         solution: ApiSolutionSection
      ): Promise<SolutionSection> {
         const guides = await Promise.all(
            solution.guides.map((guideid: number) => {
               return (
                  client.get(`guides/${guideid}`, 'guide') as Promise<Guide>
               ).catch((error) => {
                  rethrowUnless404(error);
                  return null;
               });
            })
         );
         const products: ('' | null | ProductType)[] = await Promise.all(
            solution.products.map((handle: string | null) => {
               return (
                  handle &&
                  Product.get(
                     {
                        handle,
                        storeCode: DEFAULT_STORE_CODE,
                        ifixitOrigin,
                     },
                     { forceMiss: hasDisableCacheGets(context) }
                  ).catch((error) => {
                     rethrowUnless404(error);
                     return null;
                  })
               );
            })
         );
         return {
            ...solution,
            guides: guides.filter((guide): guide is Guide => Boolean(guide)),
            products: products.filter((product): product is ProductType =>
               Boolean(product)
            ),
         };
      }

      let troubleshootingData: TroubleshootingApiData;
      try {
         troubleshootingData = await client.get<TroubleshootingApiData>(
            `Troubleshooting/${wikiname}?vulcan=1`,
            'troubleshooting'
         );
      } catch (e) {
         rethrowUnless404(e);
         return {
            notFound: true,
         };
      }

      const solutions: SolutionSection[] = await Promise.all(
         troubleshootingData.solutions.map(fetchDataForSolution)
      );

      const wikiData: TroubleshootingData = {
         ...troubleshootingData,
         solutions,
      };

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
