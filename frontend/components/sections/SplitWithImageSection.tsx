import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { ResponsiveImage, Wrapper } from '@ifixit/ui';
import type { SplitWithImageSection } from '@models/shared/sections/split-with-image-section';
import NextLink from 'next/link';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';

export interface SplitWithImageContentSectionProps {
   data: SplitWithImageSection;
}

export function SplitWithImageContentSection({
   data: { title, description, image, imagePosition, callToAction },
}: SplitWithImageContentSectionProps) {
   const isImageLeft = imagePosition === 'left';
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
               <ResponsiveImage
                  src={image.url}
                  alt={image.altText ?? ''}
                  objectFit="cover"
                  layout="fill"
               />
            </Box>
         )}
         <Wrapper>
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
         </Wrapper>
      </Box>
   );
}
