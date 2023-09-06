import { Box } from '@chakra-ui/react';
import { useCart, useCrossSells } from '@ifixit/cart-sdk';
import * as React from 'react';
import { AnimatedList } from '../../animations';
import { CrossSellItem } from './CrossSellItem';

export function CrossSell() {
   const cart = useCart();

   const crossSellItems = useCrossSells();
   const hasItemsInCart = cart.data?.hasItemsInCart ?? false;

   return (
      (hasItemsInCart && (
         <AnimatedList
            items={crossSellItems}
            getItemId={(item) => item.itemcode}
            renderItem={(item) => {
               return <CrossSellItem item={item} my="1.5" />;
            }}
         />
      )) ||
      null
   );
}
