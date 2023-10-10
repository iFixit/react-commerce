import { useDisclosure } from '@chakra-ui/react';
import { trackGA4ViewCart, trackInPiwikAndGA } from '@ifixit/analytics';
import { getVariantIdFromEncodedVariantURI } from '@ifixit/helpers';
import { useCart } from '@ifixit/cart-sdk';

import * as React from 'react';

export type CartDrawerContext = ReturnType<typeof useDisclosure> & {};

const CartDrawerContext = React.createContext<CartDrawerContext | null>(null);

type CartDrawerProviderProps = React.PropsWithChildren<{}>;

export function CartDrawerProvider({ children }: CartDrawerProviderProps) {
   const disclosure = useDisclosure();
   const value = React.useMemo((): CartDrawerContext => {
      return disclosure;
   }, [disclosure]);

   return (
      <CartDrawerContext.Provider value={value}>
         {children}
      </CartDrawerContext.Provider>
   );
}

export function useCartDrawer() {
   const context = React.useContext(CartDrawerContext);
   if (context === null) {
      throw new Error('useCartDrawer must be used within a CartDrawerProvider');
   }
   const onViewCart = React.useCallback(() => {
      trackInPiwikAndGA({
         eventCategory: 'Mini Cart',
         eventAction: 'Btn "View Cart" - Click',
      });
      context.onClose();
   }, [context.onClose]);

   const cartQuery = useCart();
   // we only want to track the analytics when the cart drawer is opened by the user
   const onOpenWithAnalytics = React.useCallback(
      (event?: Event, autoOpened?: boolean) => {
         // Make sure the cart data is loaded and successful
         if (cartQuery.isSuccess && cartQuery.data && !autoOpened) {
            if (cartQuery.data.lineItems.length) {
               trackGA4ViewCart({
                  currency: cartQuery.data.lineItems[0].price.currencyCode,
                  value: cartQuery.data.lineItems.reduce(
                     (acc: number, item) => {
                        return acc + Number(item.price.amount) * item.quantity;
                     },
                     0
                  ),
                  items: cartQuery.data.lineItems.map((item) => ({
                     item_id: item.itemcode,
                     item_name: item.name + ' ' + item.variantTitle,
                     item_variant: getVariantIdFromEncodedVariantURI(
                        item.shopifyVariantId
                     ),
                     price: Number(item.price.amount),
                     quantity: item.quantity,
                  })),
               });
            }
         }
         context.onOpen();
      },
      [context.onOpen, cartQuery?.isSuccess, cartQuery?.data]
   );

   return { ...context, onOpen: onOpenWithAnalytics, onViewCart };
}
