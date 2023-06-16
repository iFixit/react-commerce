import { Box } from '@chakra-ui/react';
import { SectionDescription } from '@components/sections/SectionDescription';
import { SectionHeading } from '@components/sections/SectionHeading';
import { LinkButton } from '@components/ui/LinkButton';
import { SmartLink } from '@components/ui/SmartLink';
import { Wrapper } from '@ifixit/ui';
import type { HeroSection } from '@models/page/sections/hero-section';
import Image from 'next/image';

export interface HeroSectionProps {
   data: HeroSection;
}

export function HeroSection({
   data: { title, description, image, callToAction },
}: HeroSectionProps) {
   return (
      <Box as="section" position="relative" w="full">
         {image && (
            <Box position="absolute" zIndex={-2} w="full" h="full">
               <Image
                  src={image.url}
                  alt="store hero image"
                  priority
                  fill
                  style={{
                     objectFit: 'cover',
                  }}
               />
            </Box>
         )}
         <Box
            position="absolute"
            zIndex={-1}
            bgGradient="linear-gradient(to-t, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.1) 100%)"
            w="full"
            h="full"
         />
         <Wrapper pt="200px" pb="16">
            <Box textAlign="center">
               {title && (
                  <SectionHeading color="white" mb="3">
                     {title}
                  </SectionHeading>
               )}
               {description && (
                  <SectionDescription richText={description} color="gray.100" />
               )}
               {callToAction && (
                  <SmartLink
                     as={LinkButton}
                     href={callToAction.url}
                     colorScheme="brand"
                     mt="12"
                  >
                     {callToAction.title}
                  </SmartLink>
               )}
            </Box>
         </Wrapper>
      </Box>
   );
}
