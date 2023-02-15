import placeholderImageUrl from '@assets/images/no-image-fixie.jpeg';
import {
   Badge,
   BadgeProps,
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
import {
   ResponsiveImage,
   ProductVariantPrice,
   useUserPrice,
   IconBadge,
} from '@ifixit/ui';
import { Rating } from '@components/ui';
import { flags } from '@config/flags';
import { useAppContext } from '@ifixit/app';
import { ProductSearchHit } from '@models/product-list';
import * as React from 'react';
import { useProductSearchHitPricing } from './useProductSearchHitPricing';
import { getProductPath } from '@helpers/product-helpers';

export type ProductListProps = React.PropsWithChildren<unknown>;

export function ProductList({ children }: ProductListProps) {
   return (
      <VStack
         data-testid="list-view-products"
         spacing={2}
         align="stretch"
         width="full"
         boxSizing="border-box"
         divider={
            <Divider
               mt="0"
               borderColor="gray.200"
               style={{ marginTop: 0, marginBottom: 0 }}
            />
         }
      >
         {children}
      </VStack>
   );
}

export interface ProductListItemProps {
   product: ProductSearchHit;
}

export function ProductListItem({ product }: ProductListItemProps) {
   const appContext = useAppContext();

   const { price, compareAtPrice, isDiscounted, percentage, proPricesByTier } =
      useProductSearchHitPricing(product);

   const productHeadingId = `product-heading-${product.handle}`;

   const quantityAvailable = Math.max(0, product.quantity_available);

   const showProBadge = product.is_pro > 0;
   const showDiscountBadge = isDiscounted;
   const showLifetimeWarrantyBadge = product.lifetime_warranty;
   const showOemPartnershipBadge = product.oem_partnership;
   const showBadges =
      showProBadge ||
      showDiscountBadge ||
      showLifetimeWarrantyBadge ||
      showOemPartnershipBadge;

   const { isProPrice } = useUserPrice({
      price,
      compareAtPrice,
      proPricesByTier,
   });

   return (
      <LinkBox as="article" aria-labelledby={productHeadingId} role="group">
         <Flex
            align="flex-start"
            p={{
               base: 3,
               xl: 4,
            }}
         >
            <Box
               flexGrow={0}
               flexShrink={0}
               w={{
                  base: 24,
                  sm: 32,
                  lg: 40,
               }}
            >
               {product.image_url ? (
                  <ResponsiveImage
                     src={product.image_url}
                     alt={product.title}
                     objectFit="contain"
                     width="320px"
                     height="320px"
                  />
               ) : (
                  <ResponsiveImage
                     src={placeholderImageUrl}
                     alt={product.title}
                     sizes="320px"
                  />
               )}
            </Box>
            <Stack
               direction={{
                  base: 'column',
                  xl: 'row',
               }}
               spacing={{
                  base: 3,
                  sm: 4,
                  xl: 6,
               }}
               flexGrow={1}
               ml={{ base: 3, xl: 4 }}
            >
               <Box flexShrink={1} w="full">
                  <VStack spacing={{ base: 3, sm: 4 }} align="flex-start">
                     <Flex direction="column">
                        <Heading
                           id={productHeadingId}
                           as="h3"
                           fontSize="md"
                           fontWeight="medium"
                           lineHeight="shorter"
                           mb="1.5"
                           _groupHover={{ color: 'brand.500' }}
                        >
                           {product.title}
                        </Heading>
                        <Text noOfLines={3} lineHeight="shorter">
                           {product.short_description}
                        </Text>
                     </Flex>
                     {(product.rating >= 4 || product.rating_count > 10) && (
                        <HStack align="center" data-testid="reviewStars">
                           <Rating value={product.rating} />
                           <Text fontSize="sm">{product.rating_count}</Text>
                        </HStack>
                     )}
                     {showBadges && (
                        <Flex
                           wrap="wrap"
                           mb="-1.5"
                           sx={{
                              '& > *': {
                                 mr: 1.5,
                                 mb: 1.5,
                              },
                           }}
                        >
                           {showProBadge && (
                              <IconBadge colorScheme="orange">
                                 iFixit Pro
                              </IconBadge>
                           )}
                           {showDiscountBadge && (
                              <IconBadge
                                 colorScheme={isProPrice ? 'orange' : 'red'}
                              >
                                 {percentage}% Off
                              </IconBadge>
                           )}
                           {showOemPartnershipBadge && (
                              <IconBadge colorScheme="green">
                                 {product.oem_partnership}
                              </IconBadge>
                           )}
                           {showLifetimeWarrantyBadge && (
                              <IconBadge colorScheme="blue">
                                 Lifetime Guarantee
                              </IconBadge>
                           )}
                        </Flex>
                     )}
                  </VStack>
               </Box>
               <VStack
                  flexShrink={0}
                  justifyContent="flex-end"
                  alignSelf={{
                     base: 'flex-end',
                     xl: 'flex-start',
                  }}
               >
                  {price != null && (
                     <ProductVariantPrice
                        price={price}
                        compareAtPrice={compareAtPrice}
                        proPricesByTier={proPricesByTier}
                        showDiscountLabel={false}
                        direction="column"
                        alignSelf="flex-end"
                     />
                  )}
                  <Stack
                     direction={{ base: 'row', xl: 'column-reverse' }}
                     align={{ base: 'center', xl: 'flex-end' }}
                     spacing="2"
                  >
                     {quantityAvailable < 10 && quantityAvailable > 0 && (
                        <Text
                           color="gray.500"
                           fontSize="sm"
                           ml={{ base: -24, xl: 0 }}
                        >
                           Only {quantityAvailable} left in stock
                        </Text>
                     )}
                     <LinkOverlay
                        href={
                           flags.PRODUCT_PAGE_ENABLED
                              ? getProductPath(product.handle)
                              : `${appContext.ifixitOrigin}${product.url}`
                        }
                     >
                        <Button as="div" minW="24" colorScheme="brand">
                           View
                        </Button>
                     </LinkOverlay>
                  </Stack>
               </VStack>
            </Stack>
         </Flex>
      </LinkBox>
   );
}
