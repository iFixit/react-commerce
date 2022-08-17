import {
   AppProviders,
   AppProvidersProps,
   Layout,
   LayoutProps,
   WithLayoutProps,
   WithProvidersProps,
} from '@components/common';
import { ALGOLIA_PRODUCT_INDEX_NAME } from '@config/env';
import {
   decodeDeviceItemType,
   decodeDeviceTitle,
   encodeDeviceTitle,
} from '@helpers/product-list-helpers';
import { assertNever, invariant, logAsync } from '@ifixit/helpers';
import { urlFromContext } from '@ifixit/helpers/nextjs';
import { getGlobalSettings } from '@models/global-settings';
import {
   findProductList,
   ProductList,
   ProductListType,
} from '@models/product-list';
import { getStoreByCode, getStoreList } from '@models/store';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getServerState } from 'react-instantsearch-hooks-server';
import { ProductListView } from './ProductListView';

export type ProductListTemplateProps = WithProvidersProps<
   WithLayoutProps<{
      productList: ProductList;
      indexName: string;
   }>
>;

export const ProductListTemplate: NextPageWithLayout<ProductListTemplateProps> =
   ({ productList, indexName }) => {
      return (
         <ProductListView productList={productList} indexName={indexName} />
      );
   };

ProductListTemplate.getLayout = function getLayout(page, pageProps) {
   return <Layout {...pageProps.layoutProps}>{page}</Layout>;
};

export default ProductListTemplate;

type GetProductListServerSidePropsOptions = {
   productListType: ProductListType;
};

export const getProductListServerSideProps = ({
   productListType,
}: GetProductListServerSidePropsOptions): GetServerSideProps<ProductListTemplateProps> => {
   return async (context) => {
      context.res.setHeader(
         'Cache-Control',
         'public, s-maxage=10, stale-while-revalidate=600'
      );

      const indexName = ALGOLIA_PRODUCT_INDEX_NAME;
      const layoutProps: Promise<LayoutProps> = getLayoutProps();
      let productList: ProductList | null;
      let shouldRedirectToCanonical = false;
      let canonicalPath: string | null = null;

      switch (productListType) {
         case ProductListType.AllParts: {
            productList = await logAsync('findProductList', () =>
               findProductList({ handle: { eq: 'Parts' } })
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

            if (otherPathSegments.length > 0) {
               return {
                  notFound: true,
               };
            }

            const itemType = itemTypeHandle
               ? decodeDeviceItemType(itemTypeHandle)
               : null;

            const deviceTitle = decodeDeviceTitle(deviceHandle);
            productList = await logAsync('findProductList', () =>
               findProductList(
                  {
                     deviceTitle: {
                        eqi: deviceTitle,
                     },
                  },
                  itemType
               )
            );

            shouldRedirectToCanonical =
               typeof productList?.deviceTitle === 'string' &&
               productList.deviceTitle !== deviceTitle;

            canonicalPath = getDeviceCanonicalPath(
               productList?.deviceTitle,
               itemTypeHandle
            );

            break;
         }
         case ProductListType.AllTools: {
            productList = await logAsync('findProductList', () =>
               findProductList({ handle: { eq: 'Tools' } })
            );
            break;
         }
         case ProductListType.ToolsCategory: {
            const { handle } = context.params || {};
            invariant(
               typeof handle === 'string',
               'tools category handle is required'
            );

            productList = await logAsync('findProductList', () =>
               findProductList({ handle: { eqi: handle } })
            );

            shouldRedirectToCanonical =
               typeof productList?.handle === 'string' &&
               productList.handle !== handle;
            canonicalPath =
               typeof productList?.handle === 'string'
                  ? `/Tools/${productList.handle}`
                  : null;

            break;
         }
         case ProductListType.Marketing: {
            const { handle } = context.params || {};
            invariant(
               typeof handle === 'string',
               'shop category handle is required'
            );

            productList = await logAsync('findProductList', () =>
               findProductList({
                  handle: {
                     eqi: handle,
                  },
                  type: {
                     eq: 'marketing',
                  },
               })
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
         },
      };

      const appMarkup = (
         <AppProviders {...appProps}>
            <ProductListView productList={productList} indexName={indexName} />
         </AppProviders>
      );

      const serverState = await logAsync('getServerState', () =>
         getServerState(appMarkup)
      );

      const pageProps: ProductListTemplateProps = {
         productList,
         indexName,
         layoutProps: await layoutProps,
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
};

async function getLayoutProps(): Promise<LayoutProps> {
   const [globalSettings, stores, currentStore] = await Promise.all([
      getGlobalSettings(),
      getStoreList(),
      getStoreByCode('us'),
   ]);
   return {
      globalSettings,
      currentStore,
      stores,
   };
}

function getDevicePathSegments(
   context: GetServerSidePropsContext<ParsedUrlQuery>
) {
   const { deviceHandleItemType } = context.params || {};
   if (Array.isArray(deviceHandleItemType)) {
      return deviceHandleItemType;
   }
   return [];
}

function getDeviceCanonicalPath(
   deviceTitle: string | null | undefined,
   itemTypeHandle?: string
) {
   if (deviceTitle == null) {
      return null;
   }
   const slug = itemTypeHandle ? `/${itemTypeHandle}` : '';
   const canonicalDeviceTitle = encodeDeviceTitle(deviceTitle);
   return `/Parts/${canonicalDeviceTitle}${slug}`;
}
