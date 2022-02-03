import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import {
   SplitImagePosition,
   SplitWithImageContentSection as SectionData,
} from '@models/page';
import Image from 'next/image';
import { PageContentWrapper } from './PageContentWrapper';

export interface SplitWithImageContentSectionProps {
   data: SectionData;
}

export function SplitWithImageContentSection({
   data,
}: SplitWithImageContentSectionProps) {
   const isImageLeft = data.imagePosition === SplitImagePosition.Left;
   return (
      <Box as="section" position="relative" w="full">
         {data.image && (
            <Box
               w="50%"
               position="absolute"
               h="full"
               right={isImageLeft ? undefined : '0'}
            >
               <Image
                  src={data.image.url}
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
                  {data.title && (
                     <Heading as="h2" fontFamily="Archivo Black" size="lg">
                        {data.title}
                     </Heading>
                  )}
                  {data.description && (
                     <Text
                        color="gray.600"
                        dangerouslySetInnerHTML={{
                           __html: data.description,
                        }}
                     />
                  )}
                  {data.callToAction && (
                     <Button colorScheme="brand">
                        {data.callToAction.title}
                     </Button>
                  )}
               </VStack>
            </Flex>
         </PageContentWrapper>
      </Box>
   );
}
