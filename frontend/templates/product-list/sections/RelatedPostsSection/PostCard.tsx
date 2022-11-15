import {
   Box,
   Flex,
   LinkBox,
   LinkOverlay,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Card } from '@components/ui';
import { ResizableImage } from '@ifixit/ui';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import * as React from 'react';

export interface PostCardProps {
   title: string;
   category?: string;
   imageSrc?: string;
   imageAlt?: string;
   link: string;
   date?: Date | string | number;
}

export function PostCard({
   title,
   category,
   imageSrc,
   imageAlt,
   link,
   date,
}: PostCardProps) {
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
               <Box position="relative" h="140px">
                  <ResizableImage
                     src={imageSrc}
                     alt={imageAlt}
                     layout="fill"
                     objectFit="cover"
                     sizes="50vw"
                  />
               </Box>
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
                     <Text
                        as="h3"
                        fontSize="lg"
                        fontWeight="bold"
                        lineHeight="shorter"
                     >
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
