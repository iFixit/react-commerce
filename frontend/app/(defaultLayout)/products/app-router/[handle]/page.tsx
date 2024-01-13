import { DEFAULT_STORE_CODE, IFIXIT_ORIGIN } from '@config/env';
import { flags } from '@config/flags';
import { invariant } from '@ifixit/helpers';
import Product, {
   type Product as ProductType,
} from '@pages/api/nextjs/cache/product';
import { devSandboxOrigin, shouldSkipCache } from 'app/_helpers/app-helpers';
import { defaultVariantId, imagesFor } from 'app/_helpers/product-helpers';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
   ProductBreadcrumbsJsonLDScript,
   ProductJsonLDScript,
} from './json-ld-scripts';

export interface ProductPageProps {
   params: {
      handle: string;
   };
   searchParams: {
      disableCacheGets?: string | string[] | undefined;
      variant?: string;
   };
}

export default async function ProductPage({
   params,
   searchParams,
}: ProductPageProps) {
   if (!flags.APP_ROUTER_PRODUCT_PAGE_ENABLED) notFound();

   const data = await Product.get(
      {
         handle: params.handle,
         storeCode: DEFAULT_STORE_CODE,
         ifixitOrigin: devSandboxOrigin() ?? IFIXIT_ORIGIN,
      },
      { forceMiss: shouldSkipCache(searchParams) }
   );

   if (data == null) notFound();

   if (data.__typename === 'ProductRedirect') redirect(data.target);

   return (
      <>
         <ProductBreadcrumbsJsonLDScript product={data} />
         <ProductJsonLDScript
            product={data}
            selectedVariantId={selectedVariantId(data, searchParams)}
         />
         <div>Product: {data.title}</div>
      </>
   );
}

export async function generateMetadata({
   params,
   searchParams,
}: ProductPageProps): Promise<Metadata> {
   const product = await Product.get(
      {
         handle: params.handle,
         storeCode: DEFAULT_STORE_CODE,
         ifixitOrigin: devSandboxOrigin() ?? IFIXIT_ORIGIN,
      },
      { forceMiss: shouldSkipCache(searchParams) }
   );

   if (product == null || product.__typename !== 'Product') return {};

   return {
      title: product.metaTitle,
      description: product.shortDescription,
      openGraph: {
         title: product.metaTitle ?? undefined,
         description: product.shortDescription ?? undefined,
         type: 'website',
         url: productCanonicalUrl(),
         images: productImages().map((image) => ({ url: image.url })),
      },
      robots: shouldBlockCrawlers()
         ? { follow: false, index: false }
         : undefined,
      alternates: {
         canonical: shouldBlockCrawlers() ? undefined : productCanonicalUrl(),
         languages: alternateLanguages(),
      },
   };

   function alternateLanguages(): Record<string, string> {
      invariant(product?.__typename === 'Product');
      const result: Record<string, string> = {};
      if (product.enabledDomains) {
         for (const store of product.enabledDomains) {
            for (const locale of store.locales) {
               result[locale] = `${store.domain}/products/${product.handle}`;
            }
         }
      }
      return result;
   }

   function productCanonicalUrl(): string {
      invariant(product?.__typename === 'Product');
      return `${IFIXIT_ORIGIN}/products/${product.handle}`;
   }

   function shouldBlockCrawlers() {
      invariant(product?.__typename === 'Product');
      return isOnlyForPros() || !product.isEnabled || product.noindex;
   }

   function isOnlyForPros() {
      invariant(product?.__typename === 'Product');
      return product.tags.find((tag: string) => tag === 'Pro Only') != null;
   }

   function productImages() {
      invariant(product?.__typename === 'Product');
      return imagesFor(product, selectedVariantId(product, searchParams));
   }
}

function selectedVariantId(
   product: ProductType,
   searchParams: ProductPageProps['searchParams']
) {
   return searchParams.variant ?? defaultVariantId(product);
}
