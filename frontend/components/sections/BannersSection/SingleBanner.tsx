import { Box, Button, Text } from '@chakra-ui/react';
import { ResponsiveImage, Wrapper } from '@ifixit/ui';
import type { Banner } from '@models/components/banner';
import NextLink from 'next/link';
import { SectionDescription } from '../SectionDescription';
import { SectionHeading } from '../SectionHeading';

interface SingleBannerProps {
   banner: Banner;
}

export function SingleBanner({ banner }: SingleBannerProps) {
   return (
      <Box as="section" position="relative" w="full" pt="36" pb="16">
         <Box
            position="absolute"
            bgGradient="linear(to-r, blackAlpha.600 50%, blackAlpha.400)"
            zIndex={-1}
            top="0"
            left="0"
            bottom="0"
            right="0"
         />
         {banner.image && (
            <Box
               position="absolute"
               zIndex={-2}
               top="0"
               left="0"
               bottom="0"
               right="0"
            >
               <ResponsiveImage
                  src={banner.image.url}
                  alt=""
                  layout="fill"
                  objectFit="cover"
               />
            </Box>
         )}
         <Wrapper>
            <Box textAlign="center">
               {banner.label && (
                  <Text color="white" mb="3" fontSize="sm">
                     {banner.label}
                  </Text>
               )}
               {banner.title && (
                  <SectionHeading color="white" mb="2.5">
                     {banner.title}
                  </SectionHeading>
               )}
               {banner.description && (
                  <SectionDescription
                     richText={banner.description}
                     color="white"
                     maxW="750px"
                     mx="auto"
                  />
               )}
               {banner.callToAction && (
                  <NextLink href={banner.callToAction.url} passHref>
                     <Button as="a" colorScheme="brand" mt="10">
                        {banner.callToAction.title}
                     </Button>
                  </NextLink>
               )}
            </Box>
         </Wrapper>
      </Box>
   );
}
