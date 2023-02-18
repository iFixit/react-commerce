import { QualityGuarantee } from '@assets/svg/files';
import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { ResponsiveImage } from '@ifixit/ui';
import NextLink from 'next/link';
import backgroundImage from './lifetime-guarantee-background.jpg';

export interface BannerSectionProps {
   title: string;
   description: string;
   callToActionLabel: string;
   url: string;
}

export function BannerSection({
   title,
   description,
   callToActionLabel,
   url,
}: BannerSectionProps) {
   return (
      <Box
         as="section"
         borderRadius={{
            base: 'none',
            sm: '2xl',
         }}
         overflow="hidden"
         position="relative"
      >
         <ResponsiveImage
            src={backgroundImage}
            alt=""
            layout="fill"
            objectFit="cover"
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
                  {title}
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
                  {description}
               </Text>
               <Flex w="full" justify="space-between" align="center">
                  <NextLink href={url} passHref>
                     <Button as="a">{callToActionLabel}</Button>
                  </NextLink>
               </Flex>
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
