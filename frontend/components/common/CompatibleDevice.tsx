import { chakra, Flex, FlexProps, Img, Link, Text } from '@chakra-ui/react';
import { ConditionalWrapper } from '@ifixit/ui/misc';
import type { Product } from '@pages/api/nextjs/cache/product';

export interface CompatibleDeviceProps extends FlexProps {
   device: Omit<
      NonNullable<Product['compatibility']>['devices'][number],
      'deviceUrl'
   > & {
      deviceUrl?: string;
   };
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
            },
         })}
         {...otherProps}
      >
         <ConditionalWrapper
            condition={!!device.deviceUrl}
            wrapper={(children) => (
               <Link
                  href={device.deviceUrl}
                  {...(!truncateModels && {
                     onClick: (event) => event.stopPropagation(),
                  })}
               >
                  {children}
               </Link>
            )}
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
         </ConditionalWrapper>
         <Flex
            minH="12"
            flexDir="column"
            alignSelf="flex-start"
            justifyContent="center"
         >
            <ConditionalWrapper
               condition={!!device.deviceUrl}
               wrapper={(children) => (
                  <chakra.a
                     href={device.deviceUrl}
                     my="2px"
                     fontWeight="medium"
                     _hover={{ color: 'brand.500' }}
                     {...(!truncateModels && {
                        onClick: (event) => event.stopPropagation(),
                     })}
                  >
                     {children}
                  </chakra.a>
               )}
            >
               {device.deviceName}
            </ConditionalWrapper>
            <Flex
               flexDir="column"
               {...(!truncateModels && {
                  onClick: (event) => event.stopPropagation(),
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
                        onClick: (event) => event.stopPropagation(),
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
