import { QualityGuarantee } from '@assets/svg/files';
import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { useAppContext } from '@ifixit/app';
import { isLifetimeWarranty } from '@ifixit/helpers';
import { Wrapper } from '@ifixit/ui';
import type { ProductVariant } from '@pages/api/nextjs/cache/product';
import backgroundImage from '@public/images/lifetime-guarantee-background.jpg';
import Image from 'next/image';

export type LifetimeWarrantySectionProps = {
   variant: ProductVariant;
};

export function LifetimeWarrantySection({
   variant,
}: LifetimeWarrantySectionProps) {
   const appContext = useAppContext();

   if (variant.warranty == null || !isLifetimeWarranty(variant.warranty)) {
      return null;
   }
   return (
      <Box py="16" position="relative">
         <Box position="absolute" inset="0">
            <Image
               alt=""
               layout="fill"
               src={backgroundImage}
               objectFit="cover"
            />
         </Box>
         <Box
            position="absolute"
            inset="0"
            sx={{
               background:
                  'linear-gradient(86.68deg, rgba(0, 0, 0, 0.6) 28.46%, rgba(0, 0, 0, 0.1) 65.84%)',
            }}
         ></Box>
         <Box position="relative">
            <Wrapper>
               <Flex
                  justify="space-between"
                  direction={{ base: 'column-reverse', md: 'row' }}
                  px={{
                     base: 6,
                     sm: 0,
                  }}
               >
                  <Box>
                     <Heading
                        as="h2"
                        color="white"
                        mb="3"
                        fontSize={{ base: '2xl', md: '3xl' }}
                        fontWeight="medium"
                     >
                        Lifetime Guarantee
                     </Heading>
                     <Text color="white">
                        We stand behind our tools. If something breaks,
                        we&apos;ll replace it—for as long as you own the iFixit
                        tool.
                     </Text>
                     <Button
                        as="a"
                        mt="8"
                        minW="200px"
                        href={`${appContext.ifixitOrigin}/Info/Warranty`}
                     >
                        Learn more
                     </Button>
                  </Box>
                  <Icon
                     as={QualityGuarantee}
                     boxSize={{ base: '130px', md: '160px' }}
                     color="white"
                     ml={{
                        base: 0,
                        md: 8,
                     }}
                     mb={{
                        base: 8,
                        md: 0,
                     }}
                  />
               </Flex>
            </Wrapper>
         </Box>
      </Box>
   );
}
