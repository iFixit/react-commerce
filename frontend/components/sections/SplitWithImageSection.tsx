'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { LinkButton } from '@components/ui/LinkButton';
import { SmartLink } from '@components/ui/SmartLink';
import { ResponsiveImage, Wrapper } from '@ifixit/ui';
import type { CallToAction } from '@models/components/call-to-action';
import type { Image } from '@models/components/image';
import type { SplitWithImageSection } from '@models/sections/split-with-image-section';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';

export interface SplitWithImageContentSectionProps {
   id: string;
   title?: string | null;
   label?: string | null;
   description?: string | null;
   image?: Image | null;
   imagePosition?: SplitWithImageSection['imagePosition'];
   callToAction?: CallToAction | null;
}

export function SplitWithImageContentSection({
   id,
   title,
   label,
   description,
   image,
   imagePosition,
   callToAction,
}: SplitWithImageContentSectionProps) {
   const isImageLeft = imagePosition === 'left';
   return (
      <Box as="section" id={id} position="relative" w="full">
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
                  style={{
                     objectFit: 'cover',
                  }}
                  fill
               />
            </Box>
         )}
         <Wrapper>
            <Flex justify={isImageLeft ? 'flex-end' : 'flex-start'}>
               <Box
                  py={{
                     base: '10',
                     md: '36',
                  }}
                  w={{
                     base: 'full',
                     md: '50%',
                  }}
                  pl={{ base: 0, md: isImageLeft ? '32' : undefined }}
                  pr={{ base: 0, md: isImageLeft ? undefined : '32' }}
               >
                  {label && (
                     <Text color="brand.500" fontSize="sm" fontFamily="mono">
                        {label}
                     </Text>
                  )}
                  {title && <SectionHeading mb="4">{title}</SectionHeading>}
                  {description && <SectionDescription richText={description} />}
                  {callToAction && (
                     <SmartLink
                        as={LinkButton}
                        href={callToAction.url}
                        colorScheme="brand"
                        mt="6"
                     >
                        {callToAction.title}
                     </SmartLink>
                  )}
               </Box>
            </Flex>
         </Wrapper>
      </Box>
   );
}
