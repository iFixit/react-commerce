import { invariant } from '@ifixit/helpers';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useQuery } from 'react-query';
import { APICart } from '../types';
import { cartKeys } from '../utils';

/**
 * Get the cart from the API.
 */
export function useCart() {
   const client = useIFixitApiClient();
   const query = useQuery(cartKeys.cart, async (): Promise<APICart> => {
      const result = await client.get('store/user/cart');
      invariant(isCartPayload(result), 'cart not available');
      return result.cart;
   });
   return query;
}

function isCartPayload(data: any): data is { cart: APICart } {
   return data?.cart != null;
}
