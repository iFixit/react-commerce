import { useDisclosure } from '@chakra-ui/react';
import { trackGA4ViewCart } from '@ifixit/analytics';
import { getVariantIdFromEncodedVariantURI } from '@ifixit/helpers';
import { useCart } from '@ifixit/cart-sdk';

import * as React from 'react';
import { trackInPiwik } from '@ifixit/analytics/piwik/track-event';

export type CartDrawerContext = ReturnType<typeof useDisclosure> & {
   errors: Error[];
   addError: (newError: unknown) => void;
   clearErrors: () => void;
};
const CartDrawerContext = React.createContext<CartDrawerContext | null>(null);

type CartDrawerProviderProps = React.PropsWithChildren<{}>;

export function CartDrawerProvider({ children }: CartDrawerProviderProps) {
   const disclosure = useDisclosure();
   const [errors, setErrors] = React.useState<Error[]>([]);

   const addError = (newError: unknown) => {
      let error: Error;
      if (newError instanceof Error) {
         error = newError;
      } else if (typeof newError === 'string') {
         error = new Error(newError);
      } else {
         error = new Error('Unknown error');
      }
      setErrors((prevErrors) => [...prevErrors, error]);
   };

   const clearErrors = () => {
      setErrors([]);
   };

   const value = React.useMemo(
      (): CartDrawerContext => ({
         ...disclosure,
         errors,
         addError,
         clearErrors,
      }),
      [disclosure, errors]
   );

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
      trackInPiwik({
         eventCategory: 'Mini Cart',
         eventAction: 'Btn "View Cart" - Click',
         eventName: `${window.location.origin}${window.location.pathname}`,
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
