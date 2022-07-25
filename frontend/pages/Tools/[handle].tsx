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
import { ALGOLIA_DEFAULT_INDEX_NAME } from '@config/constants';
import { getSubDomainRedirect } from '@helpers/redirect-helper';
import { invariant } from '@ifixit/helpers';
import { getGlobalSettings } from '@models/global-settings';
import { findProductList } from '@models/product-list';
import { getStoreByCode, getStoreList } from '@models/store';
import { GetServerSideProps } from 'next';
import { getServerState } from 'react-instantsearch-hooks-server';

type PageProps = WithLayoutProps<ProductListViewProps>;
type AppPageProps = WithProvidersProps<PageProps>;

export const getServerSideProps: GetServerSideProps<AppPageProps> = async (
   context
) => {
   // The data is considered fresh for 10 seconds, and can be served even if stale for up to 10 minutes
   context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=1200'
   );

   const redirects = getSubDomainRedirect(context.req, '/Parts');

   if (redirects) {
      return redirects;
   }

   const { handle } = context.params || {};
   invariant(typeof handle === 'string', 'tools category handle is required');

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

   const appProps: AppProvidersProps = {
      algolia: {
         indexName,
         url,
         apiKey: productList.algolia.apiKey,
      },
   };

   const serverState = await getServerState(
      <AppProviders {...appProps}>
         <ProductListView productList={productList} indexName={indexName} />
      </AppProviders>
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

const ProductListPage: NextPageWithLayout<PageProps> = (pageProps) => {
   return <ProductListView {...pageProps} />;
};

ProductListPage.getLayout = function getLayout(page, pageProps) {
   return <Layout {...pageProps.layoutProps}>{page}</Layout>;
};

export default ProductListPage;
