import { DEFAULT_STORE_CODE } from '@config/env';
import {
   CacheLong,
   hasDisableCacheGets,
   withCache,
} from '@helpers/cache-control-helpers';
import { withLogging } from '@helpers/next-helpers';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import { invariant } from '@ifixit/helpers';
import { urlFromContext } from '@ifixit/helpers/nextjs';
import { getLayoutServerSideProps } from '@layouts/default/server';
import Product from '@pages/api/nextjs/cache/product';
import compose from 'lodash/flowRight';
import { GetServerSideProps } from 'next';
import { ProductTemplateProps } from './hooks/useProductTemplateProps';

const withMiddleware = compose(
   withLogging<ProductTemplateProps>,
   withCache(CacheLong)<ProductTemplateProps>
);

export const getServerSideProps: GetServerSideProps<ProductTemplateProps> =
   withMiddleware(async (context) => {
      const { handle } = context.params || {};
      invariant(typeof handle === 'string', 'handle param is missing');
      const forceMiss = hasDisableCacheGets(context);
      const { stores, ...otherLayoutProps } = await getLayoutServerSideProps({
         storeCode: DEFAULT_STORE_CODE,
         forceMiss,
      });
      const ifixitOrigin = ifixitOriginFromHost(context);
      const product = await Product.get(
         {
            handle,
            storeCode: DEFAULT_STORE_CODE,
            ifixitOrigin,
         },
         { forceMiss }
      );

      if (product && 'target' in product) {
         return {
            redirect: {
               destination: product.target,
               permanent: true,
            },
         };
      }

      if (product == null) {
         return {
            notFound: true,
         };
      }

      if (product.redirectUrl) {
         const query = new URL(urlFromContext(context)).search;
         return {
            redirect: {
               destination: `${product.redirectUrl}${query}`,
               permanent: true,
            },
         };
      }

      const proOnly = product?.tags.find((tag: string) => tag === 'Pro Only');
      if (proOnly) {
         context.res.setHeader('X-Robots-Tag', 'noindex, follow');
      }

      const codeToDomain =
         product.enabledDomains?.reduce((acc, { code, domain }) => {
            acc[code] = domain;
            return acc;
         }, {} as Record<string, string>) ?? {};
      const storesWithProductUrls = stores.map((store) => {
         const domain =
            store.code === DEFAULT_STORE_CODE
               ? new URL(store.url).origin
               : codeToDomain[store.code];
         if (domain) {
            return { ...store, url: `${domain}/products/${product.handle}` };
         }
         return store;
      });

      const pageProps: ProductTemplateProps = {
         layoutProps: {
            ...otherLayoutProps,
            stores: storesWithProductUrls,
         },
         appProps: {
            ifixitOrigin: ifixitOrigin,
         },
         product,
      };
      return {
         props: pageProps,
      };
   });
