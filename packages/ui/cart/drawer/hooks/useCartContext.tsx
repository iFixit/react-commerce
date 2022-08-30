import { useDisclosure } from '@chakra-ui/react';
import * as React from 'react';

export type CartContext = ReturnType<typeof useDisclosure> & {};

const CartContext = React.createContext<CartContext | null>(null);

type CartProviderProps = React.PropsWithChildren<{}>;

export function CartProvider({ children }: CartProviderProps) {
   const disclosure = useDisclosure();
   // This memoization is here in case something else is added
   const value = React.useMemo((): CartContext => {
      return disclosure;
   }, [disclosure]);

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
   const context = React.useContext(CartContext);
   if (context === null) {
      throw new Error('useCartContext must be used within a CartProvider');
   }
   return context;
}
