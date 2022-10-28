import { Flex, Img, Text } from '@chakra-ui/react';
import { Product } from '@models/product';

export type CompatibleDeviceProps = {
   device: NonNullable<Product['compatibility']>['devices'][number];
   truncate?: number;
};

export function CompatibleDevice({
   device,
   truncate = 0,
}: CompatibleDeviceProps) {
   const variants = truncate
      ? device.variants.slice(0, truncate)
      : device.variants;
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
         </Flex>
      </>
   );
}
