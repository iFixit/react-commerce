import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useMutation, useQueryClient } from 'react-query';
import { APICart } from '../types';
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

            const previousCart = client.getQueryData<APICart>(cartKeys.cart);

            client.setQueryData<APICart | undefined>(
               cartKeys.cart,
               (current) => {
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
