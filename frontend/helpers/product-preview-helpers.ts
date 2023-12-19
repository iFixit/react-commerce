import type { CartLineItem } from '@ifixit/cart-sdk';
import type { ProductPreview } from '@models/components/product-preview';
import { encodeVariantURI } from '@ifixit/helpers';

export type ProductPreviewWithCartDetails = ProductPreview & {
   sku: string;
   shopifyVariantId: string;
};

export function createCartLineItem(
   productPreview: ProductPreviewWithCartDetails
): CartLineItem {
   return {
      name: productPreview.title,
      variantTitle: productPreview.title,
      itemcode: productPreview.sku,
      shopifyVariantId: encodeVariantURI(productPreview.shopifyVariantId),
      quantity: 1,
      imageSrc: productPreview.image?.url ?? '',
      price: productPreview.price,
      compareAtPrice: productPreview.compareAtPrice,
   };
}

export function hasCartDetails(
   productPreview: ProductPreview
): productPreview is ProductPreviewWithCartDetails {
   return productPreview.sku != null && productPreview.shopifyVariantId != null;
}
