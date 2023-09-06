import {
   filterNullableItems,
   getProductVariantSku,
   Money,
   parseMoney,
} from '@ifixit/helpers';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useIsMutating, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
   APICart,
   Cart,
   CartAPIResponse,
   CartLineItem,
   CrossSellProduct,
} from '../types';
import { cartKeys } from '../utils';

/**
 * Get the cart from the API.
 */
export function useCart() {
   const client = useIFixitApiClient();
   const isMutating = useIsMutating();
   const query = useQuery({
      queryKey: cartKeys.cart,
      queryFn: async (): Promise<Cart | null> => {
         const result = await client.get('store/user/cart', 'cart');
         if (!isValidCartPayload(result)) {
            return null;
         }
         return createCart(result.cart);
      },
      enabled: !isMutating,
   });
   return query;
}

export function useCrossSells() {
   const cartQuery = useCart();
   const cart = cartQuery.data;
   return useMemo(
      () =>
         cart
            ? cart.crossSellProducts
                 .filter((item) => {
                    const isAlreadyInCart =
                       item &&
                       cart.lineItems.find(
                          (lineItem) => lineItem.itemcode === item.itemcode
                       );
                    if (isAlreadyInCart) return null;
                    return item;
                 })
                 .sort((a, b) => a.handle.localeCompare(b.handle))
            : [],
      [cart]
   );
}

function isValidCartPayload(data: any): data is CartAPIResponse {
   return data?.cart != null;
}

function createCart(input: APICart): Cart {
   const lineItems = input.products.map<CartLineItem>((product) => {
      const priceAmount = parseFloat(product.subPrice);
      const singleItemDiscount = product.retailDiscount
         ? parseFloat(product.retailDiscount)
         : 0;
      const price: Money = {
         amount: priceAmount,
         currencyCode: 'usd',
      };
      const compareAtPrice: Money = {
         amount: priceAmount + singleItemDiscount,
         currencyCode: 'usd',
      };
      const sku = getProductVariantSku(product.itemcode);
      const shopifyVariantId =
         input.miniCart.products.find((p) => p.sku === sku)?.variantId ?? '';
      const item: CartLineItem = {
         itemcode: product.itemcode,
         variantTitle: product.variant,
         shopifyVariantId,
         name: product.name,
         imageSrc: product.imageSrc,
         quantity: product.quantity,
         maxToAdd: product.maxToAdd,
         price,
         compareAtPrice,
      };
      return item;
   });
   const discount: Money<number> | null = input.totals.discount
      ? {
           amount: parseFloat(input.totals.discount.amount),
           currencyCode: 'usd',
        }
      : null;
   const totalPrice: Money<number> = {
      amount: parseFloat(input.totals.total.amount),
      currencyCode: 'usd',
   };
   const totalCompareAtPrice: Money<number> | null =
      discount && discount.amount > 0
         ? {
              amount: totalPrice.amount + discount.amount,
              currencyCode: 'usd',
           }
         : null;

   const crossSellProducts = input.crossSellProducts;
   return {
      hasItemsInCart: input.totalNumItems > 0,
      lineItems,
      totals: {
         itemsCount: input.totalNumItems,
         discount,
         price: totalPrice,
         compareAtPrice: totalCompareAtPrice,
      },
      crossSellProducts: filterNullableItems(
         crossSellProducts.map<CrossSellProduct | null>((apiProduct) => {
            if (apiProduct.subPrice == null) {
               return null;
            }
            const variantId = `gid://shopify/ProductVariant/${apiProduct.variant_id}`;
            return {
               marketingHeading: apiProduct.marketing_heading,
               marketingTitle: apiProduct.marketing_title,
               marketingBlurb: apiProduct.product_blurb,
               itemcode: apiProduct.itemcode,
               shopifyVariantId: btoa(variantId),
               name: apiProduct.name,
               imageSrc: apiProduct.imageSrc,
               price: parseMoney(apiProduct.subPrice),
               compareAtPrice: apiProduct.compare_at_price
                  ? parseMoney(apiProduct.compare_at_price)
                  : null,
               proPricesByTier: apiProduct.price_tiers
                  ? parsePriceTiers(apiProduct.price_tiers)
                  : null,
               handle: apiProduct.handle,
            };
         })
      ),
   };
}

const parsePriceTiers = (
   priceTiers: Record<string, number>
): Record<string, Money> => {
   return Object.entries(priceTiers).reduce((acc, [key, value]) => {
      acc[key] = {
         amount: value,
         currencyCode: 'usd',
      };
      return acc;
   }, {} as Record<string, Money>);
};
