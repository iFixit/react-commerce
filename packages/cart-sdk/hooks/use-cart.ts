import { invariant } from '@ifixit/helpers';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useQuery } from 'react-query';
import { Cart, CartAPIResponse } from '../types';
import { cartKeys } from '../utils';

/**
 * Get the cart from the API.
 */
export function useCart() {
   // const client = useIFixitApiClient();
   // const query = useQuery(cartKeys.cart, async (): Promise<Cart | null> => {
   //    const result = (await client.get('store/user/cart')) || null;
   //    if (!isValidCartPayload(result)) {
   //       return null;
   //    }
   //    return {
   //       ...result.cart,
   //       hasItemsInCart: result.cart.totalNumItems > 0,
   //    };
   // });
   return null;
}

function isValidCartPayload(data: any): data is CartAPIResponse {
   return data?.cart != null;
}
