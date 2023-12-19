import { Box, Center, Text } from '@chakra-ui/react';
import { LinkButton } from '@components/ui/LinkButton';
import { SmartLink } from '@components/ui/SmartLink';
import { ResponsiveImage, Wrapper } from '@ifixit/ui';
import type { Banner } from '@models/components/banner';
import { SectionDescription } from '../SectionDescription';
import { SectionHeading } from '../SectionHeading';

interface SingleBannerProps {
   id: string;
   banner: Banner;
}

export function SingleBanner({ id, banner }: SingleBannerProps) {
   return (
      <Center as="section" id={id} position="relative" w="full" minH="390px">
         <Box
            position="absolute"
            bgGradient="linear(to-r, blackAlpha.600 50%, blackAlpha.400)"
            zIndex={-1}
            top="0"
            right="0"
            bottom="0"
            left="0"
         />
         {banner.image && (
            <Box
               position="absolute"
               zIndex={-2}
               top="0"
               right="0"
               bottom="0"
               left="0"
            >
               <ResponsiveImage
                  src={banner.image.url}
                  alt=""
                  fill
                  style={{
                     objectFit: 'cover',
                  }}
               />
            </Box>
         )}
         <Wrapper position="relative" textAlign="center">
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
               <Box
                  position="absolute"
                  w="full"
                  bottom="-20"
                  left="50%"
                  transform="translateX(-50%)"
               >
                  <SmartLink
                     as={LinkButton}
                     href={banner.callToAction.url}
                     colorScheme="brand"
                  >
                     {banner.callToAction.title}
                  </SmartLink>
               </Box>
            )}
         </Wrapper>
      </Center>
   );
}
