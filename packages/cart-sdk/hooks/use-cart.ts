import { getProductVariantSku, Money } from '@ifixit/helpers';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useQuery } from '@tanstack/react-query';
import { APICart, Cart, CartAPIResponse, CartLineItem } from '../types';
import { cartKeys } from '../utils';

/**
 * Get the cart from the API.
 */
export function useCart() {
   const client = useIFixitApiClient();
   const query = useQuery(cartKeys.cart, async (): Promise<Cart | null> => {
      const result =
         (await client.get('store/user/cart', { disableSentry: true })) || null;
      if (!isValidCartPayload(result)) {
         return null;
      }
      return createCart(result.cart);
   });
   return query;
}

function isValidCartPayload(data: any): data is CartAPIResponse {
   return data?.cart != null;
}

function createCart(input: APICart): Cart {
   const lineItems = input.products.map<CartLineItem>((product) => {
      const priceAmount = parseFloat(product.subPrice);
      const singleItemDiscount = product.discount
         ? parseFloat(product.discount)
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
   return {
      hasItemsInCart: input.totalNumItems > 0,
      lineItems,
      totals: {
         itemsCount: input.totalNumItems,
         discount,
         price: totalPrice,
         compareAtPrice: totalCompareAtPrice,
      },
   };
}
