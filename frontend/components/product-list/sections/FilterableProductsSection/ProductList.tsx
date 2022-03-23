import placeholderImageUrl from '@assets/images/no-image-fixie.jpeg';
import {
   Badge,
   Box,
   Button,
   Divider,
   Flex,
   Heading,
   HStack,
   LinkBox,
   LinkOverlay,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Rating } from '@components/ui';
import { IFIXIT_ORIGIN } from '@config/env';
import { computeDiscountPercentage } from '@helpers/commerce-helpers';
import { ProductSearchHit } from '@models/product-list';
import Image from 'next/image';
import * as React from 'react';

export type ProductListProps = React.PropsWithChildren<unknown>;

export function ProductList({ children }: ProductListProps) {
   return (
      <VStack
         spacing={2}
         align="stretch"
         width="full"
         boxSizing="border-box"
         divider={<Divider />}
      >
         {children}
      </VStack>
   );
}

export interface ProductListItemProps {
   product: ProductSearchHit;
}

export function ProductListItem({ product }: ProductListItemProps) {
   const isDiscounted =
      product.compare_at_price != null &&
      product.compare_at_price > product.price_float;

   const percentage = isDiscounted
      ? computeDiscountPercentage(
           product.price_float * 100,
           product.compare_at_price! * 100
        )
      : 0;

   const productHeadingId = `product-heading-${product.handle}`;

   const quantityAvailable = Math.max(0, product.quantity_available);

   return (
      <LinkBox as="article" aria-labelledby={productHeadingId}>
         <Stack
            direction={{
               base: 'column',
               sm: 'row',
               md: 'column',
               lg: 'row',
            }}
            spacing={{
               base: 2,
               sm: 4,
            }}
            py="7"
            alignItems="flex-start"
            px="4"
         >
            <Box
               flexGrow={1}
               flexShrink={0}
               w={{
                  base: '100px',
                  sm: '160px',
                  md: '140px',
                  lg: '160px',
               }}
            >
               {product.image_url ? (
                  <Image
                     src={product.image_url}
                     alt={product.title}
                     objectFit="contain"
                     width="180px"
                     height="180px"
                  />
               ) : (
                  <Image
                     src={placeholderImageUrl}
                     alt={product.title}
                     sizes="180px"
                  />
               )}
            </Box>
            <VStack
               align="flex-start"
               spacing={{
                  base: 4,
               }}
               flexShrink={1}
               w="full"
            >
               <Heading
                  id={productHeadingId}
                  as="h3"
                  fontSize={{
                     base: 'sm',
                     sm: 'md',
                     lg: 'lg',
                  }}
               >
                  {product.title}
               </Heading>
               <Text
                  noOfLines={3}
                  fontSize={{
                     base: 'xs',
                     sm: 'sm',
                     lg: 'md',
                  }}
               >
                  {product.short_description}
               </Text>
               {product.rating_count > 0 && (
                  <HStack align="flex-end">
                     <Rating value={product.rating} />
                     <Text lineHeight="1em">{product.rating_count}</Text>
                  </HStack>
               )}
               <Box>
                  <Flex
                     wrap="wrap"
                     mt="-1"
                     sx={{
                        '& > *': {
                           mr: 1,
                           mt: 1,
                        },
                     }}
                  >
                     {product.quantity_available > 0 ? (
                        <>
                           {percentage > 0 && (
                              <Badge
                                 colorScheme="red"
                                 textTransform="none"
                                 borderRadius="lg"
                                 px="2.5"
                                 py="1"
                              >
                                 {percentage}% Off
                              </Badge>
                           )}
                           {product.lifetime_warranty && (
                              <Badge
                                 colorScheme="blue"
                                 textTransform="none"
                                 borderRadius="lg"
                                 px="2.5"
                                 py="1"
                              >
                                 Lifetime warranty
                              </Badge>
                           )}
                           <Badge
                              colorScheme="blue"
                              textTransform="none"
                              borderRadius="lg"
                              px="2.5"
                              py="1"
                           >
                              Ship today if ordered by 5pm
                           </Badge>
                        </>
                     ) : (
                        <Badge
                           colorScheme="gray"
                           textTransform="none"
                           borderRadius="lg"
                           px="2.5"
                           py="1"
                        >
                           Sold out
                        </Badge>
                     )}
                  </Flex>
               </Box>
            </VStack>
            <VStack
               flexShrink={0}
               align="flex-end"
               alignSelf={{
                  base: 'flex-end',
                  sm: 'flex-start',
                  md: 'flex-end',
                  lg: 'flex-start',
               }}
            >
               {product.price_float != null && (
                  <VStack
                     align="flex-end"
                     spacing="0"
                     mt={{
                        base: 2,
                        sm: 0,
                        md: 2,
                        lg: 0,
                     }}
                  >
                     <Text
                        color={isDiscounted ? 'red.700' : 'inherit'}
                        fontWeight="bold"
                        fontSize="xl"
                        lineHeight="1em"
                        data-testid="product-price"
                     >
                        ${product.price_float}
                     </Text>
                     {isDiscounted && (
                        <Text
                           lineHeight="1em"
                           textDecoration="line-through"
                           color="gray.400"
                           data-testid="product-compared-at-price"
                        >
                           ${product.compare_at_price}
                        </Text>
                     )}
                  </VStack>
               )}
               <Stack
                  direction={{
                     base: 'row-reverse',
                     sm: 'column',
                     md: 'row-reverse',
                     lg: 'column',
                  }}
                  align={{
                     base: 'center',
                     sm: 'flex-end',
                     md: 'center',
                     lg: 'flex-end',
                  }}
                  spacing={{
                     base: 3,
                     sm: 2,
                  }}
               >
                  <LinkOverlay href={`${IFIXIT_ORIGIN}${product.url}`}>
                     <Button
                        as="div"
                        minW={{
                           base: '100px',
                           sm: '60px',
                           md: '100px',
                           lg: '60px',
                        }}
                        colorScheme="brand"
                     >
                        View
                     </Button>
                  </LinkOverlay>
                  {quantityAvailable < 10 && (
                     <Text color="gray.500" fontSize="14px">
                        {quantityAvailable > 0
                           ? `Only ${quantityAvailable} left in stock`
                           : 'Out of stock'}
                     </Text>
                  )}
               </Stack>
            </VStack>
         </Stack>
      </LinkBox>
   );
}
