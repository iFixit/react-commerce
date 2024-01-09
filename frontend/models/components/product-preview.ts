import {
   ALGOLIA_API_KEY,
   ALGOLIA_APP_ID,
   ALGOLIA_PRODUCT_INDEX_NAME,
} from '@config/env';
import { filterFalsyItems } from '@helpers/application-helpers';
import { printZodError } from '@helpers/zod-helpers';
import { getItemCodeFromSku, isLifetimeWarranty } from '@ifixit/helpers';
import type { ProductPreviewFieldsFragment } from '@lib/shopify-storefront-sdk';
import algoliasearch from 'algoliasearch/lite';
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
   variantTitle: z.string().nullable(),
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
   shopifyVariantId: z.string().nullable(),
   categories: z.array(z.string()).nullable(),
});

export function productPreviewFromAlgoliaHit(hit: any): ProductPreview | null {
   const validation = AlgoliaProductHitSchema.safeParse(hit);
   if (!validation.success) {
      const hitId = hit.objectID;
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
      sku: getItemCodeFromSku(product.productcode.toString()),
      title: product.title,
      variantTitle: null,
      image: imageFromUrl(product.image_url),
      price: moneyFromAmount(product.price_float, 'USD'),
      compareAtPrice: moneyFromAmount(product.compare_at_price, 'USD'),
      proPricesByTier: proPriceTiersFromAlgoliaPriceTiers(product.price_tiers),
      isPro: product.is_pro === 1,
      reviews: productReviewsFromAlgoliaProductHit(product),
      oemPartnership: product.oem_partnership ?? null,
      hasLifetimeWarranty: product.lifetime_warranty ?? false,
      quantityAvailable: product.quantity_available ?? null,
      shopifyVariantId: null,
      categories: null,
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
      variantTitle: fields.title,
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
      shopifyVariantId: fields.id,
      categories: getCategoriesFromTags(fields.product.tags) || null,
   };
}

const getCategoriesFromTags = (tags: string[]): string[] => {
   const tagsObj: Record<string, string> = {};
   tags.forEach((tag) => {
      const [name, val] = tag.split('=');
      tagsObj[name] = val;
   });
   console.log('Tags: ', tagsObj);
   let firstCategory = tagsObj['Part Category'];
   let secondCategory = '';
   if (tagsObj['Is Tool'] === 'true') {
      secondCategory = tagsObj['Tool Category'];
   } else {
      secondCategory = tagsObj['Part SubCategory'];
   }

   if (secondCategory && !firstCategory) {
      firstCategory = 'N/A';
   }
   return [firstCategory, secondCategory].filter(Boolean);
};

interface GetProductPreviewsFromAlgoliaProps {
   query?: string;
   filters?: string;
   hitsPerPage: number;
}

export async function getProductPreviewsFromAlgolia({
   query = '',
   filters,
   hitsPerPage,
}: GetProductPreviewsFromAlgoliaProps) {
   const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
   const searchIndex = client.initIndex(ALGOLIA_PRODUCT_INDEX_NAME);

   const response = await searchIndex.search(query, {
      hitsPerPage,
      filters,
   });

   return filterFalsyItems(response.hits.map(productPreviewFromAlgoliaHit));
}
