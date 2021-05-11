import { chakra, Stack } from '@chakra-ui/react';
import * as React from 'react';

interface ProductCardProps {
   className?: string;
}

export const ProductCard = chakra(
   ({ className, children }: React.PropsWithChildren<ProductCardProps>) => {
      return (
         <Stack
            className={className}
            direction={{
               base: 'row',
               sm: 'column',
            }}
            spacing={5}
            align="center"
            p={4}
         >
            {children}
         </Stack>
      );
   }
);
