import { VStack } from '@chakra-ui/react';
import * as React from 'react';

export const PageLayout = React.memo(
   ({ children }: React.PropsWithChildren<unknown>) => {
      return (
         <VStack
            w={{ base: 'full', lg: '960px', xl: '1100px' }}
            mx="auto"
            align="stretch"
            py="10"
            spacing="12"
            px={{
               base: 0,
               sm: 6,
               lg: 0,
            }}
         >
            {children}
         </VStack>
      );
   }
);
