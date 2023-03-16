import {
   Box,
   Flex,
   LinkBox,
   LinkOverlay,
   Text,
   VStack,
} from '@chakra-ui/react';
import { FaIcon } from '@ifixit/icons';
import { faImage } from '@fortawesome/pro-duotone-svg-icons';
import { ResponsiveImage } from '@ifixit/ui';
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
         borderWidth="1px"
         borderStyle="solid"
         borderColor="gray.300"
         borderRadius="base"
         _hover={{ borderColor: 'brand.300', borderWidth: '1px' }}
         overflow="hidden"
         transition="all 300ms"
      >
         <Flex direction="column">
            {imageSrc ? (
               <Box position="relative" h={{ base: '36', md: '40' }}>
                  <ResponsiveImage
                     src={imageSrc}
                     alt={imageAlt}
                     layout="fill"
                     objectFit="cover"
                     sizes="50vw"
                  />
               </Box>
            ) : (
               <Flex
                  bgColor="brand.100"
                  h={{ base: '36', md: '40' }}
                  alignItems="center"
                  justifyContent="center"
               >
                  <FaIcon icon={faImage} h="12" color="brand.200" />
               </Flex>
            )}
            <VStack spacing="3" p="4" align="flex-start">
               {category && category.length > 0 && (
                  <Text color="brand.500" fontWeight="medium">
                     {category}
                  </Text>
               )}
               <VStack spacing="1" align="flex-start">
                  <NextLink href={link} passHref>
                     <LinkOverlay>
                        <Text as="h3" fontWeight="medium" lineHeight="shorter">
                           {title}
                        </Text>
                     </LinkOverlay>
                  </NextLink>
                  <Text fontSize="sm" color="gray.600">
                     {dayjs(date).format('MMMM D, YYYY')}
                  </Text>
               </VStack>
            </VStack>
         </Flex>
      </LinkBox>
   );
}
