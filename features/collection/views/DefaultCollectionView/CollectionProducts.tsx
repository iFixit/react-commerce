import {
   Button,
   Center,
   Heading,
   HStack,
   Img,
   SimpleGrid,
   Text,
   VStack,
} from '@chakra-ui/react';
import {
   ProductCard,
   ProductCardBody,
   ProductCardImage,
   ProductCardPrice,
   ProductCardTitle,
} from '@components/ProductCard';
import { Hit } from '@features/collection';
import { useHits } from '@lib/algolia';
import * as React from 'react';
import { ProductViewType } from './types';

export type CollectionProductsProps = {
   viewType: ProductViewType;
};

export function CollectionProducts({ viewType }: CollectionProductsProps) {
   const { hits } = useHits<Hit>();

   if (hits.length === 0) {
      return (
         <Center minH="300px">
            <Text>No results</Text>
         </Center>
      );
   }
   if (viewType === ProductViewType.Grid) {
      return (
         <SimpleGrid
            w="100%"
            columns={{
               base: 1,
               md: 2,
               lg: 3,
            }}
            spacing={2}
         >
            {hits.map((hit) => (
               <ProductCard key={hit.handle}>
                  <ProductCardImage src={hit.product_image} alt={hit.title} />
                  <ProductCardBody>
                     <ProductCardTitle>{hit.title}</ProductCardTitle>
                     <ProductCardPrice price={hit.price} />
                     <Button
                        colorScheme="brand"
                        display={{
                           base: 'block',
                           sm: 'none',
                        }}
                     >
                        Buy now
                     </Button>
                  </ProductCardBody>
               </ProductCard>
            ))}
         </SimpleGrid>
      );
   }
   return (
      <VStack spacing={2} align="stretch" width="full" px={10} py={4}>
         {hits.map((hit) => {
            const isDiscounted =
               hit.compare_at_price != null && hit.compare_at_price > hit.price;
            return (
               <HStack key={hit.handle} spacing={4} py={4}>
                  <Img
                     boxSize="160px"
                     flexShrink={0}
                     display="block"
                     src={hit.product_image}
                     alt={hit.title}
                  />
                  <VStack align="flex-start" spacing={4}>
                     <Heading as="h2" size="md">
                        {hit.title}
                     </Heading>
                     <Text noOfLines={2}>{hit.body_html_safe}</Text>
                     <HStack>
                        {isDiscounted && (
                           <Text textDecoration="line-through" color="gray.400">
                              ${hit.compare_at_price}
                           </Text>
                        )}
                        <Text
                           color={isDiscounted ? 'red.700' : 'inherit'}
                           fontWeight="bold"
                        >
                           ${hit.price}
                        </Text>
                     </HStack>
                  </VStack>
               </HStack>
            );
         })}
      </VStack>
   );
}
