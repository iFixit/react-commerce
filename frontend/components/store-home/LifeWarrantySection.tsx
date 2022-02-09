import backgroundImage from '@assets/images/lifetime-guarantee-background.jpg';
import { LifetimeWarrantyIcon } from '@assets/svg';
import { Box, Button, Flex, Icon } from '@chakra-ui/react';
import { LifetimeWarrantySection as SectionData } from '@models/page';
import Image from 'next/image';
import NextLink from 'next/link';
import { PageContentWrapper } from './PageContentWrapper';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';

export interface LifetimeWarrantySectionProps {
   data: SectionData;
}

export function LifetimeWarrantySection({
   data: { title, description, callToAction },
}: LifetimeWarrantySectionProps) {
   return (
      <Box as="section" position="relative" w="full" py="16">
         <Box
            position="absolute"
            bgGradient="linear(to-r, blackAlpha.600 50%, blackAlpha.400)"
            zIndex={-1}
            top="0"
            left="0"
            bottom="0"
            right="0"
         />
         <Box
            position="absolute"
            zIndex={-2}
            top="0"
            left="0"
            bottom="0"
            right="0"
         >
            <Image
               src={backgroundImage}
               alt=""
               layout="fill"
               objectFit="cover"
            />
         </Box>
         <PageContentWrapper>
            <Flex justify="space-between" align="center">
               <Box>
                  {title && (
                     <SectionHeading color="white" mb="2.5">
                        {title}
                     </SectionHeading>
                  )}
                  {description && (
                     <SectionDescription
                        richText={description}
                        color="blue.100"
                        maxW="750px"
                     />
                  )}
                  {callToAction && (
                     <NextLink href={callToAction.url} passHref prefetch>
                        <Button as="a" mt="10">
                           {callToAction.title}
                        </Button>
                     </NextLink>
                  )}
               </Box>
               <Icon
                  as={LifetimeWarrantyIcon}
                  boxSize={{ base: '130px', md: '110px', lg: '120px' }}
                  color="white"
                  display={{
                     base: 'none',
                     sm: 'block',
                  }}
                  bg="rgba(36, 44, 51, 0.09)"
                  backdropFilter="auto"
                  backdropBlur="16px"
                  borderRadius="full"
               />
            </Flex>
         </PageContentWrapper>
      </Box>
   );
}
