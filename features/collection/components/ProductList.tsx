import {
   AspectRatio,
   Heading,
   HStack,
   Img,
   Text,
   VStack,
} from '@chakra-ui/react';
import { ShopifyImage } from '@components/ShopifyImage';
import { Hit } from '@features/collection';
import * as React from 'react';

const placeholderImageUrl =
   'https://via.placeholder.com/180x135?text=not+available';

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
            flexGrow={1}
            flexShrink={0}
            w={{
               base: '100px',
               sm: '160px',
               md: '140px',
               lg: '180px',
            }}
            ratio={4 / 3}
         >
            {product.product_image == null ? (
               <Img
                  sizes="180px"
                  src={placeholderImageUrl}
                  alt={product.title}
               />
            ) : (
               <ShopifyImage
                  src={product.product_image || placeholderImageUrl}
                  alt={product.title}
                  sizes="180px"
               />
            )}
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
