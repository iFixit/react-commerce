import {
   AppProviders,
   AppProvidersProps,
   Layout,
   WithLayoutProps,
   WithProvidersProps,
} from '@components/common';
import {
   ProductListView,
   ProductListViewProps,
} from '@components/product-list';
import { ALGOLIA_PRODUCT_INDEX_NAME } from '@config/env';
import { getGlobalSettings } from '@models/global-settings';
import { findProductList } from '@models/product-list';
import { getStoreByCode, getStoreList } from '@models/store';
import { logAsync, logAsyncWrap } from '@ifixit/helpers';
import { GetServerSideProps } from 'next';
import { getServerState } from 'react-instantsearch-hooks-server';
import { setSentryPageContext } from '@ifixit/sentry';

type PageProps = WithLayoutProps<ProductListViewProps>;
type AppPageProps = WithProvidersProps<PageProps>;

const getServerSidePropsInternal: GetServerSideProps<AppPageProps> = async (
   context
) => {
   context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=600'
   );

   const [globalSettings, stores, currentStore, productList] = await logAsync(
      'Promise.all',
      () =>
         Promise.all([
            getGlobalSettings(),
            getStoreList(),
            getStoreByCode('us'),
            findProductList({ handle: { eq: 'Parts' } }),
         ])
   );

   if (productList == null) {
      return {
         notFound: true,
      };
   }

   const title = `iFixit | ${productList.title}`;

   const indexName = ALGOLIA_PRODUCT_INDEX_NAME;

   const appProps: AppProvidersProps = {
      algolia: {
         indexName,
         url: urlFromContext(context),
         apiKey: productList.algolia.apiKey,
      },
   };

   const serverState = await logAsync('getServerState', () =>
      getServerState(
         <AppProviders {...appProps}>
            <ProductListView productList={productList} indexName={indexName} />
         </AppProviders>
      )
   );

   const pageProps: AppPageProps = {
      productList,
      indexName,
      layoutProps: {
         globalSettings,
         currentStore,
         stores,
         title,
      },
      appProps: {
         ...appProps,
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
};

export const getServerSideProps: GetServerSideProps<AppPageProps> =
   logAsyncWrap('getServerSideProps', getServerSidePropsInternal);

const ProductListPage: NextPageWithLayout<PageProps> = (pageProps) => {
   return <ProductListView {...pageProps} />;
};

ProductListPage.getLayout = function getLayout(page, pageProps) {
   return <Layout {...pageProps.layoutProps}>{page}</Layout>;
};

export default ProductListPage;
