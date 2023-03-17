import { printZodError } from '@helpers/zod-helpers';
import { isLifetimeWarranty } from '@ifixit/helpers';
import type { ProductPreviewFieldsFragment } from '@lib/shopify-storefront-sdk';
import { z } from 'zod';
import { AlgoliaProductHitSchema } from './algolia-product-hit';
import { imageFromShopify, imageFromUrl, ImageSchema } from './image';
import {
   getCurrencyCode,
   moneyFromAmount,
   moneyFromShopify,
   MoneySchema,
} from './money';
import {
   proPriceTiersFromAlgoliaPriceTiers,
   proPriceTiersFromPriceTiersMetafield,
   ProPriceTiersSchema,
} from './pro-price-tiers';
import {
   productReviewsFromAlgoliaProductHit,
   productReviewsFromMetafields,
   ProductReviewsSchema,
} from './product-reviews';

export type ProductPreview = z.infer<typeof ProductPreviewSchema>;

export const ProductPreviewSchema = z.object({
   id: z.string(),
   handle: z.string(),
   sku: z.string().nullable(),
   title: z.string(),
   image: ImageSchema.nullable(),
   price: MoneySchema,
   compareAtPrice: MoneySchema.nullable(),
   proPricesByTier: ProPriceTiersSchema.nullable(),
   isPro: z.boolean(),
   reviews: ProductReviewsSchema.nullable(),
   oemPartnership: z.string().nullable(),
   hasLifetimeWarranty: z.boolean(),
   quantityAvailable: z.number().nullable(),
   enabled: z.boolean().nullable().optional(),
});

export function productPreviewFromAlgoliaHit(
   hit: unknown
): ProductPreview | null {
   const validation = AlgoliaProductHitSchema.safeParse(hit);
   if (!validation.success) {
      const hitId = (hit as any)?.objectID;
      console.error(
         `Invalid Algolia product hit with object id "${hitId}":`,
         printZodError(validation.error)
      );
      return null;
   }
   const product = validation.data;
   return {
      id: String(product.productid),
      handle: product.handle,
      sku: null,
      title: product.title,
      image: imageFromUrl(product.image_url),
      price: moneyFromAmount(product.price_float, 'USD'),
      compareAtPrice: moneyFromAmount(product.compare_at_price, 'USD'),
      proPricesByTier: proPriceTiersFromAlgoliaPriceTiers(product.price_tiers),
      isPro: product.is_pro === 1,
      reviews: productReviewsFromAlgoliaProductHit(product),
      oemPartnership: product.oem_partnership ?? null,
      hasLifetimeWarranty: product.lifetime_warranty ?? false,
      quantityAvailable: product.quantity_available ?? null,
   };
}

export function productPreviewFromShopify(
   fields: ProductPreviewFieldsFragment
): ProductPreview | null {
   const price = moneyFromShopify(fields.price);
   if (price == null) return null;

   const currencyCode = getCurrencyCode(fields.price.currencyCode);

   return {
      id: fields.id,
      handle: fields.product.handle,
      sku: fields.sku ?? null,
      title: fields.product.title,
      image: imageFromShopify(fields.image),
      price,
      compareAtPrice: moneyFromShopify(fields.compareAtPrice),
      proPricesByTier:
         currencyCode == null
            ? null
            : proPriceTiersFromPriceTiersMetafield(
                 fields.proPricesByTier?.value,
                 currencyCode
              ),
      isPro: fields.product.tags.includes('Pro Only'),
      reviews: productReviewsFromMetafields(
         fields.product.rating?.value,
         fields.product.reviewsCount?.value
      ),
      oemPartnership: fields.product.oemPartnership?.value ?? null,
      hasLifetimeWarranty:
         typeof fields.warranty?.value === 'string' &&
         isLifetimeWarranty(fields.warranty.value),
      quantityAvailable: fields.quantityAvailable ?? null,
      enabled: fields.enabled?.value === 'true',
   };
}
