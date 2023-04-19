import {
   chakra,
   Box,
   Flex,
   HTMLChakraProps,
   Img,
   Link,
   Text,
} from '@chakra-ui/react';
import { Summary, useDetails } from '@ifixit/ui';
import type { Product } from '@pages/api/nextjs/cache/product';
import NextLink from 'next/link';

export interface CompatibleDeviceProps extends HTMLChakraProps<'div'> {
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
   const [detailsRef, isOpen, toggle] = useDetails();
   return (
      <Box
         display="flex"
         alignItems="start"
         transition="all 300m"
         {...(!truncateModels && {
            onClick: (event) => {
               toggle();
               event.preventDefault();
               event.stopPropagation();
            },
            onKeyDown: (event) => {
               if ('Enter' === event.code) {
                  toggle();
                  event.preventDefault();
                  event.stopPropagation();
               }
            },
         })}
         {...otherProps}
      >
         <NextLink href={device.deviceUrl} passHref>
            <Link>
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
         </NextLink>
         <Flex
            minH="12"
            flexDir="column"
            alignSelf="flex-start"
            justifyContent="center"
         >
            <NextLink href="#compatibility" passHref>
               <chakra.a>
                  <Text
                     my="2px"
                     fontWeight="medium"
                     _groupHover={{ color: 'brand.500' }}
                  >
                     {device.deviceName}
                  </Text>
               </chakra.a>
            </NextLink>
            <Flex
               flexDir="column"
               {...(!truncateModels && {
                  onClick: (event) => {
                     event.preventDefault();
                     event.stopPropagation();
                  },
                  onKeyDown: (event) => {
                     if ('Enter' === event.code) {
                        event.preventDefault();
                        event.stopPropagation();
                     }
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
                  And {hiddenVariants.length} other model
                  {hiddenVariants.length > 1 ? 's' : ''}...
               </Text>
            )}
            {!truncateModels && hiddenVariants.length > 0 && (
               <details ref={detailsRef}>
                  <Summary
                     mt="2px"
                     lineHeight="short"
                     fontSize="xs"
                     fontWeight="medium"
                     color="brand.500"
                     cursor="pointer"
                  >
                     {isOpen
                        ? 'Show fewer'
                        : `Show ${hiddenVariants.length} more`}
                  </Summary>
                  <Flex
                     flexDir="column"
                     {...(!truncateModels && {
                        onClick: (event) => {
                           event.preventDefault();
                           event.stopPropagation();
                        },
                        onKeyDown: (event) => {
                           if ('Enter' === event.code) {
                              event.preventDefault();
                              event.stopPropagation();
                           }
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
      </Box>
   );
}
