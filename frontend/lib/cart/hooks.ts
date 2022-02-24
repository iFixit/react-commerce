import { IFIXIT_ORIGIN } from '@config/env';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { APICart, CartAPIResponse } from './types';

const cartKeys = {
   cart: ['cart'],
};

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

///////////
// UTILS //
///////////

async function fetchAPI(api: string, init?: RequestInit) {
   const response = await fetch(`${IFIXIT_ORIGIN}/api/2.0/${api}`, {
      credentials: 'include',
      ...init,
   });
   if (response.ok) {
      return response;
   }
   throw new Error('unexpected error');
}
