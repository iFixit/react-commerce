import placeholderImageUrl from '@assets/images/no-image-fixie.jpeg';
import {
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
   VisuallyHidden,
   VStack,
} from '@chakra-ui/react';
import { Rating } from '@components/ui';
import { productPath } from '@helpers/path-helpers';
import {
   IconBadge,
   ProductVariantPrice,
   ResponsiveImage,
   useUserPrice,
} from '@ifixit/ui';
import { ProductSearchHit } from '@models/product-list';
import * as React from 'react';
import { useProductSearchHitPricing } from './useProductSearchHitPricing';

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
               borderColor="gray.300"
               opacity="1"
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
                     style={{
                        objectFit: 'contain',
                     }}
                     width={320}
                     height={320}
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
                           data-testid="heading-product-title"
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
                           <Text fontSize="sm">
                              <VisuallyHidden>
                                 Number of reviews:
                              </VisuallyHidden>
                              {product.rating_count}
                           </Text>
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
                              <IconBadge
                                 colorScheme="orange"
                                 size={{ base: 'small', md: 'base' }}
                              >
                                 iFixit Pro
                              </IconBadge>
                           )}
                           {showDiscountBadge && (
                              <IconBadge
                                 colorScheme={isProPrice ? 'orange' : 'red'}
                                 size={{ base: 'small', md: 'base' }}
                              >
                                 {percentage}% Off
                              </IconBadge>
                           )}
                           {showOemPartnershipBadge && (
                              <IconBadge
                                 colorScheme="green"
                                 size={{ base: 'small', md: 'base' }}
                              >
                                 {product.oem_partnership}
                              </IconBadge>
                           )}
                           {showLifetimeWarrantyBadge && (
                              <IconBadge
                                 colorScheme="blue"
                                 size={{ base: 'small', md: 'base' }}
                              >
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
                        size={{ base: 'small', md: 'medium' }}
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
                     <LinkOverlay href={productPath(product.handle)}>
                        <Button as="div" minW="20" colorScheme="brand">
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
