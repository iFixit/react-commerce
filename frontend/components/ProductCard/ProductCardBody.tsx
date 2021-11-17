import { StackProps, VStack } from '@chakra-ui/react';
import * as React from 'react';

export const ProductCardBody = (props: StackProps) => {
   return <VStack h="full" spacing="4" {...props} />;
};
