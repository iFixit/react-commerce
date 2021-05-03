import {
   Center,
   Flex,
   Heading,
   Image,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Collection } from '@features/collection';
import NextLink from 'next/link';
import React from 'react';

export type CollectionSubcategoriesProps = {
   collection: Collection;
};

export function CollectionSubcategories({
   collection,
}: CollectionSubcategoriesProps) {
   return (
      <VStack spacing={6} align="stretch">
         <Text fontSize="lg" fontWeight="bold">
            Choose a model of {collection.title}
         </Text>
         <SimpleGrid columns={4} spacing={6}>
            {collection.children.map((child) => {
               return (
                  <LinkBox
                     key={child.handle}
                     bg="white"
                     borderRadius="lg"
                     overflow="hidden"
                     boxShadow="sm"
                     _hover={{
                        boxShadow: 'md',
                     }}
                     transition="all 300ms"
                  >
                     <Flex direction="column">
                        {collection.children.length <= 10 && (
                           <Image
                              objectFit="cover"
                              h="180px"
                              src={child.image.url}
                              alt={child.image.alt}
                              display={{
                                 base: 'none',
                                 md: 'block',
                              }}
                           />
                        )}
                        <Center py={4}>
                           <NextLink
                              href={`/collections/${child.handle}`}
                              passHref
                           >
                              <LinkOverlay>
                                 <Heading as="h2" size="sm">
                                    {child.title}
                                 </Heading>
                              </LinkOverlay>
                           </NextLink>
                        </Center>
                     </Flex>
                  </LinkBox>
               );
            })}
         </SimpleGrid>
      </VStack>
   );
}
