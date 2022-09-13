import { IFIXIT_ORIGIN } from '@config/env';
import { filterNullableItems, invariant } from '@helpers/application-helpers';
import { computeDiscountPercentage } from '@helpers/commerce-helpers';
import { isRecord } from '@ifixit/helpers';
import {
   ShopCredentials,
   getShopifyStorefrontSdk,
   MoneyV2,
   CurrencyCode,
} from '@lib/shopify-storefront-sdk';
import { z } from 'zod';

export async function findProduct(shop: ShopCredentials, handle: string) {
   const storefront = getShopifyStorefrontSdk(shop);

   const response = await storefront.findProduct({
      handle,
   });
   if (response.product == null) {
      return null;
   }
   const variants = response.product.variants.nodes.map((variant) => {
      const isDiscounted =
         variant.compareAtPriceV2 != null &&
         parseFloat(variant.compareAtPriceV2.amount) >
            parseFloat(variant.priceV2.amount);
      const discountPercentage = isDiscounted
         ? computeDiscountPercentage(
              parseFloat(variant.priceV2.amount) * 100,
              parseFloat(variant.compareAtPriceV2!.amount) * 100
           )
         : 0;

      return {
         ...variant,
         isDiscounted,
         discountPercentage,
         formattedPrice: formatPrice(variant.priceV2),
         formattedCompareAtPrice: variant.compareAtPriceV2
            ? formatPrice(variant.compareAtPriceV2)
            : null,
         kitContents: variant.kitContents?.value ?? null,
         note: variant.note?.value ?? null,
         disclaimer: variant.disclaimer?.value ?? null,
         warning: variant.warning?.value ?? null,
         specifications: variant.specifications?.value ?? null,
         warranty: variant.warranty?.value ?? null,
      };
   });
   const variantSku = variants.find((variant) => variant.sku != null)?.sku;
   if (variantSku == null) {
      console.warn(`No sku found for product "${handle}"`);
      return null;
   }
   const iFixitProductId = computeIFixitProductId(variantSku);
   const reviewsData = await fetchProductReviews(
      IFIXIT_ORIGIN,
      iFixitProductId
   );

   return {
      ...response.product,
      iFixitProductId,
      variants,
      images: response.product.images.nodes,
      prop65WarningType: response.product.prop65WarningType?.value ?? null,
      prop65Chemicals: response.product.prop65Chemicals?.value ?? null,
      productVideos: response.product.productVideos?.value ?? null,
      faqs: parseFaqs(response.product.faqs?.value),
      replacementGuides: parseReplacementGuides(
         response.product.replacementGuides?.value
      ),
      reviewsData,
   };
}

export type Product = NonNullable<Awaited<ReturnType<typeof findProduct>>>;

export type ProductVariant = Product['variants'][0];

function formatPrice(money: MoneyV2) {
   switch (money.currencyCode) {
      case CurrencyCode.Usd: {
         return `$${money.amount}`;
      }
      default: {
         return `${money.amount} ${money.currencyCode}`;
      }
   }
}

function parseFaqs(value: string | null | undefined) {
   if (value == null) {
      return [];
   }
   const faqs = JSON.parse(value);
   if (!Array.isArray(faqs)) {
      return [];
   }
   return filterNullableItems(
      faqs.map((faq) => {
         const question = faq?.question;
         const answer = faq?.answer;
         if (typeof question !== 'string' || typeof answer !== 'string') {
            return null;
         }
         return {
            question,
            answer,
         };
      })
   );
}

type ReplacementGuideMetafieldItem = z.infer<
   typeof ReplacementGuideMetafieldItemSchema
>;

const ReplacementGuideMetafieldItemSchema = z.object({
   id: z.string(),
   title: z.string(),
   guide_url: z.string(),
   image_url: z.string().optional().nullable(),
   summary: z.string().optional().nullable(),
   difficulty: z.string().optional().nullable(),
   time_required: z.string().optional().nullable(),
});

function parseReplacementGuides(
   value: string | null | undefined
): ReplacementGuideMetafieldItem[] {
   if (value == null) {
      return [];
   }
   const rawJson = JSON.parse(value);
   if (rawJson == null) {
      return [];
   }
   const guides = Object.keys(rawJson).map((id) => {
      const item = rawJson[id];
      const result = ReplacementGuideMetafieldItemSchema.safeParse({
         id,
         ...item,
      });
      if (result.success) {
         return result.data;
      }
      const errors = result.error.flatten();
      console.error(
         `Failed to parse replacement guide:\n ${JSON.stringify(
            errors.fieldErrors,
            null,
            2
         )}`
      );
      return null;
   });
   return filterNullableItems(guides);
}

function computeIFixitProductId(variantSku: string) {
   return variantSku.split('-').slice(0, 2).join('-');
}

// Product review api

export type ProductReviewData = Partial<{
   average: number;
   count: number;
   groupedReviews: Record<string, number>;
   reviews: ProductReview[];
}>;

type ProductReview = Partial<{
   author: Partial<ReviewAuthor>;
   body: string;
   created_date: number;
   date: string;
   headline: null | string;
   langid: 'en';
   modified_date: number;
   productName: string;
   productVariantName: string;
   rating: number;
   reviewid: number;
}>;

type ReviewAuthor = {
   userid: number;
   name: string;
   avatar: string;
   url: string;
   canEdit: boolean;
};

export async function fetchProductReviews(
   apiOrigin: string,
   productId: string
): Promise<ProductReviewData | null> {
   const response = await fetch(
      `${apiOrigin}/api/2.0/reviews/${productId}?storeCode=us`,
      {
         headers: {
            'Content-Type': 'application/json',
         },
      }
   );

   if (response.ok) {
      const payload = await response.json();
      invariant(isRecord(payload), 'unexpected api response');
      return payload;
   }

   if (response.status === 401) {
      return null;
   }
   throw new Error(response.statusText);
}
