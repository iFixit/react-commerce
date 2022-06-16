import { AppProviders, Layout, WithLayoutProps } from '@components/common';
import {
   ProductListView,
   ProductListViewProps,
} from '@components/product-list';
import { ALGOLIA_DEFAULT_INDEX_NAME } from '@config/constants';
import { IFIXIT_ORIGIN } from '@config/env';
import {
   generateCSRFToken,
   setCSRFCookie,
   WithCSRFProps,
} from '@ifixit/auth-sdk';
import { getGlobalSettings } from '@models/global-settings';
import { findProductList } from '@models/product-list';
import { getStoreByCode, getStoreList } from '@models/store';
import { GetServerSideProps } from 'next';
import { getServerState } from 'react-instantsearch-hooks-server';

type PageProps = WithLayoutProps<ProductListViewProps>;
type AppPageProps = WithCSRFProps<PageProps>;

export const getServerSideProps: GetServerSideProps<AppPageProps> = async (
   context
) => {
   // The data is considered fresh for 10 seconds, and can be served even if stale for up to 10 minutes
   context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=1200'
   );

   const csrfToken = generateCSRFToken();
   setCSRFCookie(context, {
      csrfToken,
      origin: IFIXIT_ORIGIN,
   });

   const { handle } = context.params || {};
   if (typeof handle !== 'string') {
      return {
         notFound: true,
      };
   }

   const [globalSettings, stores, currentStore, productList] =
      await Promise.all([
         getGlobalSettings(),
         getStoreList(),
         getStoreByCode('us'),
         findProductList({
            handle: {
               eq: handle,
            },
         }),
      ]);

   if (productList == null) {
      return {
         notFound: true,
      };
   }

   const title = `iFixit | ${productList.title}`;

   const protocol = context.req.headers.referer?.split('://')[0] || 'https';
   const url = `${protocol}://${context.req.headers.host}${context.req.url}`;
   const indexName = ALGOLIA_DEFAULT_INDEX_NAME;
   const serverState = await getServerState(
      <AppProviders csrfToken={csrfToken}>
         <ProductListPage
            productList={productList}
            url={url}
            indexName={indexName}
            title={title}
            globalSettings={globalSettings}
            stores={stores}
            currentStore={currentStore}
         />
      </AppProviders>
   );

   return {
      props: {
         csrfToken,
         globalSettings,
         currentStore,
         stores,
         title,
         productList,
         indexName,
         serverState,
         url,
      },
   };
};

const ProductListPage: NextPageWithLayout<PageProps> = ({
   productList,
   url,
   serverState,
   indexName,
}) => {
   return (
      <ProductListView
         productList={productList}
         indexName={indexName}
         url={url}
         serverState={serverState}
      />
   );
};

ProductListPage.getLayout = function getLayout(page, pageProps) {
   return <Layout {...pageProps}>{page}</Layout>;
};

export default ProductListPage;
