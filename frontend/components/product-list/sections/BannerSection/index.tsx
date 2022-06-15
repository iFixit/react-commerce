import { LifetimeWarrantyIcon } from '@assets/svg';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';
import backgroundImage from './lifetime-guarantee-background.jpg';
import { IfixitImage } from '@components/ifixit-image';

export interface BannerSectionProps {
   title: string;
   description: string;
   callToActionLabel: string;
   url: string;
}

export function BannerSection({
   title,
   description,
   callToActionLabel,
   url,
}: BannerSectionProps) {
   return (
      <Box
         as="section"
         borderRadius={{
            base: 'none',
            sm: '2xl',
         }}
         overflow="hidden"
         position="relative"
      >
         <IfixitImage
            src={backgroundImage}
            alt=""
            layout="fill"
            objectFit="cover"
         />
         <Flex
            p={{
               base: 10,
               md: 20,
            }}
            bgGradient="linear(to-r, blackAlpha.600, blackAlpha.400)"
            justify="space-between"
            align="center"
            position="relative"
         >
            <Flex alignItems="flex-start" direction="column">
               <Text
                  as="h2"
                  fontSize="4xl"
                  fontFamily="Archivo Black"
                  color="white"
                  mb={2}
               >
                  {title}
               </Text>
               <Text
                  color="white"
                  maxW="500px"
                  pr={4}
                  mb={{
                     base: 4,
                     sm: 10,
                  }}
               >
                  {description}
               </Text>
               <Flex w="full" justify="space-between" align="center">
                  <NextLink href={url} passHref>
                     <Button as="a">{callToActionLabel}</Button>
                  </NextLink>
                  <Icon
                     as={LifetimeWarrantyIcon}
                     boxSize="120px"
                     color="white"
                     display={{
                        base: 'block',
                        sm: 'none',
                     }}
                     bg="rgba(36, 44, 51, 0.09)"
                     backdropFilter="auto"
                     backdropBlur="16px"
                     borderRadius="full"
                  />
               </Flex>
            </Flex>
            <Icon
               as={LifetimeWarrantyIcon}
               boxSize={{ base: '130px', md: '160px', lg: '190px' }}
               color="white"
               display={{
                  base: 'none',
                  sm: 'block',
               }}
               bg="rgba(36, 44, 51, 0.09)"
               backdropFilter="auto"
               backdropBlur="16px"
               borderRadius="full"
            />
         </Flex>
      </Box>
   );
}
