import { Box, Button } from '@chakra-ui/react';
import { PageContentWrapper } from '@ifixit/ui';
import { GetSection } from '@models/page';
import Image from 'next/image';
import NextLink from 'next/link';
import { SectionDescription } from '../components/SectionDescription';
import { SectionHeading } from '../components/SectionHeading';

export interface HeroSectionProps {
   data: GetSection<'ComponentPageHero'>;
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
            bgGradient="linear-gradient(to-t, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.1) 100%)"
            w="full"
            h="full"
         />
         <PageContentWrapper
            pt="200px"
            pb="16"
            px={{
               base: 4,
               md: 0,
            }}
         >
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
                  <NextLink href={callToAction.url} passHref>
                     <Button as="a" colorScheme="brand" mt="12">
                        {callToAction.title}
                     </Button>
                  </NextLink>
               )}
            </Box>
         </PageContentWrapper>
      </Box>
   );
}
