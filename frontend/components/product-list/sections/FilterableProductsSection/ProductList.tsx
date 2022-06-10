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
import { ThemeTypings } from '@chakra-ui/styled-system';
import { Rating } from '@components/ui';
import { useAppContext } from '@ifixit/ui';
import { ProductSearchHit } from '@models/product-list';
import Image from 'next/image';
import * as React from 'react';
import { useProductSearchHitPricing } from './useProductSearchHitPricing';

export type ProductListProps = React.PropsWithChildren<unknown>;

export function ProductList({ children }: ProductListProps) {
   return (
      <VStack
         spacing={2}
         align="stretch"
         width="full"
         boxSizing="border-box"
         divider={<Divider mt="0" style={{ marginTop: 0, marginBottom: 0 }} />}
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

   const { price, compareAtPrice, isDiscounted, percentage } =
      useProductSearchHitPricing(product);

   const productHeadingId = `product-heading-${product.handle}`;

   const quantityAvailable = Math.max(0, product.quantity_available);

   const showProBadge = product.is_pro > 0;
   const showDiscountBadge = quantityAvailable > 0 && isDiscounted;
   const showLifetimeWarrantyBadge =
      quantityAvailable > 0 && product.lifetime_warranty;
   const showOemPartnershipBadge =
      quantityAvailable > 0 && product.oem_partnership;
   const showBadges =
      showProBadge ||
      showDiscountBadge ||
      showLifetimeWarrantyBadge ||
      showOemPartnershipBadge;

   return (
      <LinkBox as="article" aria-labelledby={productHeadingId}>
         <Flex
            align="flex-start"
            py={{
               base: 4,
               xl: 7,
            }}
            px="4"
         >
            <Box
               flexGrow={0}
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
                     alt={product.group_title}
                     objectFit="contain"
                     width="180px"
                     height="180px"
                  />
               ) : (
                  <Image
                     src={placeholderImageUrl}
                     alt={product.group_title}
                     sizes="180px"
                  />
               )}
            </Box>
            <Stack
               direction={{
                  base: 'column',
                  xl: 'row',
               }}
               spacing={{
                  base: 1,
                  xl: 2,
               }}
               flexGrow={1}
               ml="4"
            >
               <Box flexShrink={1} w="full">
                  <Heading
                     id={productHeadingId}
                     as="h3"
                     fontSize={{
                        base: 'md',
                        lg: 'lg',
                     }}
                     mb={{
                        base: 2,
                        xl: 4,
                     }}
                  >
                     {product.group_title}
                  </Heading>
                  <Text
                     noOfLines={3}
                     fontSize={{
                        base: 'sm',
                        sm: 'sm',
                        lg: 'md',
                     }}
                     mb={{
                        base: 2,
                        xl: 4,
                     }}
                  >
                     {product.short_description}
                  </Text>
                  {(product.rating >= 4 || product.rating_count > 10) && (
                     <HStack align="center">
                        <Rating value={product.rating} />
                        <Text
                           fontSize={{
                              base: 'sm',
                              lg: 'md',
                           }}
                        >
                           {product.rating_count}
                        </Text>
                     </HStack>
                  )}
                  {showBadges && (
                     <Flex
                        wrap="wrap"
                        mt="2"
                        sx={{
                           '& > *': {
                              mr: 1,
                              mt: 1,
                           },
                        }}
                     >
                        {showProBadge &&
                           ProductListItemBadge({
                              content: 'PRO',
                              colorScheme: 'orange',
                           })}
                        {showDiscountBadge &&
                           ProductListItemBadge({
                              content: `${percentage}% Off`,
                              colorScheme: 'red',
                           })}
                        {showOemPartnershipBadge &&
                           ProductListItemBadge({
                              content: product.oem_partnership!,
                              colorScheme: 'green',
                           })}
                        {showLifetimeWarrantyBadge &&
                           ProductListItemBadge({
                              content: 'Lifetime Warranty',
                              colorScheme: 'blue',
                           })}
                     </Flex>
                  )}
               </Box>
               <VStack
                  flexShrink={0}
                  align="flex-end"
                  alignSelf={{
                     base: 'flex-end',
                     xl: 'flex-start',
                  }}
               >
                  {price != null && (
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
                           ${price}
                        </Text>
                        {isDiscounted && (
                           <Text
                              lineHeight="1em"
                              textDecoration="line-through"
                              color="gray.400"
                              data-testid="product-compared-at-price"
                           >
                              ${compareAtPrice}
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
                     <LinkOverlay
                        href={`${appContext.ifixitOrigin}${product.url}`}
                     >
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
                     {quantityAvailable < 10 && quantityAvailable > 0 && (
                        <Text color="gray.500" fontSize="14px">
                           Only {quantityAvailable} left in stock
                        </Text>
                     )}
                  </Stack>
               </VStack>
            </Stack>
         </Flex>
      </LinkBox>
   );
}

interface ProductListItemBadgeProps {
   content: string;
   colorScheme: ThemeTypings['colorSchemes'];
}

function ProductListItemBadge({
   content,
   colorScheme,
}: ProductListItemBadgeProps) {
   return (
      <Badge
         colorScheme={colorScheme}
         textTransform="none"
         borderRadius="lg"
         px="2.5"
         py="1"
      >
         {content}
      </Badge>
   );
}
