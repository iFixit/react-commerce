import { trackPiwikCartChange } from '@ifixit/analytics';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Cart } from '../types';
import { cartKeys } from '../utils';

interface DeleteLineItemInput {
   itemcode: string;
}

/**
 * Remove a line item from the cart.
 */
export function useRemoveLineItem() {
   const client = useQueryClient();
   const iFixitApiClient = useIFixitApiClient();
   const mutation = useMutation(
      async (input) => {
         await iFixitApiClient.delete(
            `store/user/cart/product/${input.itemcode}`,
            'remove-line-item'
         );
         return true;
      },
      {
         onMutate: async (input: DeleteLineItemInput) => {
            await client.cancelQueries(cartKeys.cart);

            const previousCart = client.getQueryData<Cart>(cartKeys.cart);

            client.setQueryData<Cart | undefined>(cartKeys.cart, (current) => {
               if (current == null) {
                  return current;
               }
               const deletedItem = current.lineItems.find(
                  (item) => item.itemcode === input.itemcode
               );
               if (deletedItem == null) {
                  return current;
               }
               const updatedItemCount = Math.max(
                  current.totals.itemsCount - deletedItem.quantity,
                  0
               );
               return {
                  ...current,
                  hasItemsInCart: updatedItemCount > 0,
                  lineItems: current.lineItems.filter(
                     (product) => product.itemcode !== input.itemcode
                  ),
                  totals: {
                     ...current.totals,
                     itemsCount: updatedItemCount,
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
