import { Flex, FlexProps, Img, Text, useDisclosure } from '@chakra-ui/react';
import type { Product } from '@pages/api/nextjs/cache/product';

export interface CompatibleDeviceProps extends FlexProps {
   device: NonNullable<Product['compatibility']>['devices'][number];
   maxModelLines?: number;
   truncateModels?: boolean;
}

export function CompatibleDevice({
   device,
   maxModelLines = 0,
   truncateModels = true,
   ...otherProps
}: CompatibleDeviceProps) {
   const { variants } = device;
   const [visibleVariants, hiddenVariants] =
      maxModelLines > 0 && variants.length > maxModelLines
         ? [variants.slice(0, maxModelLines), variants.slice(maxModelLines)]
         : [variants, []];
   const { isOpen, getDisclosureProps, getButtonProps, onToggle } =
      useDisclosure();
   return (
      <Flex
         as="a"
         href={device.deviceUrl}
         alignItems="start"
         transition="all 300m"
         {...otherProps}
      >
         <Img
            src={device.imageUrl}
            alt={device.deviceName ?? ''}
            w="12"
            mr="3"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.300"
            borderRadius="base"
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
            <Flex flexDir="column" {...getDisclosureProps()}>
               {hiddenVariants.map((variant) => (
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
            {truncateModels && hiddenVariants.length > 0 && (
               <Text mb="2px" lineHeight="short" fontSize="xs" color="gray.600">
                  And {hiddenVariants.length} other model
                  {hiddenVariants.length > 1 ? 's' : ''}...
               </Text>
            )}
            {!truncateModels && hiddenVariants.length > 0 && (
               <Text
                  mt="2px"
                  lineHeight="short"
                  fontSize="xs"
                  fontWeight="medium"
                  color="brand.500"
                  {...getButtonProps()}
                  onClick={(event) => {
                     onToggle();
                     event.preventDefault();
                     event.stopPropagation();
                  }}
                  onKeyDown={(event) => {
                     if ('Enter' === event.code) {
                        onToggle();
                        event.preventDefault();
                        event.stopPropagation();
                     }
                  }}
               >
                  {isOpen
                     ? 'Show fewer models'
                     : `Show all ${variants.length} models`}
               </Text>
            )}
         </Flex>
      </Flex>
   );
}
