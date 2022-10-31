import {
   Badge,
   BadgeProps,
   HStack,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
} from '@chakra-ui/react';
import {
   ProductCard,
   ProductCardBadgeList,
   ProductCardBody,
   ProductCardImage,
   ProductCardRating,
   ProductCardTitle,
} from '@components/common';
import { flags } from '@config/flags';
import { getProductPath } from '@helpers/product-helpers';
import { useAppContext } from '@ifixit/app';
import { ProductVariantPrice } from '@ifixit/ui';
import { ProductSearchHit } from '@models/product-list';
import * as React from 'react';
import { useProductSearchHitPricing } from './useProductSearchHitPricing';

export type ProductGridProps = React.PropsWithChildren<unknown>;

export function ProductGrid({ children }: ProductGridProps) {
   const childrenCount = React.Children.count(children);

   return (
      <SimpleGrid
         data-testid="grid-view-products"
         borderBottomColor="gray.100"
         borderBottomWidth="1px"
         columns={{
            base: 2,
            lg: 3,
         }}
         spacing="1px"
         bg="gray.100"
         _after={{
            content: `""`,
            bg: 'white',
            gridRow: {
               base: Math.ceil(childrenCount / 2),
               lg: Math.ceil(childrenCount / 3),
            },
            gridColumnStart: {
               base: (childrenCount % 2) + 1,
               lg: (childrenCount % 3) + 1,
            },
            gridColumnEnd: {
               base: 3,
               lg: 4,
            },
         }}
      >
         {children}
      </SimpleGrid>
   );
}

export interface ProductGridItemProps {
   product: ProductSearchHit;
}

export function ProductGridItem({ product }: ProductGridItemProps) {
   const appContext = useAppContext();

   const { price, compareAtPrice, isDiscounted, percentage, proPricesByTier } =
      useProductSearchHitPricing(product);

   const showProBadge = product.is_pro > 0;
   const showDiscountBadge = isDiscounted;
   const showLifetimeWarrantyBadge = product.lifetime_warranty;
   const showOemPartnershipBadge = product.oem_partnership;

   return (
      <LinkBox as="article" display="block" w="full" role="group">
         <ProductCard h="full">
            <ProductCardImage src={product.image_url} alt={product.title} />
            <ProductCardBadgeList
               sx={{
                  '& > :not(:first-of-type)': {
                     display: 'none',
                  },
               }}
            >
               {showOemPartnershipBadge && (
                  <ProductCardBadge colorScheme="green">
                     {product.oem_partnership}
                  </ProductCardBadge>
               )}
               {showProBadge && (
                  <ProductCardBadge colorScheme="orange">
                     iFixit Pro
                  </ProductCardBadge>
               )}
               {showDiscountBadge && (
                  <ProductCardBadge colorScheme="red">
                     {percentage}% Off
                  </ProductCardBadge>
               )}
               {showLifetimeWarrantyBadge && (
                  <ProductCardBadge colorScheme="blue">
                     Lifetime Warranty
                  </ProductCardBadge>
               )}
            </ProductCardBadgeList>
            <ProductCardBody>
               <LinkOverlay
                  href={
                     flags.PRODUCT_PAGE_ENABLED
                        ? getProductPath(product.handle)
                        : `${appContext.ifixitOrigin}${product.url}`
                  }
               >
                  <ProductCardTitle _groupHover={{ color: 'brand.500' }}>
                     {product.title}
                  </ProductCardTitle>
               </LinkOverlay>
               {(product.rating >= 4 || product.rating_count > 10) && (
                  <ProductCardRating
                     rating={product.rating}
                     count={product.rating_count}
                  />
               )}
               <HStack w="full" flexGrow={1} justify="flex-end" spacing="2">
                  <ProductVariantPrice
                     price={price}
                     compareAtPrice={compareAtPrice}
                     proPricesByTier={proPricesByTier}
                     showDiscountLabel={false}
                     alignSelf="flex-end"
                  />
               </HStack>
            </ProductCardBody>
         </ProductCard>
      </LinkBox>
   );
}

function ProductCardBadge(props: BadgeProps) {
   return (
      <Badge
         fontSize={{
            base: 'xs',
            xl: 'sm',
         }}
         maxW="full"
         overflow="hidden"
         isTruncated
         {...props}
      />
   );
}
