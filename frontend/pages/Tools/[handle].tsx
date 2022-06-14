import { AppProviders, Layout } from '@components/common';
import {
   ProductListView,
   ProductListViewProps,
} from '@components/product-list';
import { ALGOLIA_DEFAULT_INDEX_NAME } from '@config/constants';
import { getGlobalSettings, GlobalSettings } from '@models/global-settings';
import { findProductList } from '@models/product-list';
import {
   getStoreByCode,
   getStoreList,
   Store,
   StoreListItem,
} from '@models/store';
import { GetServerSideProps } from 'next';
import * as React from 'react';
import { getServerState } from 'react-instantsearch-hooks-server';

type PageProps = ProductListViewProps & {
   stores: StoreListItem[];
   currentStore: Store;
   globalSettings: GlobalSettings;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (
   context
) => {
   // The data is considered fresh for 10 seconds, and can be served even if stale for up to 10 minutes
   context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=600'
   );

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

   const protocol = context.req.headers.referer?.split('://')[0] || 'https';
   const url = `${protocol}://${context.req.headers.host}${context.req.url}`;
   const indexName = ALGOLIA_DEFAULT_INDEX_NAME;
   const serverState = await getServerState(
      <AppProviders>
         <ProductListPage
            productList={productList}
            url={url}
            indexName={indexName}
            globalSettings={globalSettings}
            stores={stores}
            currentStore={currentStore}
         />
      </AppProviders>
   );

   return {
      props: {
         globalSettings,
         currentStore,
         stores,
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
   return (
      <Layout
         title={`iFixit | ${pageProps.productList.title}`}
         currentStore={pageProps.currentStore}
         stores={pageProps.stores}
         globalSettings={pageProps.globalSettings}
      >
         {page}
      </Layout>
   );
};

export default ProductListPage;
