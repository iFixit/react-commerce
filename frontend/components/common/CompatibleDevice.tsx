import { chakra, Flex, FlexProps, Img, Link, Text } from '@chakra-ui/react';
import { ConditionalWrapper } from '@ifixit/ui/misc';
import type { Product } from '@pages/api/nextjs/cache/product';
import React from 'react';
import TextWithHighlight from './TextWithHighlight';

export interface CompatibleDeviceProps extends FlexProps {
   device: Omit<
      NonNullable<Product['compatibility']>['devices'][number],
      'deviceUrl'
   > & {
      deviceUrl?: string;
   };
   maxModelLines?: number;
   truncateModels?: boolean;
   query?: string;
}

export function CompatibleDevice({
   device,
   maxModelLines = 0,
   truncateModels = true,
   query,
   ...otherProps
}: CompatibleDeviceProps) {
   const [showHiddenVariants, setShowHiddenVariants] = React.useState(false);

   const variants = device.variants as string[];
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
                  flexShrink="0"
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
               h="12"
               objectFit="contain"
               mr="3"
               borderWidth="1px"
               borderStyle="solid"
               borderColor="gray.300"
               borderRadius="base"
               flexShrink="0"
            />
         </ConditionalWrapper>
         <Flex
            minH="12"
            flexDir="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            wordBreak="break-word"
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
               <TextWithHighlight text={device.deviceName} query={query} />
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
                     <TextWithHighlight text={variant} query={query} />
                  </Text>
               ))}
            </Flex>
            {truncateModels && hiddenVariants.length > 0 && (
               <Text mb="2px" lineHeight="short" fontSize="xs" color="gray.600">
                  And {hiddenVariants.length} more...
               </Text>
            )}
            {!truncateModels && hiddenVariants.length > 0 && (
               <details
                  open={showHiddenVariants}
                  onToggle={() => setShowHiddenVariants((value) => !value)}
               >
                  <chakra.summary
                     mt="2px"
                     lineHeight="short"
                     fontSize="xs"
                     fontWeight="medium"
                     color="brand.500"
                     cursor="pointer"
                  >
                     {showHiddenVariants ? 'Hide' : 'Show all'}{' '}
                     <Text as="span" fontWeight="bold">
                        {hiddenVariants.length}
                     </Text>{' '}
                     models
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
                           <TextWithHighlight text={variant} query={query} />
                        </Text>
                     ))}
                  </Flex>
               </details>
            )}
         </Flex>
      </Flex>
   );
}
