import React from 'react';
import { CartLineItem } from '../types';
import { useCart } from './use-cart';

type UseCartLineItem = {
   data: CartLineItem | null;
   isLoading: boolean;
   isError: boolean;
};

export function useCartLineItem(itemcode: string): UseCartLineItem {
   const cart = useCart();

   const isLoading = cart.isLoading;
   const isError = cart.isError;

   const data = React.useMemo<CartLineItem | null>(() => {
      return (
         cart.data?.lineItems.find((item) => item.itemcode === itemcode) ?? null
      );
   }, [cart.data, itemcode]);

   return { data, isLoading, isError };
}
