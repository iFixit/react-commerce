import {
   AppProviders,
   AppProvidersProps,
} from '@components/common/AppProviders';
// import { renderToString } from 'react-dom/server';

import { ALGOLIA_PRODUCT_INDEX_NAME, DEFAULT_STORE_CODE } from '@config/env';
import { assertNever, invariant, timeAsync } from '@ifixit/helpers';
import { DefaultLayout } from '@layouts/default';
import {
   DefaultLayoutProps,
   getLayoutServerSideProps,
} from '@layouts/default/server';
import { ServerSidePropsProvider } from '@lib/server-side-props';
import { ProductListType } from '@models/product-list';
import { ProductList } from '@models/product-list/types';

import { InstantSearchProvider } from '@components/common/InstantSearchProvider';
import {
   destylizeDeviceItemType,
   destylizeDeviceTitle,
   stylizeDeviceItemType,
   stylizeDeviceTitle,
} from '@helpers/product-list-helpers';
import ProductListCache from '@pages/api/nextjs/cache/product-list';
import { ProductListTemplateProps } from '@templates/product-list/hooks/useProductListTemplateProps';
import { ProductListView } from '@templates/product-list/ProductListView';
import { notFound, redirect } from 'next/navigation';
import { getServerState } from 'react-instantsearch-hooks-server';
import {
   hasDisableCacheGetsWrapper,
   ifixitOriginFromHostWrapper,
} from '../helpers';

export type PageProps = {
   params: { handle: string };
   searchParams: Record<string, string>;
};

export default async function Page({ params, searchParams }: PageProps) {
   const pageProps = await getPageProps({
      params,
      searchParams,
      productListType: ProductListType.AllParts,
   });
   const { productList } = pageProps;

   return (
      <>
         <ServerSidePropsProvider props={pageProps}>
            <AppProviders {...pageProps.appProps}>
               <DefaultLayout {...pageProps.layoutProps}>
                  <InstantSearchProvider {...pageProps.appProps.algolia!}>
                     <ProductListView productList={productList} />
                  </InstantSearchProvider>
               </DefaultLayout>
            </AppProviders>
         </ServerSidePropsProvider>
      </>
   );
}

