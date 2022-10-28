import { Flex, Img, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Product } from '@models/product';

export type CompatibleDeviceProps = {
   device: NonNullable<Product['compatibility']>['devices'][number];
   truncate?: number;
};

export function CompatibleDevice({
   device,
   truncate = 0,
}: CompatibleDeviceProps) {
   let variants = device.variants;
   let unlistedVariants = 0;
   if (variants.length > truncate) {
      variants = device.variants.slice(0, truncate - 1);
      unlistedVariants = device.variants.length - variants.length;
   }
   return (
      <>
         <Img
            src={device.imageUrl}
            alt={device.deviceName ?? ''}
            w="12"
            mr="3"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.300"
            borderRadius="4px"
         />
         <Flex
            minH="12"
            flexDir="column"
            alignSelf="flex-start"
            justifyContent="center"
         >
            <Text
               my="2px"
               fontWeight="medium"
               _groupHover={{ color: 'brand.500' }}
            >
               {device.deviceName}
            </Text>
            <Flex mb="2px" flexDir="column">
               {variants.map((variant) => (
                  <Text
                     key={variant}
                     lineHeight="short"
                     fontSize="xs"
                     color="gray.600"
                  >
                     {variant}
                  </Text>
               ))}
            </Flex>
            {unlistedVariants !== 0 && (
               <Text my="1px" lineHeight="short" fontSize="xs">
                  And {unlistedVariants} other devices...
               </Text>
            )}
         </Flex>
      </>
   );
}
