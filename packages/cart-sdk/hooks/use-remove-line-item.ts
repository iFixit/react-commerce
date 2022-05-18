import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useMutation, useQueryClient } from 'react-query';
import { APICart } from '../types';
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
            `store/user/cart/product/${input.itemcode}`
         );
         return true;
      },
      {
         onMutate: async (input: DeleteLineItemInput) => {
            await client.cancelQueries(cartKeys.cart);

            const previousCart = client.getQueryData<APICart>(cartKeys.cart);

            client.setQueryData<APICart | undefined>(
               cartKeys.cart,
               (current) => {
                  if (current == null) {
                     return current;
                  }
                  const deletedItem = current.products.find(
                     (item) => item.itemcode === input.itemcode
                  );
                  return deletedItem == null
                     ? current
                     : {
                          ...current,
                          totalNumItems:
                             current.totalNumItems - deletedItem.quantity,
                          products: current.products.filter(
                             (product) => product.itemcode !== input.itemcode
                          ),
                       };
               }
            );

            return { previousCart };
         },
         onError: (error, variables, context) => {
            client.setQueryData<APICart | undefined>(
               cartKeys.cart,
               context?.previousCart
            );
         },
         onSettled: () => {
            client.invalidateQueries(cartKeys.cart);
         },
      }
   );
   return mutation;
}
