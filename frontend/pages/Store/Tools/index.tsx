import { Layout } from '@components/common';
import {
   ProductListView,
   ProductListViewProps,
} from '@components/product-list';
import { ALGOLIA_DEFAULT_INDEX_NAME } from '@config/constants';
import { getGlobalSettings, GlobalSettings } from '@models/global-settings';
import {
   createProductListSearchContext,
   findProductList,
} from '@models/product-list';
import {
   getStoreByCode,
   getStoreList,
   Store,
   StoreListItem,
} from '@models/store';
import { GetServerSideProps } from 'next';
import * as React from 'react';

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

   const [globalSettings, stores, currentStore, productList] =
      await Promise.all([
         getGlobalSettings(),
         getStoreList(),
         getStoreByCode('us'),
         findProductList({
            handle: {
               eq: 'Tools',
            },
         }),
      ]);

   if (productList == null) {
      return {
         notFound: true,
      };
   }

   const searchContext = await createProductListSearchContext({
      algoliaIndexName: ALGOLIA_DEFAULT_INDEX_NAME,
      urlQuery: context.query,
      filters: productList.filters || undefined,
   });

   if (searchContext == null) {
      return {
         notFound: true,
      };
   }

   return {
      props: {
         globalSettings,
         currentStore,
         stores,
         productList,
         searchContext,
      },
   };
};

const ProductListPage: NextPageWithLayout<PageProps> = ({
   productList,
   searchContext,
}) => {
   return (
      <ProductListView
         productList={productList}
         searchContext={searchContext}
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
