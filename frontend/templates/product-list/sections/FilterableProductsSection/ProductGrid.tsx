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
import { IconBadge, ProductVariantPrice, useUserPrice } from '@ifixit/ui';
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
            sm: 3,
            md: 2,
            lg: 3,
            xl: 4,
         }}
         spacing="1px"
         bg="gray.100"
         _after={{
            content: `""`,
            bg: 'white',
            gridRow: {
               base: Math.ceil(childrenCount / 2),
               sm: Math.ceil(childrenCount / 3),
               md: Math.ceil(childrenCount / 2),
               lg: Math.ceil(childrenCount / 3),
               xl: Math.ceil(childrenCount / 4),
            },
            gridColumnStart: {
               base: (childrenCount % 2) + 1,
               sm: (childrenCount % 3) + 1,
               md: (childrenCount % 2) + 1,
               lg: (childrenCount % 3) + 1,
               xl: (childrenCount % 4) + 1,
            },
            gridColumnEnd: {
               base: 3,
               sm: 4,
               md: 3,
               lg: 4,
               xl: 5,
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

   const { isProPrice } = useUserPrice({
      price,
      compareAtPrice,
      proPricesByTier,
   });

   return (
      <LinkBox as="article" display="block" w="full" role="group">
         <ProductCardBadgeList
            sx={{
               '& > :first-of-type': {
                  display: 'block',
               },
               '& > :not(:first-of-type)': {
                  display: 'none',
               },
            }}
         >
            {showOemPartnershipBadge && (
               <IconBadge colorScheme="green">
                  {product.oem_partnership}
               </IconBadge>
            )}
            {showProBadge && (
               <IconBadge colorScheme="orange">iFixit Pro</IconBadge>
            )}
            {showDiscountBadge && (
               <IconBadge colorScheme={isProPrice ? 'orange' : 'red'}>
                  {percentage}% Off
               </IconBadge>
            )}
            {showLifetimeWarrantyBadge && (
               <IconBadge colorScheme="blue">Lifetime Guarantee</IconBadge>
            )}
         </ProductCardBadgeList>
         <ProductCard h="full">
            <ProductCardImage src={product.image_url} alt={product.title} />
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
                     direction="row-reverse"
                     alignSelf="flex-end"
                  />
               </HStack>
            </ProductCardBody>
         </ProductCard>
      </LinkBox>
   );
}
