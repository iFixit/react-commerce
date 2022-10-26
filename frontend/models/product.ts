import { IFIXIT_ORIGIN, DEFAULT_STORE_CODE } from '@config/env';
import { filterNullableItems } from '@helpers/application-helpers';
import {
   computeDiscountPercentage,
   formatMoney,
   invariant,
   isRecord,
   Money,
} from '@ifixit/helpers';
import {
   FindProductQuery,
   getShopifyStorefrontSdk,
   ProductVariantCardFragment,
   ShopCredentials,
} from '@lib/shopify-storefront-sdk';
import { z } from 'zod';

export type Product = NonNullable<Awaited<ReturnType<typeof findProduct>>>;
export type ProductVariant = ReturnType<typeof getVariants>[0];
export type ProductImage = ReturnType<typeof getFormattedImages>[0];

export async function findProduct(shop: ShopCredentials, handle: string) {
   const storefront = getShopifyStorefrontSdk(shop);

   const response = await storefront.findProduct({
      handle,
   });
   if (response.product == null) {
      return null;
   }
   const variants = getVariants(response.product);
   const activeVariants = variants.filter(isActiveVariant);

   if (activeVariants.length === 0) {
      return null;
   }

   const allImages = getFormattedImages(response.product);
   const activeImages = allImages.filter((image) =>
      isActiveImage(image, activeVariants)
   );
   const options = getOptions(response.product.options, activeVariants);

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
   let breadcrumbs = parseBreadcrumbsMetafieldValue(
      response.product.breadcrumbs?.value
   );
   breadcrumbs = breadcrumbsWithCurrentProductPage(
      breadcrumbs,
      response.product.title
   );

   return {
      ...response.product,
      breadcrumbs,
      iFixitProductId,
      images: activeImages,
      options,
      variants: activeVariants,
      prop65WarningType: response.product.prop65WarningType?.value ?? null,
      prop65Chemicals: response.product.prop65Chemicals?.value ?? null,
      productVideos: response.product.productVideos?.value ?? null,
      faqs: parseFaqs(response.product.faqs?.value),
      replacementGuides: parseReplacementGuides(
         response.product.replacementGuides?.value
      ),
      featuredProductVariants: getFeaturedProductVariants(response.product),
      compatibility: parseCompatibility(response.product.compatibility?.value),
      metaTitle: response.product.metaTitle?.value ?? null,
      shortDescription: response.product.shortDescription?.value ?? null,
      reviewsData,
   };
}

type ShopifyApiProduct = NonNullable<FindProductQuery['product']>;

function getVariants(shopifyProduct: ShopifyApiProduct) {
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
         image: variant.image
            ? formatImage(variant.image, shopifyProduct)
            : null,
         proPricesByTier: parsePriceTiersMetafieldValue(
            variant.proPricesByTier?.value,
            variant.price.currencyCode
         ),
         isDiscounted,
         discountPercentage,
         kitContents: variant.kitContents?.value ?? null,
         note: variant.note?.value ?? null,
         disclaimer: variant.disclaimer?.value ?? null,
         warning: variant.warning?.value ?? null,
         specifications: variant.specifications?.value ?? null,
         warranty: variant.warranty?.value ?? null,
         crossSellVariants: getCrossSellVariants(variant),
         enabled: variant.enabled?.value === 'true',
         disableWhenOOS: variant.disableWhenOOS?.value === 'true',
         shippingRestrictions: parseShippingRestrictions(
            variant.shippingRestrictions?.value
         ),
      };
   });
}

function getFormattedImages(product: ShopifyApiProduct) {
   return product.images.nodes.map((image) => {
      return formatImage(image, product);
   });
}

type ShopifyApiImage = ShopifyApiProduct['images']['nodes'][0];

function formatImage(image: ShopifyApiImage, product: ShopifyApiProduct) {
   const linkedVariant = product.variants.nodes.find(
      (variant) => variant.sku === image.altText
   );
   let altText = product.title;
   if (linkedVariant != null) {
      altText += ` ${linkedVariant.title.replace(/\s*\/\s*/g, ' ')}`;
   }
   return { ...image, altText, variantId: linkedVariant?.id ?? null };
}

function isActiveImage(image: ProductImage, activeVariants: ProductVariant[]) {
   return (
      image.variantId == null ||
      activeVariants.some((variant) => variant.id === image.variantId)
   );
}

function isActiveVariant(variant: ProductVariant) {
   const quantityAvailable = variant.quantityAvailable ?? 0;
   return variant.enabled && (!variant.disableWhenOOS || quantityAvailable > 0);
}

function getOptions(
   shopifyOptions: NonNullable<FindProductQuery['product']>['options'],
   activeVariants: ReturnType<typeof getVariants>
) {
   return shopifyOptions.map((option) => ({
      ...option,
      values: option.values.filter((value) =>
         activeVariants.find((variant) =>
            variant.selectedOptions.find(
               (selectedOption) =>
                  selectedOption.name === option.name &&
                  selectedOption.value === value
            )
         )
      ),
   }));
}

