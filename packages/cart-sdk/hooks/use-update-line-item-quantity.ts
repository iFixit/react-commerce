import {
   convertCartLineItemsToAnalyticsItem,
   trackInAnalyticsAddToCart,
   trackInAnalyticsRemoveFromCart,
   trackPiwikCartUpdate,
} from '@ifixit/analytics';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Cart, CartLineItem } from '../types';
import { cartKeys } from '../utils';
import { useCartDrawer } from '@ifixit/ui';

interface UpdateLineItemQuantityInput {
   item: CartLineItem;
   quantity: number;
}

/**
 * Update line item quantity.
 */
export function useUpdateLineItemQuantity() {
   const client = useQueryClient();
   const iFixitApiClient = useIFixitApiClient();
   const { addErrorMessage } = useCartDrawer();
   const mutation = useMutation(
      async (input) => {
         return iFixitApiClient.post(
            `store/user/cart/product/${input.item.itemcode}`,
            'update-line-item-quantity',
            {
               body: JSON.stringify({
                  quantity: input.quantity,
               }),
            }
         );
      },
      {
         onMutate: async (input: UpdateLineItemQuantityInput) => {
            await client.cancelQueries(cartKeys.cart);

            const previousCart = client.getQueryData<Cart>(cartKeys.cart);

            client.setQueryData<Cart | undefined>(cartKeys.cart, (current) => {
               if (current == null) {
                  return current;
               }
               const updatedItem = current.lineItems.find(
                  (item) => item.itemcode === input.item.itemcode
               );
               if (updatedItem == null) {
                  return current;
               }
               const updatedItemsCount = Math.max(
                  current.totals.itemsCount + input.quantity,
                  0
               );
               const updateTotalPrice = Math.max(
                  Number(current.totals.price.amount) +
                     input.quantity * Number(input.item.price.amount),
                  0
               ).toFixed(2);
               return {
                  ...current,
                  hasItemsInCart: updatedItemsCount > 0,
                  lineItems: current.lineItems.map((lineItem) => {
                     if (lineItem.itemcode === input.item.itemcode) {
                        const updatedQuantity = Math.max(
                           lineItem.quantity + input.quantity,
                           0
                        );
                        return {
                           ...lineItem,
                           quantity: updatedQuantity,
                        };
                     }
                     return lineItem;
                  }),
                  totals: {
                     ...current.totals,
                     price: {
                        ...current.totals.price,
                        amount: updateTotalPrice,
                     },
                     itemsCount: updatedItemsCount,
                  },
               };
            });

            return { previousCart };
         },
         onError: (error, variables, context) => {
            client.setQueryData<Cart | undefined>(
               cartKeys.cart,
               context?.previousCart
            );
            addErrorMessage(
               (error as string) || 'An error occurred updating the cart.'
            );
         },
         onSuccess: (data, variables) => {
            const analyticsItems = convertCartLineItemsToAnalyticsItem([
               variables.item,
            ]);
            const addOrRemoveAnalyticsItems = analyticsItems.map((item) => {
               return {
                  ...item,
                  quantity: Math.abs(variables.quantity),
               };
            });
            const trackChangeInCart =
               variables.quantity < 0
                  ? trackInAnalyticsRemoveFromCart
                  : trackInAnalyticsAddToCart;
            trackChangeInCart({
               items: addOrRemoveAnalyticsItems,
               value: Number(variables.item.price.amount),
               currency: variables.item.price.currencyCode,
            });
            const cart = client.getQueryData<Cart>(cartKeys.cart);
            if (cart) {
               trackPiwikCartUpdate({
                  items: convertCartLineItemsToAnalyticsItem(cart.lineItems),
                  value: Number(cart.totals.price.amount),
                  currency: cart.totals.price.currencyCode,
               });
            }
         },
         onSettled: () => {
            client.invalidateQueries(cartKeys.cart);
         },
      }
   );
   return mutation;
}
