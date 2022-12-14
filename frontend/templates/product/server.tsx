import { DEFAULT_STORE_CODE } from '@config/env';
import {
   noindexDevDomains,
   serverSidePropsWrapper,
} from '@helpers/next-helpers';
import { ifixitOriginFromHost } from '@helpers/path-helpers';
import { invariant } from '@ifixit/helpers';
import { urlFromContext } from '@ifixit/helpers/nextjs';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { findProduct } from '@models/product.server';
import { GetServerSideProps } from 'next';
import { ProductTemplateProps } from './hooks/useProductTemplateProps';

export const getServerSideProps: GetServerSideProps<ProductTemplateProps> =
   serverSidePropsWrapper<ProductTemplateProps>('product', async (context) => {
      context.res.setHeader(
         'Cache-Control',
         'public, s-maxage=60, stale-while-revalidate=600'
      );

      noindexDevDomains(context);
      const { handle } = context.params || {};
      invariant(typeof handle === 'string', 'handle param is missing');
      const { stores, ...otherLayoutProps } = await getLayoutServerSideProps({
         storeCode: DEFAULT_STORE_CODE,
      });
      const product = await findProduct({
         handle,
         storeCode: DEFAULT_STORE_CODE,
      });

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
            store.url = `${domain}/products/${product.handle}`;
         }
         return store;
      });

      const pageProps: ProductTemplateProps = {
         layoutProps: {
            ...otherLayoutProps,
            stores: storesWithProductUrls,
         },
         appProps: {
            ifixitOrigin: ifixitOriginFromHost(context),
         },
         product,
      };
      return {
         props: pageProps,
      };
   });
