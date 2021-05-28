import { LifetimeWarrantyIcon } from '@assets/svg';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';

export interface CollectionBannerProps {}

export function CollectionBanner() {
   return (
      <Box
         borderRadius={{
            base: 'none',
            sm: '2xl',
         }}
         overflow="hidden"
         bgImage="url('/images/lifetime-guarantee-background.jpg')"
         bgPosition="center"
         bgRepeat="no-repeat"
         bgSize="cover"
      >
         <Flex
            p={{
               base: 10,
               md: 20,
            }}
            bgGradient="linear(to-r, blackAlpha.600, blackAlpha.400)"
            justify="space-between"
            align="center"
         >
            <Flex alignItems="flex-start" direction="column">
               <Text
                  fontSize="4xl"
                  fontFamily="Archivo Black"
                  color="white"
                  mb={2}
               >
                  Lifetime guarantee
               </Text>
               <Text color="white" maxW="500px" pr={4} mb={10}>
                  We stand behind our tools. If something breaks, we’ll replace
                  it—for as long as you own the iFixit tool.
               </Text>
               <Flex w="full" justify="space-between" align="center">
                  <NextLink
                     href="https://www.ifixit.com/Info/Warranty"
                     passHref
                  >
                     <Button as="a">Learn more</Button>
                  </NextLink>
                  <Icon
                     as={LifetimeWarrantyIcon}
                     boxSize="90px"
                     color="white"
                     display={{
                        base: 'block',
                        sm: 'none',
                     }}
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
            />
         </Flex>
      </Box>
   );
}
