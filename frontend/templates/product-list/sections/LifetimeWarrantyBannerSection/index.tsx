import { QualityGuarantee } from '@assets/svg/files';
import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { LinkButton } from '@components/ui/LinkButton';
import { isPresent } from '@ifixit/helpers';
import { ResponsiveImage } from '@ifixit/ui';
import type { CallToAction } from '@models/components/call-to-action';
import backgroundImage from './lifetime-guarantee-background.jpg';

export interface LifetimeWarrantyBannerSectionProps {
   title?: string | null;
   description?: string | null;
   callToAction?: CallToAction | null;
}

export function LifetimeWarrantyBannerSection({
   title,
   description,
   callToAction,
}: LifetimeWarrantyBannerSectionProps) {
   const sectionTitle = isPresent(title) ? title : 'Lifetime Guarantee';
   const sectionDescription = isPresent(description)
      ? description
      : "We stand behind our tools. If something breaks, we'll replace it—for as long as you own the iFixit tool.";

   return (
      <Box
         as="section"
         borderRadius="base"
         overflow="hidden"
         position="relative"
      >
         <ResponsiveImage
            src={backgroundImage}
            alt=""
            fill
            style={{
               objectFit: 'cover',
            }}
         />
         <Flex
            px={{
               base: 6,
               md: 20,
            }}
            py={{
               base: 16,
               md: 20,
            }}
            bgGradient="linear(to-r, blackAlpha.600, blackAlpha.400)"
            justify="space-between"
            align="center"
            position="relative"
         >
            <Flex alignItems="flex-start" direction="column">
               <Icon
                  as={QualityGuarantee}
                  boxSize="140px"
                  color="white"
                  display={{
                     base: 'block',
                     sm: 'none',
                  }}
                  mb="10"
               />
               <Heading
                  as="h2"
                  color="white"
                  mb="3"
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontWeight="medium"
               >
                  {sectionTitle}
               </Heading>

               <Text
                  color="white"
                  maxW="500px"
                  pr={4}
                  mb={{
                     base: 4,
                     sm: 10,
                  }}
               >
                  {sectionDescription}
               </Text>
               {callToAction && (
                  <Flex w="full" justify="space-between" align="center">
                     <LinkButton href={callToAction.url}>
                        {callToAction.title}
                     </LinkButton>
                  </Flex>
               )}
            </Flex>
            <Icon
               as={QualityGuarantee}
               boxSize={{ base: '130px', md: '160px' }}
               color="white"
               display={{
                  base: 'none',
                  sm: 'block',
               }}
            />
         </Flex>
      </Box>
   );
}
