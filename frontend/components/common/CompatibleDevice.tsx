import { chakra, Flex, FlexProps, Img, Link, Text } from '@chakra-ui/react';
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
   return (
      <Flex
         alignItems="start"
         transition="all 300m"
         {...(!truncateModels && {
            onClick: (event) => {
               event.currentTarget
                  ?.getElementsByTagName('details')[0]
                  ?.toggleAttribute('open');
               event.preventDefault();
               event.stopPropagation();
            },
         })}
         {...otherProps}
      >
         <Link href={device.deviceUrl}>
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
         </Link>
         <Flex
            minH="12"
            flexDir="column"
            alignSelf="flex-start"
            justifyContent="center"
         >
            <chakra.a
               href={device.deviceUrl}
               my="2px"
               fontWeight="medium"
               _groupHover={{ color: 'brand.500' }}
            >
               {device.deviceName}
            </chakra.a>
            <Flex
               flexDir="column"
               {...(!truncateModels && {
                  onClick: (event) => {
                     event.preventDefault();
                     event.stopPropagation();
                  },
               })}
            >
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
            {truncateModels && hiddenVariants.length > 0 && (
               <Text mb="2px" lineHeight="short" fontSize="xs" color="gray.600">
                  And {hiddenVariants.length} more...
               </Text>
            )}
            {!truncateModels && hiddenVariants.length > 0 && (
               <details>
                  <chakra.summary
                     mt="2px"
                     lineHeight="short"
                     fontSize="xs"
                     fontWeight="medium"
                     color="brand.500"
                     cursor="pointer"
                  >
                     Show {hiddenVariants.length} more
                  </chakra.summary>
                  <Flex
                     flexDir="column"
                     {...(!truncateModels && {
                        onClick: (event) => {
                           event.preventDefault();
                           event.stopPropagation();
                        },
                     })}
                  >
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
               </details>
            )}
         </Flex>
      </Flex>
   );
}
