import { useAppContext } from '@ifixit/app';
import {
   parseItemcode,
   shouldShowProductRating,
   getVariantIdFromVariantURI,
} from '@ifixit/helpers';
import type { Product, ProductVariant } from '@pages/api/nextjs/cache/product';
import Head from 'next/head';
import React from 'react';
import { jsonLdScriptProps } from 'react-schemaorg';
import {
   BreadcrumbList as SchemaBreadcrumbList,
   ItemAvailability as SchemaItemAvailability,
   OfferItemCondition as SchemaOfferItemCondition,
   Product as SchemaProduct,
} from 'schema-dts';
import { useDefaultVariantId } from './hooks/useSelectedVariant';
export interface MetaTagsProps {
   product: Product;
   selectedVariant: ProductVariant;
}

export function MetaTags({ product, selectedVariant }: MetaTagsProps) {
   const appContext = useAppContext();
   const defaultVariantId = useDefaultVariantId(product);
   const { metaTitle, shortDescription } = product;

   const canonicalUrl = `${appContext.ifixitOrigin}/products/${product.handle}`;
   const urlParams =
      selectedVariant.id !== defaultVariantId
         ? `?variant=${getVariantIdFromVariantURI(selectedVariant.id)}`
         : '';
   const selectedVariantUrl = `${appContext.ifixitOrigin}/products/${product.handle}${urlParams}`;

   const genericImages = React.useMemo(() => {
      return product.images.filter((image) => {
         return image.variantId === null;
      });
   }, [product.images]);

   const selectedVariantImages = React.useMemo(() => {
      return product.images.filter((image) => {
         return image.variantId === selectedVariant.id;
      });
   }, [product.images, selectedVariant.id]);

   const priceValidUntil = new Date();
   priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

   let itemCondition: SchemaOfferItemCondition | undefined;
   const conditionOption = selectedVariant.selectedOptions.find(
      (option) => option.name === 'Condition'
   );
   if (conditionOption?.value === 'New') {
      itemCondition = 'https://schema.org/NewCondition';
   } else if (conditionOption?.value === 'Refurbished') {
      itemCondition = 'https://schema.org/RefurbishedCondition';
   } else {
      // Group all the 'Used, A-Stock', 'As-is', etc, possible values under the UsedCondition umbrella
      itemCondition = 'https://schema.org/UsedCondition';
   }

   const availability: SchemaItemAvailability =
      selectedVariant.quantityAvailable && selectedVariant.quantityAvailable > 0
         ? 'https://schema.org/InStock'
         : 'https://schema.org/OutOfStock';

   const shouldNoIndex = !product.isEnabled || product.noindex;

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

         {shouldNoIndex ? (
            <meta name="robots" content="noindex,nofollow" />
         ) : (
            <link rel="canonical" href={canonicalUrl} />
         )}
         <meta property="og:url" content={canonicalUrl} />

         {product.enabledDomains?.flatMap((store) => {
            return store.locales.map((locale) => (
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

         <script
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
                           ? `${appContext.ifixitOrigin}${item.url}`
                           : undefined,
                  })) || undefined,
            })}
         />

         <script
            {...jsonLdScriptProps<SchemaProduct>({
               '@context': 'https://schema.org',
               '@type': 'Product',
               name: metaTitle || undefined,
               url: selectedVariantUrl,
               aggregateRating: shouldShowProductRating(product.reviews)
                  ? {
                       '@type': 'AggregateRating',
                       ratingValue: product.reviews.rating,
                       reviewCount: product.reviews.count,
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
               mpn: selectedVariant.sku || undefined,
               offers: {
                  '@type': 'Offer',
                  url: selectedVariantUrl,
                  priceCurrency: selectedVariant.price.currencyCode,
                  price: selectedVariant.price.amount,
                  priceValidUntil: priceValidUntil.toISOString(),
                  itemCondition,
                  availability,
               },
               sku: parseItemcode(selectedVariant.sku || '').productcode,
            })}
         />
      </Head>
   );
}
