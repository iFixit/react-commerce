import { Heading, HStack, Img, Text, VStack } from '@chakra-ui/react';
import { Hit } from '@features/collection';
import * as React from 'react';

export type ProductListProps = React.PropsWithChildren<unknown>;

export function ProductList({ children }: ProductListProps) {
   return (
      <VStack spacing={2} align="stretch" width="full" px={10} py={4}>
         {children}
      </VStack>
   );
}

export interface ProductListItemProps {
   product: Hit;
}

export function ProductListItem({ product }: ProductListItemProps) {
   const isDiscounted =
      product.compare_at_price != null &&
      product.compare_at_price > product.price;
   return (
      <HStack key={product.handle} spacing={4} py={4}>
         <Img
            boxSize="160px"
            flexShrink={0}
            display="block"
            src={product.product_image}
            alt={product.title}
         />
         <VStack align="flex-start" spacing={4}>
            <Heading as="h2" size="md">
               {product.title}
            </Heading>
            <Text noOfLines={2}>{product.body_html_safe}</Text>
            <HStack>
               {isDiscounted && (
                  <Text textDecoration="line-through" color="gray.400">
                     ${product.compare_at_price}
                  </Text>
               )}
               <Text
                  color={isDiscounted ? 'red.700' : 'inherit'}
                  fontWeight="bold"
               >
                  ${product.price}
               </Text>
            </HStack>
         </VStack>
      </HStack>
   );
}
