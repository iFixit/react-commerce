import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useMutation, useQueryClient } from 'react-query';
import { cartKeys } from '../utils';

interface AddProductVariantInput {
   itemcode: string;
   quantity: number;
}

/**
 * Update line item quantity.
 */
export function useAddToCart(onSuccess?: (result: any) => void) {
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
         onMutate: async (input: AddProductVariantInput) => {
            await client.cancelQueries(cartKeys.cart);
         },
         onSettled: () => {
            client.invalidateQueries(cartKeys.cart);
         },
         onSuccess: (result, variables, context) => {
            onSuccess?.(result);
         },
      }
   );
   return mutation;
}
