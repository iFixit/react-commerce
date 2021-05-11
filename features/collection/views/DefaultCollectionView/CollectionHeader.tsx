import {
   Box,
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   chakra,
   Flex,
   Heading,
   HStack,
   Icon,
   Image,
   Text,
   VStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { Collection } from '../../types';
import NextLink from 'next/link';

export type CollectionHeaderProps = {
   collection: Collection;
};

export function CollectionHeader({ collection }: CollectionHeaderProps) {
   if (collection.image == null) {
      return (
         <VStack align="flex-start" width="full" px={{ base: 6, sm: 0 }}>
            <CollectionBreadcrumb collection={collection} />
            <Heading size="xl" fontFamily="Archivo Black">
               {collection.title}
            </Heading>
            {collection.description != null &&
               collection.description.length > 0 && (
                  <Text noOfLines={{ base: 5, md: 7, lg: 10 }}>
                     {collection.description}
                  </Text>
               )}
         </VStack>
      );
   }
   if (collection.description == null || collection.description.length === 0) {
      return (
         <VStack align="stretch" px={{ base: 6, sm: 0 }}>
            <CollectionBreadcrumb
               collection={collection}
               px={{ base: 6, sm: 0 }}
            />
            <Box
               backgroundImage={`url("${collection.image.url}")`}
               backgroundSize="cover"
               m={{
                  base: 0,
                  sm: 4,
               }}
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
         </VStack>
      );
   }
   return (
      <HStack align="flex-start" spacing={10} px={{ base: 6, sm: 0 }}>
         <VStack flex={1} align="flex-start">
            <CollectionBreadcrumb collection={collection} />
            <Heading size="xl" fontFamily="Archivo Black">
               {collection.title}
            </Heading>
            <Text noOfLines={{ base: 5, md: 7, lg: 10 }}>
               {collection.description}
            </Text>
         </VStack>
         <Image
            flex={1}
            boxSize="274px"
            objectFit="cover"
            src={collection.image.url}
            alt={collection.image.alt}
            borderRadius="lg"
            display={{
               base: 'none',
               md: 'block',
            }}
         />
      </HStack>
   );
}

type CollectionBreadcrumbProps = {
   className?: string;
   collection: Collection;
};

const CollectionBreadcrumb = chakra(
   ({ className, collection }: CollectionBreadcrumbProps) => {
      return (
         <Breadcrumb
            className={className}
            spacing={2}
            separator={<Icon as={HiChevronRight} color="gray.300" />}
         >
            {collection.ancestors.map((ancestor, index) => {
               return (
                  <BreadcrumbItem key={index}>
                     <NextLink href={`/collections/${ancestor.handle}`}>
                        <BreadcrumbLink color="gray">
                           {ancestor.title}
                        </BreadcrumbLink>
                     </NextLink>
                  </BreadcrumbItem>
               );
            })}
            <BreadcrumbItem isCurrentPage>
               <Text color="black">{collection.title}</Text>
            </BreadcrumbItem>
         </Breadcrumb>
      );
   }
);
