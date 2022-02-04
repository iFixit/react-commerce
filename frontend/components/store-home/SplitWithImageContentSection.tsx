import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import {
   SplitImagePosition,
   SplitWithImageContentSection as SectionData,
} from '@models/page';
import Image from 'next/image';
import { PageContentWrapper } from './PageContentWrapper';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';
import NextLink from 'next/link';

export interface SplitWithImageContentSectionProps {
   data: SectionData;
}

export function SplitWithImageContentSection({
   data: { title, description, image, imagePosition, callToAction },
}: SplitWithImageContentSectionProps) {
   const isImageLeft = imagePosition === SplitImagePosition.Left;
   return (
      <Box as="section" position="relative" w="full">
         {image && (
            <Box
               w="50%"
               position="absolute"
               h="full"
               right={isImageLeft ? undefined : '0'}
            >
               <Image
                  src={image.url}
                  alt="store hero image"
                  priority
                  layout="fill"
                  objectFit="cover"
               />
            </Box>
         )}
         <PageContentWrapper>
            <Flex justify={isImageLeft ? 'flex-end' : 'flex-start'}>
               <VStack
                  align="flex-start"
                  py="36"
                  spacing="7"
                  w="50%"
                  pl={isImageLeft ? '32' : undefined}
                  pr={isImageLeft ? undefined : '32'}
               >
                  {title && <SectionHeading>{title}</SectionHeading>}
                  {description && <SectionDescription richText={description} />}
                  {callToAction && (
                     <NextLink href={callToAction.url} passHref prefetch>
                        <Button as="a" colorScheme="brand">
                           {callToAction.title}
                        </Button>
                     </NextLink>
                  )}
               </VStack>
            </Flex>
         </PageContentWrapper>
      </Box>
   );
}
