import { filterFalsyItems } from '@helpers/application-helpers';
import { parseItemcode } from '@ifixit/helpers';
import type { FindProductQuery as ShopifyFindProductQuery } from '@lib/shopify-storefront-sdk';
import type { FindProductQuery as StrapiFindProductQuery } from '@lib/strapi-sdk';
import {
   appendCurrentPageBreadcrumb,
   BreadcrumbSchema,
   breadcrumbsFromMetafield,
   isCurrentPageBreadcrumbMissing,
} from '@models/components/breadcrumb';
import { ProductPreviewSchema } from '@models/components/product-preview';
import {
   productReviewsFromMetafields,
   ProductReviewsSchema,
} from '@models/components/product-reviews';
import { z } from 'zod';
import {
   productDeviceCompatibilityFromMetafield,
   ProductDeviceCompatibilitySchema,
} from './components/product-device-compatibility';
import {
   ProductEnabledDomainSchema,
   productEnabledDomainsFromMetafield,
} from './components/product-enabled-domains';
import {
   productOemPartnershipFromMetafield,
   ProductOemPartnershipSchema,
} from './components/product-oem-partnership';
import {
   productOptionFromShopify,
   ProductOptionSchema,
} from './components/product-option';
import {
   getAllCrossSellProductVariant,
   getProductVariantImage,
   isActiveVariant,
   ProductVariant,
   ProductVariantImage,
   ProductVariantImageSchema,
   ProductVariantSchema,
   variantsFromQueryProduct,
} from './components/product-variant';
import {
   productVideoFromMetafield,
   ProductVideosSchema,
} from './components/product-video';
import { getProductSections, ProductSectionSchema } from './sections';
import { ProductDataApiResponse } from '@lib/ifixit-api/productData';

export type {
   ProductVariant,
   ProductVariantImage,
} from './components/product-variant';

export type Product = z.infer<typeof ProductSchema>;

export const ProductSchema = z.object({
   id: z.string(),
   handle: z.string(),
   title: z.string(),
   noindex: z.boolean(),
   breadcrumbs: z.array(BreadcrumbSchema),
   descriptionHtml: z.string(),
   iFixitProductId: z.string(),
   productcode: z.string().optional(),
   tags: z.array(z.string()),
   images: z.array(ProductVariantImageSchema),
   options: z.array(ProductOptionSchema),
   variants: z.array(ProductVariantSchema),
   isEnabled: z.boolean(),
   prop65WarningType: z.string().nullable(),
   prop65Chemicals: z.string().nullable(),
   productVideos: z.string().nullable(),
   productVideosJson: ProductVideosSchema.nullable(),
   compatibility: ProductDeviceCompatibilitySchema.nullable(),
   compatibilityNotes: z.array(z.string()).nullable(),
   metaTitle: z.string().nullable(),
   shortDescription: z.string().nullable(),
   reviews: ProductReviewsSchema.nullable(),
   oemPartnership: ProductOemPartnershipSchema.nullable(),
   enabledDomains: z.array(ProductEnabledDomainSchema).nullable(),
   redirectUrl: z.string().nullable(),
   vendor: z.string().nullable(),
   crossSellVariants: z.array(ProductPreviewSchema),
   sections: z.array(ProductSectionSchema),
});

type ShopifyProduct = NonNullable<ShopifyFindProductQuery['product']>;
type StrapiProduct = NonNullable<StrapiFindProductQuery['products']>['data'][0];
type iFixitProduct = NonNullable<ProductDataApiResponse>;

interface GetProductArgs {
   shopifyProduct: ShopifyProduct | null | undefined;
   strapiProduct: StrapiProduct | null | undefined;
   iFixitProduct: iFixitProduct | null | undefined;
}

