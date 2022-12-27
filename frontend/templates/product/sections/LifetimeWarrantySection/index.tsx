import { QualityGuarantee } from '@assets/svg';
import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { useAppContext } from '@ifixit/app';
import { isLifetimeWarranty } from '@ifixit/helpers';
import { PageContentWrapper } from '@ifixit/ui';
import type { ProductVariant } from '@models/product.server';
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
            <PageContentWrapper>
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
                        fontFamily="Archivo Black"
                        letterSpacing="wide"
                        mb="3"
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
                     boxSize="160px"
                     color="white"
                     borderRadius="full"
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
            </PageContentWrapper>
         </Box>
      </Box>
   );
}
