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
               w={{
                  base: 'full',
                  md: '50%',
               }}
               position={{
                  base: 'relative',
                  md: 'absolute',
               }}
               h={{
                  base: '340px',
                  md: 'full',
               }}
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
                  py={{
                     base: '10',
                     md: '36',
                  }}
                  spacing="7"
                  w={{
                     base: 'full',
                     md: '50%',
                  }}
                  pl={{ base: 0, md: isImageLeft ? '32' : undefined }}
                  pr={{ base: 0, md: isImageLeft ? undefined : '32' }}
               >
                  {title && <SectionHeading>{title}</SectionHeading>}
                  {description && <SectionDescription richText={description} />}
                  {callToAction && (
                     <NextLink href={callToAction.url} passHref>
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
