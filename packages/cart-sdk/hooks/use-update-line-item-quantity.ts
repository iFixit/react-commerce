import { trackPiwikCartChange } from '@ifixit/analytics';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Cart } from '../types';
import { cartKeys } from '../utils';

interface UpdateLineItemQuantityInput {
   itemcode: string;
   quantity: number;
}

/**
 * Update line item quantity.
 */
export function useUpdateLineItemQuantity() {
   const client = useQueryClient();
   const iFixitApiClient = useIFixitApiClient();
   const mutation = useMutation(
      async (input) => {
         return iFixitApiClient.post(
            `store/user/cart/product/${input.itemcode}`,
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
                  (item) => item.itemcode === input.itemcode
               );
               if (updatedItem == null) {
                  return current;
               }
               const updatedItemsCount = Math.max(
                  current.totals.itemsCount + input.quantity,
                  0
               );
               return {
                  ...current,
                  hasItemsInCart: updatedItemsCount > 0,
                  lineItems: current.lineItems.map((lineItem) => {
                     if (lineItem.itemcode === input.itemcode) {
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
         },
         onSuccess: () => {
            const cart = client.getQueryData<Cart>(cartKeys.cart);
            trackPiwikCartChange(cart?.lineItems ?? []);
         },
         onSettled: () => {
            client.invalidateQueries(cartKeys.cart);
         },
      }
   );
   return mutation;
}
