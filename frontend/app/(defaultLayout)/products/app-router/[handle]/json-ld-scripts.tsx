import { IFIXIT_ORIGIN } from '@config/env';
import {
   invariant,
   parseItemcode,
   shouldShowProductRating,
} from '@ifixit/helpers';
import type { Product } from '@models/product';
import { defaultVariantIdFor, imagesFor } from 'app/_helpers/product-helpers';
import { jsonLdScriptProps } from 'react-schemaorg';
import type {
   BreadcrumbList as BreadcrumbListLDSchema,
   OfferItemCondition,
   Product as ProductLDSchema,
} from 'schema-dts';

interface ProductBreadCrumbsJsonLDScriptProps {
   product: Product;
}

export function ProductBreadcrumbsJsonLDScript({
   product,
}: ProductBreadCrumbsJsonLDScriptProps) {
   return (
      <script
         {...jsonLdScriptProps<BreadcrumbListLDSchema>({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement:
               product.breadcrumbs.map((item, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: item.label,
                  item:
                     item.url && item.url !== '#'
                        ? `${IFIXIT_ORIGIN}${item.url}`
                        : undefined,
               })) || undefined,
         })}
      />
   );
}

interface ProductJsonLDScriptProps {
   product: Product;
   selectedVariantId: string;
}

export function ProductJsonLDScript({
   product,
   selectedVariantId,
}: ProductJsonLDScriptProps) {
   const variant = variantFor(selectedVariantId);

   if (variant == null) return null;

   return (
      <script
         {...jsonLdScriptProps<ProductLDSchema>({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.metaTitle || undefined,
            url: variantUrl(),
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
            description: product.shortDescription || '',
            image: imagesFor(product, selectedVariantId).map(
               (image) => image.url
            ),
            mpn: variant.sku || undefined,
            offers: {
               '@type': 'Offer',
               url: variantUrl(),
               priceCurrency: variant.price.currencyCode,
               price: variant.price.amount,
               priceValidUntil: oneYearFromNow(),
               itemCondition: variantCondition(),
               availability:
                  variant.quantityAvailable && variant.quantityAvailable > 0
                     ? 'https://schema.org/InStock'
                     : 'https://schema.org/OutOfStock',
            },
            sku: parseItemcode(variant.sku || '').productcode,
         })}
      />
   );

   function variantFor(variantId: string) {
      return product.variants.find((variant) => variant.id === variantId);
   }

   function variantUrl() {
      let result = `${IFIXIT_ORIGIN}/products/${product.handle}`;
      if (selectedVariantId !== defaultVariantIdFor(product)) {
         result += `?variant=${selectedVariantId}`;
      }
      return result;
   }

   function oneYearFromNow() {
      const result = new Date();
      result.setFullYear(result.getFullYear() + 1);
      return result.toISOString();
   }

   function variantCondition(): OfferItemCondition {
      invariant(variant);

      const conditionOption = variant.selectedOptions.find(
         (option) => option.name === 'Condition'
      );

      switch (conditionOption?.value) {
         case 'New':
            return 'https://schema.org/NewCondition';
         case 'Refurbished':
            return 'https://schema.org/RefurbishedCondition';
         default:
            return 'https://schema.org/UsedCondition';
      }
   }
}
