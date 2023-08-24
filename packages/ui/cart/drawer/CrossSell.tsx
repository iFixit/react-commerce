import { Box } from '@chakra-ui/react';
import { useCart } from '@ifixit/cart-sdk';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { AnimatedListItem } from './AnimatedListItem';
import { CrossSellItem } from './CrossSellItem';

export function CrossSell() {
   const cart = useCart();

   const crossSellItems = React.useMemo(() => {
      const crossSells =
         cart.data?.crossSellProducts
            .filter((item) => {
               const isAlreadyInCart =
                  item &&
                  cart.data?.lineItems.find(
                     (lineItem) => lineItem.itemcode === item.itemcode
                  );
               if (isAlreadyInCart) return null;
               return item;
            })
            .sort((a, b) => a.handle.localeCompare(b.handle)) ?? [];
      return crossSells;
   }, [cart.data]);

   const hasItemsInCart = cart.data?.hasItemsInCart ?? false;

   return (
      <Box
         as="ul"
         px="3"
         listStyleType="none"
         data-testid="cart-drawer-x-sell-items"
      >
         <AnimatePresence>
            {hasItemsInCart &&
               crossSellItems.map((crossSellItem) => {
                  return (
                     <AnimatedListItem key={crossSellItem.itemcode}>
                        <CrossSellItem item={crossSellItem} my="3" />
                     </AnimatedListItem>
                  );
               })}
         </AnimatePresence>
      </Box>
   );
}
