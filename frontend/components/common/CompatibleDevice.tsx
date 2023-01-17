import { Flex, Img, Text } from '@chakra-ui/react';
import type { Product } from '@pages/api/nextjs/cache/product';
import * as React from 'react';

export type CompatibleDeviceProps = {
   device: NonNullable<Product['compatibility']>['devices'][number];
   maxModelLines?: number;
};

export function CompatibleDevice({
   device,
   maxModelLines = 0,
}: CompatibleDeviceProps) {
   const variants = React.useMemo(
      () => device.variants.filter(Boolean),
      [device.variants]
   );
   const [visibleVariants, hiddenVariantCount] = React.useMemo(
      () =>
         maxModelLines > 0 && variants.length > maxModelLines
            ? [
                 variants.slice(0, maxModelLines - 1),
                 variants.length - maxModelLines + 1,
              ]
            : [variants, 0],
      [maxModelLines, variants]
   );
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
            <Flex flexDir="column">
               {visibleVariants.map((variant) => (
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
            {hiddenVariantCount > 0 && (
               <Text mb="2px" lineHeight="short" fontSize="xs" color="gray.600">
                  And {hiddenVariantCount} other model
                  {hiddenVariantCount > 1 ? 's' : ''}...
               </Text>
            )}
         </Flex>
      </>
   );
}
