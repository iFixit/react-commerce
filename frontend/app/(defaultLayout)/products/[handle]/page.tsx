import { IFIXIT_ORIGIN } from '@config/env';
import { invariant } from '@ifixit/helpers';
import { type Product } from '@pages/api/nextjs/cache/product';
import ProductTemplate from '@templates/product';
import { findProduct, findProductRedirect } from 'app/_data/product';
import { shouldSkipCache } from 'app/_helpers/app-helpers';
import { defaultVariantFor, imagesFor } from 'app/_helpers/product-helpers';
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
   const productRedirect = await findProductRedirect({
      handle: params.handle,
      noCache: shouldSkipCache(searchParams),
   });

   if (productRedirect != null) redirect(productRedirect.target);

   const product = await findProduct({
      handle: params.handle,
      noCache: shouldSkipCache(searchParams),
   });

   if (product == null) notFound();

   return (
      <>
         <ProductBreadcrumbsJsonLDScript product={product} />
         <ProductJsonLDScript
            product={product}
            selectedVariantId={selectedVariantId(product, searchParams)}
         />
         <ProductTemplate product={product} />
      </>
   );
}

export async function generateMetadata({
   params,
   searchParams,
}: ProductPageProps): Promise<Metadata> {
   const product = await findProduct({
      handle: params.handle,
      noCache: shouldSkipCache(searchParams),
   });

   if (product == null) return {};

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
   product: Product,
   searchParams: ProductPageProps['searchParams']
) {
   return searchParams.variant ?? defaultVariantFor(product).id;
}
