import { Box, VStack } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

type PanelProps = PropsWithChildren<{
   isOpen: boolean;
}>;

export function Panel({ isOpen, children }: PanelProps) {
   return (
      <Box
         position="absolute"
         transition="all 300ms"
         transform={isOpen ? 'translateX(0)' : 'translateX(100%)'}
         top="0"
         left="0"
         right="0"
         height="100%"
         overflowY="scroll"
         bg="white"
         shadow={isOpen ? 'lg' : 'none'}
         p="5"
      >
         <VStack align="stretch" spacing="3">
            {children}
         </VStack>
      </Box>
   );
}
