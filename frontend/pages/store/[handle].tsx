import { Layout } from '@components/common';
import {
   ProductListView,
   ProductListViewProps,
} from '@components/product-list';
import { getGlobalSettings } from '@models/global-settings';
import {
   createProductListSearchContext,
   getProductListByHandle,
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
};

// This constant should probably be a field of the store model (editable from CMS)
// so that it's configurable per-store.
const ALGOLIA_DEFAULT_INDEX_NAME = 'product_en';

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

   const [
      globalSettings,
      stores,
      currentStore,
      productList,
   ] = await Promise.all([
      getGlobalSettings(),
      getStoreList(),
      getStoreByCode('us'),
      getProductListByHandle(handle),
   ]);

   if (productList == null) {
      return {
         notFound: true,
      };
   }
   const deviceHandle = productList.deviceTitle;

   const searchContext = await createProductListSearchContext({
      algoliaIndexName: ALGOLIA_DEFAULT_INDEX_NAME,
      deviceHandle,
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
   globalSettings,
}) => {
   return (
      <ProductListView
         productList={productList}
         searchContext={searchContext}
         globalSettings={globalSettings}
      />
   );
};

ProductListPage.getLayout = function getLayout(page, pageProps) {
   return (
      <Layout
         title={`iFixit | ${pageProps.productList.title}`}
         currentStore={pageProps.currentStore}
         stores={pageProps.stores}
      >
         {page}
      </Layout>
   );
};

export default ProductListPage;
