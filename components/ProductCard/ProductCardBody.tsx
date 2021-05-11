import { chakra, Stack } from '@chakra-ui/react';
import * as React from 'react';

export interface ProductCardBodyProps {
   className?: string;
}

export const ProductCardBody = chakra(
   ({ className, children }: React.PropsWithChildren<ProductCardBodyProps>) => {
      return (
         <Stack className={className} display="block" align="center">
            {children}
         </Stack>
      );
   }
);
