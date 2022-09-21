import { IFIXIT_ORIGIN, DEFAULT_STORE_CODE } from '@config/env';
import { filterNullableItems, invariant } from '@helpers/application-helpers';
import { formatShopifyPrice } from '@helpers/commerce-helpers';
import { computeDiscountPercentage } from '@helpers/commerce-helpers';
import { isRecord } from '@ifixit/helpers';
import {
   FindProductQuery,
   getShopifyStorefrontSdk,
   ShopCredentials,
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
   const variants = getVariants(response.product);
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
      breadcrumbs: parseBreadcrumbs(response.product.breadcrumbs?.value),
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

function getVariants(shopifyProduct: NonNullable<FindProductQuery['product']>) {
   return shopifyProduct.variants.nodes.map((variant) => {
      const { crossSell, ...other } = variant;
      const isDiscounted =
         variant.compareAtPrice != null &&
         parseFloat(variant.compareAtPrice.amount) >
            parseFloat(variant.price.amount);
      const discountPercentage = isDiscounted
         ? computeDiscountPercentage(
              parseFloat(variant.price.amount) * 100,
              parseFloat(variant.compareAtPrice!.amount) * 100
           )
         : 0;
      return {
         ...other,
         isDiscounted,
         discountPercentage,
         formattedPrice: formatShopifyPrice(variant.price),
         formattedCompareAtPrice: variant.compareAtPrice
            ? formatShopifyPrice(variant.compareAtPrice)
            : null,
         kitContents: variant.kitContents?.value ?? null,
         note: variant.note?.value ?? null,
         disclaimer: variant.disclaimer?.value ?? null,
         warning: variant.warning?.value ?? null,
         specifications: variant.specifications?.value ?? null,
         warranty: variant.warranty?.value ?? null,
         crossSellVariants: getCrossSellVariants(variant),
      };
   });
}

function getCrossSellVariants(
   variant: NonNullable<FindProductQuery['product']>['variants']['nodes'][0]
) {
   const products =
      variant.crossSell?.references?.nodes.map((node) => {
         if (node.__typename !== 'ProductVariant') {
            return null;
         }
         return {
            ...node,
            product: {
               ...node.product,
               rating: parseRatingMetafieldValue(node.product.rating?.value),
               reviewsCount: parseNumericMetafieldValue(
                  node.product.reviewsCount?.value
               ),
            },
            formattedPrice: formatShopifyPrice(node.price),
            formattedCompareAtPrice: node.compareAtPrice
               ? formatShopifyPrice(node.compareAtPrice)
               : null,
         };
      }) ?? [];
   return filterNullableItems(products);
}

export type Product = NonNullable<Awaited<ReturnType<typeof findProduct>>>;

export type ProductVariant = Product['variants'][0];

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

type Breadcrumbs = z.infer<typeof BreadcrumbsSchema>;

const BreadcrumbsSchema = z.array(
   z.object({
      label: z.string(),
      url: z.string(),
   })
);

function parseBreadcrumbs(
   value: string | null | undefined
): Breadcrumbs | null {
   if (typeof value !== 'string') {
      return null;
   }
   const json = JSON.parse(value);
   const parsedValue = BreadcrumbsSchema.safeParse(json);
   if (parsedValue.success) {
      return parsedValue.data;
   }
   return null;
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
      // TODO: get store code from user session or fall back to default
      `${apiOrigin}/api/2.0/reviews/${productId}?storeCode=${DEFAULT_STORE_CODE}`,
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

function parseRatingMetafieldValue(value: string | null | undefined) {
   if (value == null) {
      return null;
   }
   const rating = JSON.parse(value);
   return rating.value != null ? parseFloat(rating.value) : null;
}

function parseNumericMetafieldValue(value: string | null | undefined) {
   if (value == null) {
      return null;
   }
   return value != null ? parseFloat(value) : null;
}
