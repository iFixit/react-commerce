import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useMutation, useQueryClient } from 'react-query';
import { APICart } from '../types';
import { cartKeys } from '../utils';

interface AddProductVariantInput {
   name: string;
   itemcode: string;
   formattedPrice: string;
   quantity: number;
   imageSrc: string;
}

/**
 * Update line item quantity.
 */
export function useAddToCart() {
   const client = useQueryClient();
   const iFixitApiClient = useIFixitApiClient();
   const mutation = useMutation(
      async (input) => {
         return iFixitApiClient.post(
            `store/user/cart/product/${input.itemcode}`,
            {
               body: JSON.stringify({
                  quantity: input.quantity,
                  getMiniCartInfo: true,
               }),
            }
         );
      },
      {
         onMutate: async (input: AddProductVariantInput) => {
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
                     ? {
                          ...current,
                          totalNumItems: current.totalNumItems + input.quantity,
                          products: [
                             // Optimistic update
                             {
                                discount: '',
                                imageSrc: input.imageSrc,
                                itemcode: input.itemcode,
                                maxToAdd: 0,
                                name: input.name,
                                quantity: input.quantity,
                                subPrice: input.formattedPrice,
                                subPriceStr: input.formattedPrice,
                                subTotal: input.formattedPrice,
                                subTotalStr: input.formattedPrice,
                             },
                             ...current.products,
                          ],
                       }
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
