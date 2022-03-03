import { useMutation, useQueryClient } from 'react-query';
import { APICart } from './types';
import { cartKeys, fetchAPI } from './utils';

/**
 * Remove a line item from the cart.
 */
export function useRemoveLineItem() {
   const client = useQueryClient();
   const mutation = useMutation(deleteLineItem, {
      onMutate: async (input: DeleteLineItemInput) => {
         await client.cancelQueries(cartKeys.cart);

         const previousCart = client.getQueryData<APICart>(cartKeys.cart);

         client.setQueryData<APICart | undefined>(cartKeys.cart, (current) => {
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
                    totalNumItems: current.totalNumItems - deletedItem.quantity,
                    products: current.products.filter(
                       (product) => product.itemcode !== input.itemcode
                    ),
                 };
         });

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
   });
   return mutation;
}

interface DeleteLineItemInput {
   itemcode: string;
}

async function deleteLineItem(input: DeleteLineItemInput) {
   await fetchAPI(`store/user/cart/product/${input.itemcode}`, {
      method: 'DELETE',
   });
   return true;
}
