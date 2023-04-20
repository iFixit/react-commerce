import {
   chakra,
   Box,
   Flex,
   HTMLChakraProps,
   Img,
   Link,
   Text,
} from '@chakra-ui/react';
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
   return (
      <Box
         display="flex"
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
               })}
               sx={{
                  'details .whenOpen': {
                     display: 'none',
                  },
                  'details[open] .whenOpen': {
                     display: 'initial',
                  },
                  'details[open] .whenClosed': {
                     display: 'none',
                  },
               }}
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
               <details>
                  <summary
                     style={{
                        marginTop: '2px',
                        lineHeight: 'short',
                        fontSize: 'xs',
                        fontWeight: 'medium',
                        color: 'var(--chakra-colors-brand-500)',
                        cursor: 'pointer',
                     }}
                  >
                     <span className="whenClosed">
                        Show {hiddenVariants.length} more
                     </span>
                     <span className="whenOpen">Show fewer</span>
                  </summary>
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
      </Box>
   );
}
