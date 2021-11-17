import { chakra, Text } from '@chakra-ui/react';
import * as React from 'react';

export interface ProductCardPriceProps {
   className?: string;
   price: number;
}

export const ProductCardPrice = chakra(
   ({ className, price }: ProductCardPriceProps) => {
      return (
         <Text
            className={className}
            fontWeight="semibold"
            fontSize={{
               base: 'xs',
               md: 'md',
            }}
            textAlign="right"
         >
            ${price}
         </Text>
      );
   }
);
