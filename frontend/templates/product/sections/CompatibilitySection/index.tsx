import {
   Box,
   Flex,
   Text,
   Heading,
   Input,
   InputGroup,
   InputLeftElement,
   SimpleGrid,
} from '@chakra-ui/react';
import { CompatibleDevice } from '@components/common/CompatibleDevice';
import { faMagnifyingGlass } from '@fortawesome/pro-solid-svg-icons';
import { faMagnifyingGlass as faMagnifyingGlassDuotone } from '@fortawesome/pro-duotone-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { Wrapper } from '@ifixit/ui';
import type { Product } from '@pages/api/nextjs/cache/product';
import React from 'react';

export type CompatibilitySectionProps = {
   compatibility: Product['compatibility'];
};

export function CompatibilitySection({
   compatibility,
}: CompatibilitySectionProps) {
   const [query, setQuery] = React.useState('');

   const devices = React.useMemo(() => {
      if (!query) return compatibility?.devices;

      const lowerCasedQuery = query.toLowerCase();
      return compatibility?.devices
         .map((device) => {
            const nameMatches = device.deviceName
               .toLowerCase()
               .includes(lowerCasedQuery);

            const matchingVariants = device.variants.filter((variant) =>
               variant?.toLowerCase().includes(lowerCasedQuery)
            );

            if (!nameMatches && matchingVariants.length === 0) return null;

            const newDevice = {
               ...device,
               variants: nameMatches ? device.variants : matchingVariants,
            };

            return newDevice;
         })
         .filter(Boolean) as
         | NonNullable<Product['compatibility']>['devices']
         | undefined;
   }, [query, compatibility?.devices]);

   const hasDevices = React.useMemo(
      () => devices && devices.length > 0,
      [devices]
   );

   return compatibility && compatibility.devices.length > 0 ? (
      <Box as="section" id="compatibility" py="16" fontSize="sm">
         <Wrapper>
            <Heading
               as="h2"
               color="gray.900"
               textAlign="center"
               mb={{ base: '6', md: '12' }}
               fontSize={{ base: '2xl', md: '3xl' }}
               fontWeight="medium"
            >
               Compatibility
            </Heading>

            <Box
               display="flex"
               justifyContent="center"
               mb={{ base: '6', md: '12' }}
            >
               <InputGroup
                  w={{
                     base: 'full',
                     md: '460px',
                  }}
               >
                  <InputLeftElement pointerEvents="none">
                     <FaIcon
                        icon={faMagnifyingGlass}
                        color="gray.400"
                        mr="-2"
                        mb="-1px"
                     />
                  </InputLeftElement>
                  <Input
                     name="query"
                     placeholder="Search your model"
                     variant="filled"
                     bg="white"
                     _hover={{
                        bg: 'gray.50',
                     }}
                     _focusVisible={{
                        bg: 'white',
                        boxShadow: 'outline',
                     }}
                     outline="none"
                     fontSize="sm"
                     borderWidth="1px"
                     borderStyle="solid"
                     borderColor="gray.300"
                     borderRadius="base"
                     onChange={(e) => setQuery(e.target.value)}
                     value={query}
                  />
               </InputGroup>
            </Box>
            {hasDevices && (
               <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3}>
                  {devices?.map((device, index) => (
                     <CompatibleDevice
                        key={index}
                        device={device}
                        maxModelLines={10}
                        truncateModels={false}
                        p="3"
                        bg="white"
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="gray.300"
                        borderRadius="base"
                        gridColumnStart={
                           compatibility.devices.length === 1
                              ? { base: 1, md: 2 }
                              : 'unset'
                        }
                        query={query}
                     />
                  ))}
               </SimpleGrid>
            )}
            {!hasDevices && (
               <Flex
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  bg="white"
                  p="8"
                  borderRadius="base"
               >
                  <Flex
                     borderRadius="full"
                     bg="brand.100"
                     w={{ base: '14', md: '16' }}
                     h={{ base: '14', md: '16' }}
                     alignItems="center"
                     justifyContent="center"
                  >
                     <FaIcon
                        icon={faMagnifyingGlassDuotone}
                        h={{ base: 6, md: 8 }}
                        color="brand.500"
                     />
                  </Flex>
                  <Text
                     fontSize="md"
                     color="gray.800"
                     mt="3"
                  >{`Your search "${query}" didn't match any results.`}</Text>
               </Flex>
            )}
         </Wrapper>
      </Box>
   ) : null;
}
