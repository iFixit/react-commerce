import { Button, Center, SimpleGrid, Text } from '@chakra-ui/react';
import {
   ProductCard,
   ProductCardBody,
   ProductCardImage,
   ProductCardPrice,
   ProductCardTitle,
} from '@components/ProductCard';
import { Hit } from '@features/collection';
import { useSearchResult } from '@libs/algolia';
import React from 'react';

export function CollectionProducts() {
   const searchResult = useSearchResult<Hit>();

   if (searchResult.hits.length === 0) {
      return (
         <Center minH="300px">
            <Text>No results</Text>
         </Center>
      );
   }
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
         {searchResult.hits.map((hit) => (
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
