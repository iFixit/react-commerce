import { chakra, Flex } from '@chakra-ui/react';
import * as React from 'react';

export type CardProps = {
   className?: string;
};

export const Card = chakra(
   ({ children, className }: React.PropsWithChildren<CardProps>) => {
      return (
         <Flex
            className={className}
            bg="white"
            boxShadow="base"
            borderRadius="lg"
            direction="column"
         >
            {children}
         </Flex>
      );
   }
);