function getCrossSellVariants(
   variant: NonNullable<FindProductQuery['product']>['variants']['nodes'][0]
) {
   const products =
      variant.crossSell?.references?.nodes.map((node) => {
         if (node.__typename !== 'ProductVariant') {
            return null;
         }
         const variant = getProductVariantCard(node);
         const quantity = variant.quantityAvailable ?? 0;

         if (quantity > 0 && variant.enabled) {
            return variant;
         }
         return null;
      }) ?? [];
   return filterNullableItems(products);
}

function getFeaturedProductVariants(
   shopifyProduct: NonNullable<FindProductQuery['product']>
) {
   const variants =
      shopifyProduct.featuredProductVariants?.references?.nodes.map((node) => {
         if (node.__typename !== 'ProductVariant') {
            return null;
         }
         return getProductVariantCard(node);
      }) ?? [];
   return filterNullableItems(variants);
}

function getProductVariantCard(fragment: ProductVariantCardFragment) {
   return {
      ...fragment,
      product: {
         ...fragment.product,
         rating: parseRatingMetafieldValue(fragment.product.rating?.value),
         reviewsCount: parseNumericMetafieldValue(
            fragment.product.reviewsCount?.value
         ),
         oemPartnership: fragment.product.oemPartnership?.value ?? null,
      },
      warranty: fragment.warranty?.value ?? null,
      formattedPrice: formatMoney(fragment.price),
      formattedCompareAtPrice: fragment.compareAtPrice
         ? formatMoney(fragment.compareAtPrice)
         : null,
      proPricesByTier: parsePriceTiersMetafieldValue(
         fragment.proPricesByTier?.value,
         fragment.price.currencyCode
      ),
      enabled: fragment.enabled?.value === 'true',
   };
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

type Breadcrumbs = z.infer<typeof BreadcrumbsSchema>;

const BreadcrumbsSchema = z.array(
   z.object({
      label: z.string(),
      url: z.string(),
   })
);

function parseBreadcrumbsMetafieldValue(
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

function breadcrumbsWithCurrentProductPage(
   breadcrumbs: Breadcrumbs | null,
   productTitle: string
) {
   if (breadcrumbs == null) {
      return null;
   }
   if (breadcrumbs.length > 0) {
      const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
      if (lastBreadcrumb.label.toLowerCase() !== productTitle.toLowerCase()) {
         return breadcrumbs.concat([
            {
               label: productTitle,
               url: '#',
            },
         ]);
      }
   }
   return breadcrumbs;
}

type ReplacementGuideMetafieldItem = z.infer<
   typeof ReplacementGuideMetafieldItemSchema
>;

const ReplacementGuideMetafieldItemSchema = z.object({
   id: z.string(),
   title: z.string(),
   guide_url: z.string(),
   image_url: z.string().optional().nullable(),
   summary: z.preprocess(
      (val) => (typeof val === 'string' ? val : null),
      z.string().optional().nullable()
   ),
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

type CompatibilityMetafield = z.infer<typeof CompatibilityMetafieldSchema>;

const CompatibilityMetafieldSchema = z
   .object({
      devices: z.array(
         z.object({
            imageUrl: z.string(),
            deviceUrl: z.string(),
            deviceName: z.string(),
            variants: z.array(z.string()),
         })
      ),
      hasMoreDevices: z.boolean(),
   })
   .optional()
   .nullable();

function parseCompatibility(
   value: string | null | undefined
): CompatibilityMetafield {
   if (value == null) {
      return null;
   }
   const rawJson = JSON.parse(value);
   if (rawJson == null) {
      return null;
   }
   const result = CompatibilityMetafieldSchema.safeParse(rawJson);
   if (result.success) {
      return result.data;
   }
   const errors = result.error.flatten();
   console.error(
      `Failed to parse compatibility metafield:\n ${JSON.stringify(
         errors.fieldErrors,
         null,
         2
      )}`
   );
   return null;
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

export type ProductReview = Partial<{
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

export type ReviewAuthor = {
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

const PriceTiersMetafieldSchema = z.record(z.number());

function parsePriceTiersMetafieldValue(
   value: string | null | undefined,
   currencyCode: string
) {
   if (value == null) {
      return null;
   }
   const json: unknown = JSON.parse(value);
   if (json == null) {
      return null;
   }
   const result = PriceTiersMetafieldSchema.safeParse(json);
   if (result.success) {
      return Object.keys(result.data).reduce((acc, key) => {
         const amount = result.data[key];
         return {
            ...acc,
            [key]: {
               amount,
               currencyCode,
            },
         };
      }, {} as Record<string, Money>);
   }
   const errors = result.error.flatten();
   console.error(
      `Failed to parse price tiers metafield:\n ${JSON.stringify(
         errors.fieldErrors,
         null,
         2
      )}`
   );
   return null;
}

const ShippingRestrictionsMetafieldSchema = z.array(z.string());

function parseShippingRestrictions(value: string | null | undefined) {
   if (value == null) {
      return null;
   }
   const json: unknown = JSON.parse(value);
   if (json == null) {
      return null;
   }
   const result = ShippingRestrictionsMetafieldSchema.safeParse(json);
   if (result.success) {
      return result.data;
   }
   const errors = result.error.flatten();
   console.error(
      `Failed to parse shipping restrictions metafield:\n ${JSON.stringify(
         errors.fieldErrors,
         null,
         2
      )}`
   );
   return null;
}
