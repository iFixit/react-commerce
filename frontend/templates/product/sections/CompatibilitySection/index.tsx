import { Box, chakra, Heading, SimpleGrid } from '@chakra-ui/react';
import { CompatibleDevice } from '@components/common/CompatibleDevice';
import { Wrapper } from '@ifixit/ui';
import type { Product } from '@pages/api/nextjs/cache/product';
import NextLink from 'next/link';

export type CompatibilitySectionProps = {
   compatibility: Product['compatibility'];
};

export function CompatibilitySection({
   compatibility,
}: CompatibilitySectionProps) {
   return compatibility && compatibility.devices.length > 0 ? (
      <Box id="compatibility" py="16" fontSize="sm">
         <Wrapper>
            <Heading
               as="h2"
               color="gray.900"
               textAlign="center"
               mb="12"
               fontSize={{ base: '2xl', md: '3xl' }}
               fontWeight="medium"
            >
               Compatibility
            </Heading>
            <SimpleGrid
               columns={{ base: 1, sm: 2, md: 3 }}
               spacing={3}
               margin={{ base: 5, sm: 0 }}
            >
               {compatibility?.devices.map((device, index) => (
                  <NextLink key={index} href={device.deviceUrl} passHref>
                     <chakra.a
                        display="flex"
                        p="3"
                        bg="white"
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="gray.300"
                        borderRadius="base"
                        transition="all 300ms"
                        _hover={{
                           boxShadow: 'md',
                        }}
                        alignItems="flex-start"
                        gridColumnStart={
                           compatibility.devices.length === 1
                              ? { base: 1, md: 2 }
                              : 'unset'
                        }
                     >
                        <CompatibleDevice device={device} />
                     </chakra.a>
                  </NextLink>
               ))}
            </SimpleGrid>
         </Wrapper>
      </Box>
   ) : null;
}
