import { useQuery } from 'react-query';
import { APICart, CartAPIResponse } from './types';
import { cartKeys, fetchAPI } from './utils';

/**
 * Get the cart from the API.
 */
export function useCart() {
   const query = useQuery(cartKeys.cart, getCart);
   return query;
}

async function getCart(): Promise<APICart> {
   const response = await fetchAPI(`store/user/cart`);
   const payload: CartAPIResponse = await response.json();
   const apiCart = payload?.cart;
   if (apiCart) {
      return apiCart;
   }
   throw new Error('unexpected error');
}
