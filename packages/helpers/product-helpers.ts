interface Reviewable {
   rating: number;
   count: number;
}

const ITEMCODE_RE = /IF(\d{3})-(\d{3})-(\d{1,2})/;

export function shouldShowProductRating<R extends Reviewable>(
   reviewable: R | null | undefined
): reviewable is R {
   if (reviewable?.rating == null || reviewable?.count == null) {
      return false;
   }
   return reviewable.rating >= 4 || reviewable.count > 10;
}

/**
 * @param itemcode iFixit product variant itemcode (e.g. IF145-307-4)
 * @returns iFixit product variant sku (e.g. 1453074)
 */
export function getProductVariantSku(itemcode: string): string {
   return itemcode.replace(/\D/g, '');
}

export function getItemCodeFromSku(sku: string): string {
   const itemCode = `IF${sku.replace(/(.{3})/g, '$1-')}`;
   return itemCode.endsWith('-') ? itemCode.slice(0, -1) : itemCode;
}

export function parseItemcode(itemcode: string) {
   let matches = itemcode.match(ITEMCODE_RE);
   return matches
      ? {
           category: matches[1],
           productcode: matches[1] + matches[2],
           optionid: matches[3],
        }
      : {};
}

export function isLifetimeWarranty(
   warranty: string | undefined | null
): boolean {
   if (!warranty) return false;
   return /lifetime/i.test(warranty);
}

export function getEncodedVariantURI(variantId: string | number): string {
   return encodeVariantURI(getProductVariantURI(variantId));
}

export function encodeVariantURI(uri: string): string {
   if (!uri.startsWith('gid://')) {
      throw new Error(
         'Variant URI must be a global shopify product variant id uri'
      );
   }
   return window.btoa(uri);
}

export function getDecodedVariantURI(variantId: string | number): string {
   const uri = window.atob(getProductVariantURI(variantId));
   if (!uri.startsWith('gid://')) {
      throw new Error(
         'Variant URI must be a global shopify product variant id uri'
      );
   }
   return uri;
}

export function getVariantIdFromEncodedVariantURI(
   encodedShopifyVariantURI: string
): string {
   const shopifyVariantURIDecoded = window.atob(encodedShopifyVariantURI);
   return getVariantIdFromVariantURI(shopifyVariantURIDecoded);
}

export function getVariantIdFromVariantURI(variantURI: string): string {
   if (!variantURI.startsWith('gid://')) {
      throw new Error(
         'Variant URI must be a global shopify product variant id uri'
      );
   }
   return variantURI.replace(/^gid:\/\/shopify\/ProductVariant\//, '');
}

export function getProductIdFromGlobalId(globalProductId: string) {
   if (!globalProductId.startsWith('gid://')) {
      throw new Error(
         'globalProductId must be a global shopify product id uri'
      );
   }
   return globalProductId.replace(/^gid:\/\/shopify\/Product\//, '');
}

export function getProductVariantURI(variantId: string | number): string {
   return `gid://shopify/ProductVariant/${variantId}`;
}
