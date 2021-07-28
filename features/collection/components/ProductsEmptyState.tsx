import { Center, Text } from '@chakra-ui/react';
import * as React from 'react';

export function ProductsEmptyState() {
   return (
      <Center minH="300px">
         <Text>No results</Text>
      </Center>
   );
}
