import { chakra, Heading } from '@chakra-ui/react';
import * as React from 'react';

export interface ProductCardTitleProps {
   className?: string;
}

export const ProductCardTitle = chakra(
   ({
      children,
      className,
   }: React.PropsWithChildren<ProductCardTitleProps>) => {
      return (
         <Heading className={className} as="h2" size="sm" textAlign="center">
            {children}
         </Heading>
      );
   }
);
