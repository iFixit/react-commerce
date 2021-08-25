import { SearchEmptyStateIllustration } from '@assets/svg';
import { Icon, Text, VStack } from '@chakra-ui/react';
import * as React from 'react';

export function ProductsEmptyState() {
   return (
      <VStack pt="16" pb="20">
         <Icon
            as={SearchEmptyStateIllustration}
            boxSize="200px"
            opacity="0.8"
         />
         <Text fontSize="lg" fontWeight="bold">
            No results found
         </Text>
         <Text maxW="500px" color="gray.500" textAlign="center" px="2">
            Try adjusting your search or filter to find what you&apos;re looking
            for.
         </Text>
      </VStack>
   );
}
