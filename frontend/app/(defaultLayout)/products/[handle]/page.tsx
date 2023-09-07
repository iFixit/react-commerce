import { DEFAULT_STORE_CODE } from '@config/env';
import {
   invariant,
   parseItemcode,
   shouldShowProductRating,
} from '@ifixit/helpers';
import { getLayoutServerSideProps } from '@layouts/default/server';
import { ServerSidePropsProvider } from '@lib/server-side-props';
import Product from '@pages/api/nextjs/cache/product';
import ProductTemplate from '@templates/product';
import { ProductTemplateProps } from '@templates/product/hooks/useProductTemplateProps';
import { ifixitOriginFromHostWrapper } from 'app/(defaultLayout)/helpers';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Script from 'next/script';
import { jsonLdScriptProps } from 'react-schemaorg';
import {
   BreadcrumbList as SchemaBreadcrumbList,
   Product as SchemaProduct,
} from 'schema-dts';
import {
   createLdJsonSupport,
   createMetadataSupport,
   hasDisableCacheGetsWrapper,
   identifyStoresWithProduct,
} from './helpers';

export type PageProps = {
   params: { handle: string };
   searchParams: Record<string, string>;
};

export default async function Page({ params, searchParams }: PageProps) {
   const pageProps = await getPageProps({ params, searchParams });
   const { product } = pageProps;
   const {
      ifixitOrigin,
      metaTitle,
      shortDescription,
      genericImages,
      selectedVariantImages,
      variant,
      selectedVariantUrl,
      itemCondition,
      availability,
      priceValidUntil,
   } = createLdJsonSupport({ params, searchParams }, pageProps.product);
   return (
      <>
         <ServerSidePropsProvider props={pageProps}>
            <ProductTemplate />
         </ServerSidePropsProvider>
         <Script
            {...jsonLdScriptProps<SchemaBreadcrumbList>({
               '@context': 'https://schema.org',
               '@type': 'BreadcrumbList',
               itemListElement:
                  product.breadcrumbs.map((item, index) => ({
                     '@type': 'ListItem',
                     position: index + 1,
                     name: item.label,
                     item:
                        item.url && item.url !== '#'
                           ? `${ifixitOrigin}${item.url}`
                           : undefined,
                  })) || undefined,
            })}
         />

         <Script
            {...jsonLdScriptProps<SchemaProduct>({
               '@context': 'https://schema.org',
               '@type': 'Product',
               name: metaTitle || undefined,
               url: selectedVariantUrl,
               aggregateRating: shouldShowProductRating(product.reviews)
                  ? {
                       '@type': 'AggregateRating',
                       ratingValue: product.reviews?.rating,
                       reviewCount: product.reviews?.count,
                    }
                  : undefined,
               brand: {
                  '@type': 'Brand',
                  name: product.vendor || 'iFixit',
               },
               description: shortDescription || '',
               image: [...genericImages, ...selectedVariantImages].map(
                  (image) => image.url
               ),
               mpn: variant.sku || undefined,
               offers: {
                  '@type': 'Offer',
                  url: selectedVariantUrl,
                  priceCurrency: variant.price.currencyCode,
                  price: variant.price.amount,
                  priceValidUntil: priceValidUntil.toISOString(),
                  itemCondition,
                  availability,
               },
               sku: parseItemcode(variant.sku || '').productcode,
            })}
         />
      </>
   );
}

async function getPageProps({
   params,
   searchParams,
}: PageProps): Promise<ProductTemplateProps> {
   const { handle } = params;
   invariant(typeof handle === 'string', 'handle param is missing');

   const ifixitOrigin = ifixitOriginFromHostWrapper();

   const layoutPropsPromise = getLayoutServerSideProps({
      storeCode: DEFAULT_STORE_CODE,
   });
   const productPromise = Product.get(
      {
         handle,
         storeCode: DEFAULT_STORE_CODE,
         ifixitOrigin,
      },
      { forceMiss: hasDisableCacheGetsWrapper(searchParams) }
   );

   const [{ stores, ...otherLayoutProps }, product] = await Promise.all([
      layoutPropsPromise,
      productPromise,
   ]);

   if (product == null) {
      notFound();
   }
   if (product.redirectUrl) {
      redirect(`${product.redirectUrl}?${searchParams.toString()}`);
   }

   const storesWithProductUrls = identifyStoresWithProduct(product, stores);

   const pageProps: ProductTemplateProps = {
      layoutProps: {
         ...otherLayoutProps,
         stores: storesWithProductUrls,
      },
      appProps: {
         ifixitOrigin,
      },
      product,
   };
   return pageProps;
}

export async function generateMetadata({
   params,
   searchParams,
}: PageProps): Promise<Metadata> {
   const { handle } = params;
   invariant(typeof handle === 'string', 'handle param is missing');

   const ifixitOrigin = ifixitOriginFromHostWrapper();

   const product = await Product.get(
      {
         handle,
         storeCode: DEFAULT_STORE_CODE,
         ifixitOrigin,
      },
      { forceMiss: hasDisableCacheGetsWrapper(searchParams) }
   );

   if (product == null) {
      notFound();
   }

   const {
      metaTitle,
      shortDescription,
      canonicalUrl,
      genericImages,
      selectedVariantImages,
      shouldNoIndex,
      proOnly,
   } = createMetadataSupport({ params, searchParams, product });

   return {
      metadataBase: new URL(ifixitOrigin),
      alternates: {
         canonical: canonicalUrl,
         languages:
            product.enabledDomains?.reduce((acc, store) => {
               store.locales.forEach((locale) => {
                  acc[locale] = `${store.domain}/products/${product.handle}`;
               });
               return acc;
            }, {} as Record<string, string>) ?? {},
      },
      ...(metaTitle && { title: metaTitle }),
      ...(shortDescription && { description: shortDescription }),
      ...(proOnly && { robots: 'noindex, follow' }),
      ...(shouldNoIndex && { robots: 'noindex,nofollow' }),
      openGraph: {
         type: 'website',
         url: canonicalUrl,
         images: [...genericImages, ...selectedVariantImages].map(
            (image) => image.url
         ),
         ...(metaTitle && { title: metaTitle }),
         ...(shortDescription && { description: shortDescription }),
      },
   };
}
