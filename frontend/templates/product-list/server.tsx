import { AppProviders, AppProvidersProps } from '@components/common';
import { InstantSearchProvider } from '@components/common/InstantSearchProvider';
import { ALGOLIA_PRODUCT_INDEX_NAME, DEFAULT_STORE_CODE } from '@config/env';
import {
   CacheLong,
   hasDisableCacheGets,
   withCache,
} from '@helpers/cache-control-helpers';
import { withLogging } from '@helpers/next-helpers';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import {
   destylizeDeviceItemType,
   destylizeDeviceTitle,
   stylizeDeviceItemType,
   stylizeDeviceTitle,
} from '@helpers/product-list-helpers';
import { assertNever, invariant, timeAsync } from '@ifixit/helpers';
import { urlFromContext } from '@ifixit/helpers/nextjs';
import type { DefaultLayoutProps } from '@layouts/default/server';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { ProductList, ProductListType } from '@models/product-list';
import ProductListCache from '@pages/api/nextjs/cache/product-list';
import compose from 'lodash/flowRight';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { renderToString } from 'react-dom/server';
import { getServerState } from 'react-instantsearch';
import { ProductListTemplateProps } from './hooks/useProductListTemplateProps';
import { ProductListView } from './ProductListView';

const withMiddleware = compose(
   withLogging<ProductListTemplateProps>,
   withCache(CacheLong)<ProductListTemplateProps>
);

type GetProductListServerSidePropsOptions = {
   productListType: ProductListType;
};

export const getProductListServerSideProps = ({
   productListType,
}: GetProductListServerSidePropsOptions): GetServerSideProps<ProductListTemplateProps> =>
   withMiddleware(async (context) => {
      const indexName = ALGOLIA_PRODUCT_INDEX_NAME;
      const forceMiss = hasDisableCacheGets(context);
      const layoutProps: Promise<DefaultLayoutProps> = getLayoutServerSideProps(
         {
            storeCode: DEFAULT_STORE_CODE,
            forceMiss,
         }
      );
      let productList: ProductList | null;
      let shouldRedirectToCanonical = false;
      let canonicalPath: string | null = null;
      const ifixitOrigin = ifixitOriginFromHost(context);
      const cacheOptions = { forceMiss };

      switch (productListType) {
         case ProductListType.AllParts: {
            productList = await timeAsync('findProductList', () =>
               ProductListCache.get(
                  {
                     filters: { handle: { eq: 'Parts' } },
                     ifixitOrigin,
                  },
                  cacheOptions
               )
            );
            break;
         }
         case ProductListType.DeviceParts: {
            const [deviceHandle, itemTypeHandle, ...otherPathSegments] =
               getDevicePathSegments(context);

            invariant(
               typeof deviceHandle === 'string',
               'device handle is required'
            );

            const deviceTitle = destylizeDeviceTitle(deviceHandle);

            if (otherPathSegments.length > 0) {
               return {
                  notFound: true,
               };
            }

            const itemType = itemTypeHandle
               ? destylizeDeviceItemType(itemTypeHandle)
               : null;

            productList = await timeAsync('findProductList', () =>
               ProductListCache.get(
                  {
                     filters: {
                        deviceTitle: {
                           eqi: deviceTitle,
                        },
                     },
                     ifixitOrigin,
                  },
                  cacheOptions
               )
            );

            shouldRedirectToCanonical =
               typeof productList?.deviceTitle === 'string' &&
               productList.deviceTitle !== deviceTitle;

            canonicalPath = getDeviceCanonicalPath(
               productList?.deviceTitle,
               itemType
            );

            break;
         }
         case ProductListType.AllTools: {
            productList = await timeAsync('findProductList', () =>
               ProductListCache.get(
                  { filters: { handle: { eq: 'Tools' } }, ifixitOrigin },
                  cacheOptions
               )
            );
            break;
         }
         case ProductListType.ToolsCategory: {
            const { handle } = context.params || {};
            invariant(
               typeof handle === 'string',
               'tools category handle is required'
            );

            productList = await timeAsync('findProductList', () =>
               ProductListCache.get(
                  {
                     filters: {
                        handle: { eqi: handle },
                        type: { in: ['marketing', 'tools'] },
                     },
                     ifixitOrigin,
                  },
                  cacheOptions
               )
            );

            const isMarketing = productList?.type === ProductListType.Marketing;
            const isMiscapitalized =
               typeof productList?.handle === 'string' &&
               productList.handle !== handle;
            shouldRedirectToCanonical = isMiscapitalized || isMarketing;
            canonicalPath =
               typeof productList?.handle === 'string'
                  ? isMarketing
                     ? `/Shop/${productList.handle}`
                     : `/Tools/${productList.handle}`
                  : null;

            break;
         }
         case ProductListType.Marketing: {
            const { handle } = context.params || {};
            invariant(
               typeof handle === 'string',
               'shop category handle is required'
            );

            productList = await timeAsync('findProductList', () =>
               ProductListCache.get(
                  {
                     filters: {
                        handle: { eqi: handle },
                        type: { eq: 'marketing' },
                     },
                     ifixitOrigin,
                  },
                  cacheOptions
               )
            );
            shouldRedirectToCanonical =
               typeof productList?.handle === 'string' &&
               productList.handle !== handle;
            canonicalPath =
               typeof productList?.handle === 'string'
                  ? `/Shop/${productList.handle}`
                  : null;

            break;
         }
         default: {
            return assertNever(productListType);
         }
      }

      if (productList == null) {
         return {
            notFound: true,
         };
      }

      if (shouldRedirectToCanonical) {
         invariant(canonicalPath != null, 'canonical path is required');
         return {
            redirect: {
               permanent: true,
               destination: canonicalPath,
            },
         };
      }

      const appProps: AppProvidersProps = {
         algolia: {
            indexName,
            url: urlFromContext(context),
            apiKey: productList.algolia.apiKey,
            logContextName: 'algolia.getServerState',
         },
         ifixitOrigin,
      };

      const { serverState, adminMessage } = await getSafeServerState({
         appProps,
         productList,
      });

      const pageProps: ProductListTemplateProps = {
         productList,
         layoutProps: {
            ...(await layoutProps),
            includeTitle: false,
         },
         appProps: {
            ...appProps,
            ...(adminMessage ? { adminMessage } : {}),
            algolia: appProps.algolia
               ? {
                    ...appProps.algolia,
                    serverState,
                 }
               : undefined,
         },
      };

      return {
         props: pageProps,
      };
   });