async function getPageProps({
   params,
   searchParams,
   productListType,
}: PageProps & {
   productListType: ProductListType;
}): Promise<ProductListTemplateProps> {
   const indexName = ALGOLIA_PRODUCT_INDEX_NAME;

   let layoutProps: DefaultLayoutProps | null = null;
   let productList: ProductList | null = null;

   const layoutPropsPromise: Promise<DefaultLayoutProps> =
      getLayoutServerSideProps({
         storeCode: DEFAULT_STORE_CODE,
      });

   let shouldRedirectToCanonical = false;
   let canonicalPath: string | null = null;
   const ifixitOrigin = ifixitOriginFromHostWrapper();
   const cacheOptions = { forceMiss: hasDisableCacheGetsWrapper(searchParams) };

   switch (productListType) {
      case ProductListType.AllParts: {
         const productListPromise = timeAsync('findProductList', () =>
            ProductListCache.get(
               {
                  filters: { handle: { eq: 'Parts' } },
                  ifixitOrigin,
               },
               cacheOptions
            )
         );
         [layoutProps, productList] = await Promise.all([
            layoutPropsPromise,
            productListPromise,
         ]);
         break;
      }
      case ProductListType.DeviceParts: {
         const [deviceHandle, itemTypeHandle, ...otherPathSegments] =
            getDevicePathSegments(params);

         invariant(
            typeof deviceHandle === 'string',
            'device handle is required'
         );

         const deviceTitle = destylizeDeviceTitle(deviceHandle);

         if (otherPathSegments.length > 0) {
            notFound();
         }

         const itemType = itemTypeHandle
            ? destylizeDeviceItemType(itemTypeHandle)
            : null;

         const productListPromise = timeAsync('findProductList', () =>
            ProductListCache.get(
               {
                  filters: {
                     deviceTitle: {
                        eqi: deviceTitle,
                     },
                  },
                  ifixitOrigin,
               },
               cacheOptions
            )
         );
         [layoutProps, productList] = await Promise.all([
            layoutPropsPromise,
            productListPromise,
         ]);

         shouldRedirectToCanonical =
            typeof productList?.deviceTitle === 'string' &&
            productList.deviceTitle !== deviceTitle;

         canonicalPath = getDeviceCanonicalPath(
            productList?.deviceTitle,
            itemType
         );

         break;
      }
      case ProductListType.AllTools: {
         const productListPromise = timeAsync('findProductList', () =>
            ProductListCache.get(
               { filters: { handle: { eq: 'Tools' } }, ifixitOrigin },
               cacheOptions
            )
         );
         [layoutProps, productList] = await Promise.all([
            layoutPropsPromise,
            productListPromise,
         ]);
         break;
      }
      case ProductListType.ToolsCategory: {
         const { handle } = params || {};
         invariant(
            typeof handle === 'string',
            'tools category handle is required'
         );

         const productListPromise = timeAsync('findProductList', () =>
            ProductListCache.get(
               {
                  filters: {
                     handle: { eqi: handle },
                     type: { in: ['marketing', 'tools'] },
                  },
                  ifixitOrigin,
               },
               cacheOptions
            )
         );
         [layoutProps, productList] = await Promise.all([
            layoutPropsPromise,
            productListPromise,
         ]);

         const isMarketing = productList?.type === ProductListType.Marketing;
         const isMiscapitalized =
            typeof productList?.handle === 'string' &&
            productList.handle !== handle;
         shouldRedirectToCanonical = isMiscapitalized || isMarketing;
         canonicalPath =
            typeof productList?.handle === 'string'
               ? isMarketing
                  ? `/Shop/${productList.handle}`
                  : `/Tools/${productList.handle}`
               : null;

         break;
      }
      case ProductListType.Marketing: {
         const { handle } = params || {};
         invariant(
            typeof handle === 'string',
            'shop category handle is required'
         );

         const productListPromise = await timeAsync('findProductList', () =>
            ProductListCache.get(
               {
                  filters: {
                     handle: { eqi: handle },
                     type: { eq: 'marketing' },
                  },
                  ifixitOrigin,
               },
               cacheOptions
            )
         );
         [layoutProps, productList] = await Promise.all([
            layoutPropsPromise,
            productListPromise,
         ]);
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

   if (layoutProps == null || productList == null) {
      notFound();
   }

   if (shouldRedirectToCanonical) {
      invariant(canonicalPath != null, 'canonical path is required');
      redirect(canonicalPath);
   }

   const appProps: AppProvidersProps = {
      algolia: {
         indexName,
         // TODO: fix
         serverUrl: `${ifixitOrigin}/Parts`,
         apiKey: productList.algolia.apiKey,
         logContextName: 'algolia.getServerState',
      },
      ifixitOrigin,
   };

   const { serverState, adminMessage } = await getSafeServerState({
      appProps,
      productList,
   });

   const pageProps: ProductListTemplateProps = {
      productList,
      layoutProps: layoutProps,
      appProps: {
         ...appProps,
         ...(adminMessage ? { adminMessage } : {}),
         algolia: appProps.algolia
            ? {
                 ...appProps.algolia,
                 serverState,
              }
            : undefined,
      },
   };

   return pageProps;
}

// export async function generateMetadata({
//    params,
//    searchParams,
// }: PageProps): Promise<Metadata> {
//    const { handle } = params;
//    invariant(typeof handle === 'string', 'handle param is missing');

//    const ifixitOrigin = ifixitOriginFromHostWrapper();

//    const product = await Product.get(
//       {
//          handle,
//          storeCode: DEFAULT_STORE_CODE,
//          ifixitOrigin,
//       },
//       { forceMiss: hasDisableCacheGetsWrapper(searchParams) }
//    );

//    if (product == null) {
//       notFound();
//    }

//    const {
//       metaTitle,
//       shortDescription,
//       canonicalUrl,
//       genericImages,
//       selectedVariantImages,
//       shouldNoIndex,
//       proOnly,
//    } = createMetadataSupport({ params, searchParams, product });

//    return {
//       metadataBase: new URL(ifixitOrigin),
//       alternates: {
//          canonical: canonicalUrl,
//          languages:
//             product.enabledDomains?.reduce((acc, store) => {
//                store.locales.forEach((locale) => {
//                   acc[locale] = `${store.domain}/products/${product.handle}`;
//                });
//                return acc;
//             }, {} as Record<string, string>) ?? {},
//       },
//       ...(metaTitle && { title: metaTitle }),
//       ...(shortDescription && { description: shortDescription }),
//       ...(proOnly && { robots: 'noindex, follow' }),
//       ...(shouldNoIndex && { robots: 'noindex,nofollow' }),
//       openGraph: {
//          type: 'website',
//          url: canonicalUrl,
//          images: [...genericImages, ...selectedVariantImages].map(
//             (image) => image.url
//          ),
//          ...(metaTitle && { title: metaTitle }),
//          ...(shortDescription && { description: shortDescription }),
//       },
//    };
// }

type GetSafeServerStateProps = {
   appProps: AppProvidersProps;
   productList: ProductList;
};

async function getSafeServerState({
   appProps,
   productList,
}: GetSafeServerStateProps) {
   const tryGetServerState = (productList: ProductList) => {
      const appMarkup = (
         <AppProviders {...appProps}>
            <InstantSearchProvider {...appProps.algolia!}>
               <ProductListView productList={productList} algoliaSSR={true} />
            </InstantSearchProvider>
         </AppProviders>
      );
      return timeAsync(
         'getServerState',
         () => getServerState(appMarkup, {})
         //  getServerState(appMarkup, { renderToString })
      );
   };
   try {
      return { serverState: await tryGetServerState(productList) };
   } catch (e) {
      console.error('Error getting instantsearch server state', e);
      const serverState = await tryGetServerState({
         ...productList,
         filters: null,
      });
      return {
         serverState,
         adminMessage:
            'Failed to perform algolia search, possible error in filters, check strapi',
      };
   }
}

function getDevicePathSegments(params: { handle?: string }) {
   const { handle } = params || {};
   if (Array.isArray(handle)) {
      return handle;
   }
   return [];
}

function getDeviceCanonicalPath(
   deviceTitle: string | null | undefined,
   itemType: string | null
) {
   if (deviceTitle == null) {
      return null;
   }
   const slug = itemType
      ? `/${encodeURIComponent(stylizeDeviceItemType(itemType))}`
      : '';
   const canonicalDeviceHandle = encodeURIComponent(
      stylizeDeviceTitle(deviceTitle)
   );
   return `/Parts/${canonicalDeviceHandle}${slug}`;
}
