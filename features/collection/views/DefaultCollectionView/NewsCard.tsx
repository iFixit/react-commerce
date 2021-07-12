import {
   Flex,
   Image,
   LinkBox,
   LinkOverlay,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Card } from '@components/Card';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import * as React from 'react';

export interface NewsCardProps {
   title: string;
   category?: string;
   imageSrc?: string;
   imageAlt?: string;
   link: string;
   date?: Date | string | number;
}

export function NewsCard({
   title,
   category,
   imageSrc,
   imageAlt,
   link,
   date,
}: NewsCardProps) {
   return (
      <LinkBox
         bg="white"
         as={Card}
         overflow="hidden"
         _hover={{
            boxShadow: 'md',
         }}
         transition="all 300ms"
      >
         <Flex direction="column">
            {imageSrc && (
               <Image
                  objectFit="cover"
                  h="140px"
                  src={imageSrc}
                  alt={imageAlt}
               />
            )}
            <VStack spacing="2" p="4" align="flex-start">
               {category && category.length > 0 && (
                  <Text
                     color="brand.500"
                     fontSize="xs"
                     fontWeight="bold"
                     textTransform="uppercase"
                  >
                     {category}
                  </Text>
               )}
               <NextLink href={link} passHref>
                  <LinkOverlay>
                     <Text as="h3" fontSize="lg" fontWeight="bold">
                        {title}
                     </Text>
                  </LinkOverlay>
               </NextLink>
               <Text fontFamily="mono" fontSize="sm" color="gray.600">
                  {dayjs(date).format('MMMM D, YYYY')}
               </Text>
            </VStack>
         </Flex>
      </LinkBox>
   );
}