type GetSafeServerStateProps = {
   appProps: AppProvidersProps;
   productList: ProductList;
};

async function getSafeServerState({
   appProps,
   productList,
}: GetSafeServerStateProps) {
   const tryGetServerState = (productList: ProductList) => {
      const appMarkup = (
         <AppProviders {...appProps}>
            <InstantSearchProvider {...appProps.algolia!}>
               <ProductListView productList={productList} algoliaSSR={true} />
            </InstantSearchProvider>
         </AppProviders>
      );
      return timeAsync('getServerState', () =>
         getServerState(appMarkup, { renderToString })
      );
   };
   try {
      return { serverState: await tryGetServerState(productList) };
   } catch (e) {
      console.error('Error getting instantsearch server state', e);
      const serverState = await tryGetServerState({
         ...productList,
         filters: null,
      });
      return {
         serverState,
         adminMessage:
            'Failed to perform algolia search, possible error in filters, check strapi',
      };
   }
}

function getDevicePathSegments(
   context: GetServerSidePropsContext<ParsedUrlQuery>
) {
   /**
    * We should be able to use `context.params` here,
    * but see: https://github.com/vercel/next.js/issues/49646
    *
    * Basically something like device:variant%2FWithASlash
    * Will be parsed into:
    *   ['device', 'variant', 'WithASlash']
    * Instead of:
    *  ['device', 'variant/WithASlash']
    */
   const path = context.resolvedUrl.split('?')[0];
   // turn into an array of path segments
   const segments = path.split('/').filter(Boolean);
   // remove the first segment, which is always 'Parts'
   segments.shift();
   const decodedSegments = segments.map(decodeURIComponent);
   return decodedSegments;
}

function getDeviceCanonicalPath(
   deviceTitle: string | null | undefined,
   itemType: string | null
) {
   if (deviceTitle == null) {
      return null;
   }
   const slug = itemType
      ? `/${encodeURIComponent(stylizeDeviceItemType(itemType))}`
      : '';
   const canonicalDeviceHandle = encodeURIComponent(
      stylizeDeviceTitle(deviceTitle)
   );
   return `/Parts/${canonicalDeviceHandle}${slug}`;
}
