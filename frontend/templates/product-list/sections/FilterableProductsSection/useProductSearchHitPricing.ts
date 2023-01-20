import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { computeDiscountPercentage, Money } from '@ifixit/helpers';
import { ProductSearchHit } from '@models/product-list';
import isEmpty from 'lodash/isEmpty';

export type ProductSearchHitPricing = {
   price: Money;
   compareAtPrice: Money | undefined;
   isDiscounted: boolean;
   percentage: number;
   proPricesByTier: Record<string, Money> | undefined;
};

export function useProductSearchHitPricing(
   product: ProductSearchHit
): ProductSearchHitPricing {
   const user = useAuthenticatedUser();

   let proTierPrice: number | null = null;
   const discountTier = user.data?.discountTier ?? null;
   if (discountTier) {
      const defaultVariantPrice =
         product.price_tiers?.[discountTier]?.default_variant_price;
      proTierPrice =
         defaultVariantPrice == null
            ? null
            : typeof defaultVariantPrice === 'string'
            ? parseFloat(defaultVariantPrice)
            : defaultVariantPrice;
   }

   const price = Math.min(proTierPrice ?? Infinity, product.price_float);
   const compareAtPrice = product.compare_at_price ?? product.price_float;

   const percentage = computeDiscountPercentage(
      price * 100,
      compareAtPrice * 100
   );
   const isDiscounted = percentage > 0;

   const proPricesByTier =
      product.price_tiers && !isEmpty(product.price_tiers)
         ? Object.entries(product.price_tiers).reduce((acc, [tier, price]) => {
              acc[tier] = {
                 amount: price.default_variant_price,
                 currencyCode: 'usd',
              };
              return acc;
           }, {} as Record<string, Money>)
         : undefined;

   return {
      price: { amount: price, currencyCode: 'usd' },
      compareAtPrice: { amount: compareAtPrice, currencyCode: 'usd' },
      isDiscounted,
      percentage,
      proPricesByTier,
   };
}