export async function getProduct({
   shopifyProduct,
   strapiProduct,
   iFixitProduct,
}: GetProductArgs): Promise<Product | null> {
   if (shopifyProduct == null) return null;

   const variants = variantsFromQueryProduct(shopifyProduct);
   const hasActiveVariants = variants.some(isActiveVariant);
   const aVariantSku = variants.find((v) => v.sku != null)?.sku;

   if (aVariantSku == null) {
      console.warn(`No sku found for product "${shopifyProduct.handle}"`);
      return null;
   }

   let breadcrumbs = breadcrumbsFromMetafield(
      shopifyProduct.breadcrumbs?.value
   );
   if (isCurrentPageBreadcrumbMissing(breadcrumbs, shopifyProduct.title)) {
      breadcrumbs = appendCurrentPageBreadcrumb(
         breadcrumbs,
         shopifyProduct.title
      );
   }

   const sections = await getProductSections({
      shopifyProduct,
      strapiProduct,
   });

   const noindex = shopifyProduct.noindex?.value === '1';

   return {
      id: shopifyProduct.id,
      handle: shopifyProduct.handle,
      noindex,
      title: shopifyProduct.title,
      breadcrumbs,
      descriptionHtml: shopifyProduct.descriptionHtml,
      iFixitProductId: computeIFixitProductId(aVariantSku),
      productcode: parseItemcode(aVariantSku).productcode,
      tags: shopifyProduct.tags,
      images: imagesFromQueryProduct(shopifyProduct, variants),
      options: shopifyProduct.options.map((option) =>
         productOptionFromShopify(
            option,
            variants,
            iFixitProduct?.variantOptions[option.name]
         )
      ),
      variants,
      isEnabled: hasActiveVariants,
      prop65WarningType: shopifyProduct.prop65WarningType?.value ?? null,
      prop65Chemicals: shopifyProduct.prop65Chemicals?.value ?? null,
      productVideos: shopifyProduct.productVideos?.value ?? null,
      productVideosJson: productVideoFromMetafield(
         shopifyProduct.productVideos?.value
      ),
      compatibility: productDeviceCompatibilityFromMetafield(
         shopifyProduct.compatibility?.value
      ),
      compatibilityNotes: iFixitProduct?.compatibilityNotes ?? null,
      metaTitle: shopifyProduct.metaTitle?.value ?? null,
      shortDescription: shopifyProduct.shortDescription?.value ?? null,
      reviews: productReviewsFromMetafields(
         shopifyProduct.rating?.value,
         shopifyProduct.reviewsCount?.value
      ),
      oemPartnership: productOemPartnershipFromMetafield(
         shopifyProduct.oemPartnership?.value
      ),
      enabledDomains: productEnabledDomainsFromMetafield(
         shopifyProduct.enabledDomains?.value
      ),
      redirectUrl: shopifyProduct.redirectUrl?.value ?? null,
      vendor: shopifyProduct.vendor ?? null,
      crossSellVariants: getAllCrossSellProductVariant(shopifyProduct),
      sections,
   };
}

function imagesFromQueryProduct(
   queryProduct: ShopifyProduct,
   variants: ProductVariant[]
): ProductVariantImage[] {
   const allImages = filterFalsyItems(
      queryProduct.images.nodes.map((image) =>
         getProductVariantImage(queryProduct, image)
      )
   );

   const hasActiveVariants = variants.some(isActiveVariant);

   if (hasActiveVariants) {
      return allImages.filter((image) =>
         isGenericOrActiveVariantImage(image, variants)
      );
   }

   return allImages.filter(
      (image) => image.variantId == null || image.variantId === variants[0]?.id
   );
}

function isGenericOrActiveVariantImage(
   image: ProductVariantImage,
   variants: ProductVariant[]
) {
   return (
      image.variantId == null ||
      variants.some(
         (variant) => isActiveVariant(variant) && variant.id === image.variantId
      )
   );
}

function computeIFixitProductId(variantSku: string) {
   return variantSku.split('-').slice(0, 2).join('-');
}
