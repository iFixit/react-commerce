import { useDisclosure } from '@chakra-ui/react';
import { trackInMatomoAndGA } from '@ifixit/analytics';
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
      trackInMatomoAndGA({
         eventCategory: 'Mini Cart',
         eventAction: 'Btn "View Cart" - Click',
      });
      context.onClose();
   }, [context.onClose]);
   return { ...context, onViewCart };
}
