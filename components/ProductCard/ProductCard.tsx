import { chakra, Stack } from '@chakra-ui/react';
import * as React from 'react';

export interface ProductCardProps {
   className?: string;
}

export const ProductCard = chakra(
   ({ className, children }: React.PropsWithChildren<ProductCardProps>) => {
      return (
         <Stack
            className={className}
            direction="column"
            spacing={5}
            align="stretch"
            p={4}
         >
            {children}
         </Stack>
      );
   }
);
