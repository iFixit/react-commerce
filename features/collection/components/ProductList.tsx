import {
   AspectRatio,
   Heading,
   HStack,
   Img,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Hit } from '@features/collection';
import * as React from 'react';

export type ProductListProps = React.PropsWithChildren<unknown>;

export function ProductList({ children }: ProductListProps) {
   return (
      <VStack
         spacing={2}
         align="stretch"
         width="full"
         boxSizing="border-box"
         px={{
            base: 4,
         }}
         py={4}
      >
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
      <HStack key={product.handle} spacing={4} py="4" alignItems="flex-start">
         <AspectRatio
            w={{
               base: '100px',
               sm: '140px',
               md: '100px',
               lg: '160px',
            }}
            ratio={4 / 3}
            flexGrow={1}
            flexShrink={0}
         >
            <Img
               objectFit="cover"
               src={product.product_image}
               alt={product.title}
            />
         </AspectRatio>
         <VStack
            align="flex-start"
            spacing={{
               base: 2,
            }}
            flexShrink={1}
            w="full"
         >
            <Heading
               as="h2"
               fontSize={{
                  base: 'sm',
                  sm: 'md',
                  lg: 'lg',
               }}
            >
               {product.title}
            </Heading>
            <Text
               noOfLines={2}
               fontSize={{
                  base: 'xs',
                  sm: 'sm',
                  lg: 'md',
               }}
            >
               {product.body_html_safe}
            </Text>
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
