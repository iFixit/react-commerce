import {
   Box,
   Center,
   Flex,
   Heading,
   Image,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   VStack,
} from '@chakra-ui/react';
import { Collection } from '@features/collection';
import { DefaultLayout } from '@layouts/DefaultLayout';
import NextLink from 'next/link';
import * as React from 'react';

export type PartsCollectionViewProps = {
   collection: Collection;
};

export function PartsCollectionView(props: PartsCollectionViewProps) {
   return (
      <DefaultLayout title={`iFixit | ${props.collection.title}`}>
         <View {...props} />
      </DefaultLayout>
   );
}

function View({ collection }: PartsCollectionViewProps) {
   return (
      <VStack
         w={{ base: 'full', lg: '960px', xl: '1100px' }}
         mx="auto"
         align="stretch"
         py={10}
         spacing={12}
      >
         <Box
            backgroundImage={
               collection.image ? `url("${collection.image.url}")` : undefined
            }
            backgroundSize="cover"
            borderRadius={{
               base: 0,
               sm: 'xl',
            }}
            overflow="hidden"
         >
            <Flex
               grow={1}
               bgColor="blackAlpha.800"
               align="center"
               justify="center"
               py={20}
            >
               <Heading color="white" size="xl" fontFamily="Archivo Black">
                  {collection.title}
               </Heading>
            </Flex>
         </Box>
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
                        {child.image && (
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
