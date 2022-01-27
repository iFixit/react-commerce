import { Layout } from '@components/common';
import { StoreHomeView } from '@components/store-home';
import {
   getStoreByCode,
   getStoreList,
   Store,
   StoreListItem,
} from '@models/store';
import { GetServerSideProps } from 'next';
import * as React from 'react';

interface PageProps {
   stores: StoreListItem[];
   currentStore: Store;
}

// This constant should probably be a field of the store model (editable from CMS)
// so that it's configurable per-store.
const ALGOLIA_DEFAULT_INDEX_NAME = 'shopify_ifixit_test_products';

export const getServerSideProps: GetServerSideProps<PageProps> = async (
   context
) => {
   // The data is considered fresh for 10 seconds, and can be served even if stale for up to 10 minutes
   context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=600'
   );

   const [stores, currentStore] = await Promise.all([
      getStoreList(),
      getStoreByCode('us'),
   ]);

   return {
      props: {
         currentStore,
         stores,
      },
   };
};

const StoreHomePage: NextPageWithLayout<PageProps> = ({}) => {
   return <StoreHomeView />;
};

StoreHomePage.getLayout = function getLayout(page, pageProps) {
   return (
      <Layout
         title="iFixit | Store"
         currentStore={pageProps.currentStore}
         stores={pageProps.stores}
      >
         {page}
      </Layout>
   );
};

export default StoreHomePage;
