import { Box, Button, VStack } from '@chakra-ui/react';
import { HeroSection as SectionData } from '@models/page';
import Image from 'next/image';
import NextLink from 'next/link';
import { PageContentWrapper } from './PageContentWrapper';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';

export interface HeroSectionProps {
   data: SectionData;
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
                  layout="fill"
                  objectFit="cover"
               />
            </Box>
         )}
         <Box
            position="absolute"
            zIndex={-1}
            bgGradient="linear-gradient(to-t, rgba(36, 44, 51, 0.5) 34.9%, rgba(36, 44, 51, 0) 100%)"
            w="full"
            h="full"
         />
         <PageContentWrapper py="16">
            <VStack align="flex-start">
               {title && <SectionHeading color="white">{title}</SectionHeading>}
               {description && (
                  <SectionDescription richText={description} color="blue.100" />
               )}
               {callToAction && (
                  <NextLink href={callToAction.url} passHref>
                     <Button as="a" colorScheme="brand">
                        {callToAction.title}
                     </Button>
                  </NextLink>
               )}
            </VStack>
         </PageContentWrapper>
      </Box>
   );
}
