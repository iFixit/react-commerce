import {
   Box,
   Button,
   Center,
   Flex,
   Heading,
   Img,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Card } from '@components/Card';
import NextLink from 'next/link';
import * as React from 'react';

export interface FeaturedCollectionSection {
   title: string;
   description: string;
   callToActionLabel: string;
   url: string;
   imageSrc?: string;
   imageAlt?: string;
}

export function FeaturedCollectionSection({
   title,
   description,
   callToActionLabel,
   url,
   imageAlt,
   imageSrc,
}: FeaturedCollectionSection) {
   return (
      <Card overflow="hidden">
         <Flex>
            <Box position="relative">
               {imageSrc && (
                  <Img
                     objectFit="cover"
                     h="250px"
                     src={imageSrc}
                     alt={imageAlt}
                  />
               )}
               <Center
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  h="100%"
                  bg="blackAlpha.700"
               >
                  <VStack px="14" align="flex-start" spacing="4">
                     <Heading
                        size="lg"
                        fontFamily="Archivo Black"
                        color="white"
                     >
                        {title}
                     </Heading>
                     <Text color="white" noOfLines={2}>
                        {description}
                     </Text>
                     <NextLink href={url} passHref>
                        <Button
                           as="a"
                           variant="outline"
                           color="white"
                           fontSize="sm"
                        >
                           {callToActionLabel}
                        </Button>
                     </NextLink>
                  </VStack>
               </Center>
            </Box>
            <Box bg="green.100" flexGrow={1}>
               <p>Products</p>
            </Box>
         </Flex>
      </Card>
   );
}
