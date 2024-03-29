import { Box } from '@chakra-ui/react';
import { useCart } from '@ifixit/cart-sdk';
import * as React from 'react';
import { AnimatedList } from '../../animations';
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
      <Box px="3" py="1.5" data-testid="cart-drawer-x-sell-items">
         {hasItemsInCart && (
            <AnimatedList
               items={crossSellItems}
               getItemId={(item) => item.itemcode}
               renderItem={(item) => {
                  return <CrossSellItem item={item} my="1.5" />;
               }}
            />
         )}
      </Box>
   );
}
