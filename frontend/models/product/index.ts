import { filterFalsyItems } from '@helpers/application-helpers';
import { parseItemcode } from '@ifixit/helpers';
import type { FindProductQuery } from '@lib/shopify-storefront-sdk';
import {
   appendCurrentPageBreadcrumb,
   BreadcrumbSchema,
   breadcrumbsFromMetafield,
   isCurrentPageBreadcrumbMissing,
} from '@models/components/breadcrumb';
import { FAQSchema, faqsFromMetafield } from '@models/components/faq';
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
import { getDefaultProductSections, ProductSectionSchema } from './sections';

export type {
   ProductVariant,
   ProductVariantImage,
} from './components/product-variant';

export type Product = z.infer<typeof ProductSchema>;

export const ProductSchema = z.object({
   id: z.string(),
   handle: z.string(),
   title: z.string(),
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
   faqs: z.array(FAQSchema),
   compatibility: ProductDeviceCompatibilitySchema.nullable(),
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

type QueryProduct = NonNullable<FindProductQuery['product']>;

export function productFromQueryProduct(
   queryProduct: QueryProduct | null | undefined
): Product | null {
   if (queryProduct == null) return null;

   const variants = variantsFromQueryProduct(queryProduct);
   const hasActiveVariants = variants.some(isActiveVariant);
   const aVariantSku = variants.find((v) => v.sku != null)?.sku;

   if (aVariantSku == null) {
      console.warn(`No sku found for product "${queryProduct.handle}"`);
      return null;
   }

   let breadcrumbs = breadcrumbsFromMetafield(queryProduct.breadcrumbs?.value);
   if (isCurrentPageBreadcrumbMissing(breadcrumbs, queryProduct.title)) {
      breadcrumbs = appendCurrentPageBreadcrumb(
         breadcrumbs,
         queryProduct.title
      );
   }

   return {
      id: queryProduct.id,
      handle: queryProduct.handle,
      title: queryProduct.title,
      breadcrumbs,
      descriptionHtml: queryProduct.descriptionHtml,
      iFixitProductId: computeIFixitProductId(aVariantSku),
      productcode: parseItemcode(aVariantSku).productcode,
      tags: queryProduct.tags,
      images: imagesFromQueryProduct(queryProduct, variants),
      options: queryProduct.options.map((option) =>
         productOptionFromShopify(option, variants)
      ),
      variants,
      isEnabled: hasActiveVariants,
      prop65WarningType: queryProduct.prop65WarningType?.value ?? null,
      prop65Chemicals: queryProduct.prop65Chemicals?.value ?? null,
      productVideos: queryProduct.productVideos?.value ?? null,
      productVideosJson: productVideoFromMetafield(
         queryProduct.productVideos?.value
      ),
      faqs: faqsFromMetafield(queryProduct.faqs?.value),
      compatibility: productDeviceCompatibilityFromMetafield(
         queryProduct.compatibility?.value
      ),
      metaTitle: queryProduct.metaTitle?.value ?? null,
      shortDescription: queryProduct.shortDescription?.value ?? null,
      reviews: productReviewsFromMetafields(
         queryProduct.rating?.value,
         queryProduct.reviewsCount?.value
      ),
      oemPartnership: productOemPartnershipFromMetafield(
         queryProduct.oemPartnership?.value
      ),
      enabledDomains: productEnabledDomainsFromMetafield(
         queryProduct.enabledDomains?.value
      ),
      redirectUrl: queryProduct.redirectUrl?.value ?? null,
      vendor: queryProduct.vendor ?? null,
      crossSellVariants: getAllCrossSellProductVariant(queryProduct),
      sections: getDefaultProductSections({ queryProduct }),
   };
}

function imagesFromQueryProduct(
   queryProduct: QueryProduct,
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
   variant: ProductVariant[]
) {
   return (
      image.variantId == null ||
      variant.some(
         (variant) => isActiveVariant(variant) && variant.id === image.variantId
      )
   );
}

function computeIFixitProductId(variantSku: string) {
   return variantSku.split('-').slice(0, 2).join('-');
}
