import { useAppContext } from '@ifixit/app';
import { Product, ProductVariant } from '@models/product';
import Head from 'next/head';
import React from 'react';

export interface MetaTagsProps {
   product: Product;
   selectedVariant: ProductVariant;
}

export function MetaTags({ product, selectedVariant }: MetaTagsProps) {
   const appContext = useAppContext();
   const { metaTitle, shortDescription } = product;

   const canonicalUrl = `${appContext.ifixitOrigin}/products/${product.handle}`;

   const genericImages = React.useMemo(() => {
      return product.images.filter((image) => {
         return (
            image.altText == null ||
            !product.variants.find((variant) => variant.sku === image.altText)
         );
      });
   }, [product.images, product.variants]);

   const selectedVariantImages = React.useMemo(() => {
      return product.images.filter((image) => {
         const variant = product.variants.find(
            (variant) => variant.sku === image.altText
         );
         return image.altText != null && variant?.id === selectedVariant.id;
      });
   }, [product.images, product.variants, selectedVariant.id]);

   return (
      <Head>
         {metaTitle && (
            <>
               <title>{metaTitle}</title>
               <meta property="og:title" content={metaTitle} />
            </>
         )}
         {shortDescription && (
            <>
               <meta name="description" content={shortDescription} />
               <meta name="og:description" content={shortDescription} />
            </>
         )}

         <meta property="og:type" content="website" />

         <link rel="canonical" href={canonicalUrl} />
         <meta property="og:url" content={canonicalUrl} />

         {product.enabledDomains?.flatMap((store) => {
            const locales =
               store.locales || (store.locale ? [store.locale] : []);
            return locales.map((locale) => (
               <link
                  key={`${store.domain}-${locale}`}
                  rel="alternate"
                  hrefLang={locale}
                  href={`${store.domain}/products/${product.handle}`}
               />
            ));
         })}

         {genericImages.length > 0 &&
            genericImages.map((image) => (
               <meta key={image.id} property="og:image" content={image.url} />
            ))}

         {selectedVariantImages.length > 0 &&
            selectedVariantImages.map((image) => (
               <meta key={image.id} property="og:image" content={image.url} />
            ))}
      </Head>
   );
}
