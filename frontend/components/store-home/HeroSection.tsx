import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import storeHomeHeroImage from '@images/store-home-hero.jpeg';
import Image from 'next/image';
import { PageContentWrapper } from './PageContentWrapper';

export function HeroSection() {
   return (
      <Box as="section" position="relative" w="full">
         <Box position="absolute" zIndex={-2} w="full" h="full">
            <Image
               src={storeHomeHeroImage.src}
               alt="store hero image"
               priority
               layout="fill"
               objectFit="cover"
            />
         </Box>
         <Box
            position="absolute"
            zIndex={-1}
            bgGradient="linear-gradient(to-t, rgba(36, 44, 51, 0.5) 34.9%, rgba(36, 44, 51, 0) 100%)"
            w="full"
            h="full"
         />
         <PageContentWrapper py="16">
            <VStack align="flex-start">
               <Heading
                  as="h2"
                  fontFamily="Archivo Black"
                  size="xl"
                  color="white"
               >
                  For You and <br /> Your Favorite Fixers
               </Heading>
               <Text color="blue.100">
                  Our best sale of the year with exclusive bundles.
               </Text>
               <Button colorScheme="brand">Save now</Button>
            </VStack>
         </PageContentWrapper>
      </Box>
   );
}
