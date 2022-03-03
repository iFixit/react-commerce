import { useMutation, useQueryClient } from 'react-query';
import { APICart } from './types';
import { cartKeys, fetchAPI } from './utils';

/**
 * Update line item quantity.
 */
export function useUpdateLineItemQuantity() {
   const client = useQueryClient();
   const mutation = useMutation(updateLineItemQuantity, {
      onMutate: async (input: UpdateLineItemQuantityInput) => {
         await client.cancelQueries(cartKeys.cart);

         const previousCart = client.getQueryData<APICart>(cartKeys.cart);

         client.setQueryData<APICart | undefined>(cartKeys.cart, (current) => {
            if (current == null) {
               return current;
            }
            const updatedItem = current.products.find(
               (item) => item.itemcode === input.itemcode
            );
            return updatedItem == null
               ? current
               : {
                    ...current,
                    totalNumItems: current.totalNumItems + input.quantity,
                    products: current.products.map((product) => {
                       if (product.itemcode === input.itemcode) {
                          return {
                             ...product,
                             quantity: product.quantity + input.quantity,
                          };
                       }
                       return product;
                    }),
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

interface UpdateLineItemQuantityInput {
   itemcode: string;
   quantity: number;
}

async function updateLineItemQuantity(input: UpdateLineItemQuantityInput) {
   const response = await fetchAPI(
      `store/user/cart/product/${input.itemcode}`,
      {
         method: 'POST',
         body: JSON.stringify({
            quantity: input.quantity,
         }),
      }
   );
   if (response.ok) {
      return response;
   }
   throw new Error('unexpected error');
}
