import {
   Divider,
   Flex,
   Heading,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import * as React from 'react';

export type FeaturedSubcollectionsSectionProps = {
   title: string;
   collections: Collection[];
};

interface Collection {
   handle: string;
   title: string;
   image?: {
      url: string;
      alt?: string;
   } | null;
}

export function FeaturedSubcollectionsSection({
   title,
   collections,
}: FeaturedSubcollectionsSectionProps) {
   return (
      <VStack
         spacing="6"
         align="stretch"
         px={{
            base: 6,
            sm: 0,
         }}
      >
         <Heading size="lg">{title}</Heading>
         <SimpleGrid
            columns={{
               base: 1,
               sm: 2,
               md: 3,
            }}
            spacing="4"
         >
            {collections.map((collection) => {
               return (
                  <CollectionLink
                     key={collection.handle}
                     collection={collection}
                  />
               );
            })}
         </SimpleGrid>
      </VStack>
   );
}

interface CategoryLinkProps {
   collection: Collection;
}

const CollectionLink = ({ collection }: CategoryLinkProps) => {
   return (
      <LinkBox
         bg="white"
         borderRadius="lg"
         overflow="hidden"
         boxShadow="base"
         _hover={{
            boxShadow: 'md',
         }}
         transition="all 300ms"
      >
         <Flex h="full" direction="row" align="center" justifyContent="center">
            {collection.image && (
               <Flex
                  align="center"
                  justify="center"
                  flexBasis="80px"
                  h="60px"
                  flexGrow={0}
                  flexShrink={0}
               >
                  <Image
                     src={collection.image.url}
                     alt={collection.image.alt}
                     width="80px"
                     height="60px"
                     objectFit="contain"
                  />
               </Flex>
            )}
            <Divider orientation="vertical" />
            <NextLink href={`/collections/${collection.handle}`} passHref>
               <LinkOverlay
                  px="3"
                  py="2"
                  boxSizing="border-box"
                  h="full"
                  display="flex"
                  alignItems="center"
                  flexGrow={1}
               >
                  <Heading as="h3" fontSize="sm">
                     {collection.title}
                  </Heading>
               </LinkOverlay>
            </NextLink>
         </Flex>
      </LinkBox>
   );
};
