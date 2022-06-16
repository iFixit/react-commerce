import { invariant } from '@ifixit/helpers';
import { useIFixitApiClient } from '@ifixit/ifixit-api-client';
import { useQuery } from 'react-query';
import { Cart, CartAPIResponse } from '../types';
import { cartKeys } from '../utils';

const CART_NOT_AVAILABLE = 'cart is not available';

/**
 * Get the cart from the API.
 */
export function useCart() {
   const client = useIFixitApiClient();
   const query = useQuery(cartKeys.cart, async (): Promise<Cart | null> => {
      const result = await client.get('store/user/cart');
      invariant(isValidCartPayload(result), CART_NOT_AVAILABLE);
      return {
         ...result.cart,
         hasItemsInCart: result.cart.totalNumItems > 0,
      };
   });
   return query;
}

function isValidCartPayload(data: any): data is CartAPIResponse {
   return data?.cart != null;
}
