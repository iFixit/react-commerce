import {
   filterNullableItems,
   getProductVariantSku,
   getEncodedVariantURI,
   Money,
   parseMoney,
} from '@ifixit/helpers';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useIsMutating, useQuery, useQueryClient } from '@tanstack/react-query';
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
   const queryClient = useQueryClient();

   const query = useQuery({
      queryKey: cartKeys.cart,
      queryFn: async (): Promise<Cart | null> => {
         const previousData = queryClient.getQueryData<Cart | null>(
            cartKeys.cart
         );

         const result = await client.get('store/user/cart', 'cart');
         if (!isValidCartPayload(result)) {
            return null;
         }
         return createCart(result.cart, previousData?.error);
      },
      enabled: !isMutating,
   });
   return query;
}

function isValidCartPayload(data: any): data is CartAPIResponse {
   return data?.cart != null;
}

function createCart(input: APICart, error?: boolean): Cart {
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
            return {
               marketingHeading: apiProduct.marketing_heading,
               marketingTitle: apiProduct.marketing_title,
               marketingBlurb: apiProduct.product_blurb,
               itemcode: apiProduct.itemcode,
               shopifyVariantId: getEncodedVariantURI(apiProduct.variant_id),
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
      error: error,
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
