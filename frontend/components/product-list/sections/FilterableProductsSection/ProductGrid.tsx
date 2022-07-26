import { Badge, LinkBox, LinkOverlay, SimpleGrid } from '@chakra-ui/react';
import {
   ProductCard,
   ProductCardBadgeList,
   ProductCardBody,
   ProductCardDiscountBadge,
   ProductCardImage,
   ProductCardPricing,
   ProductCardRating,
   ProductCardTitle,
} from '@components/common';
import { useAppContext } from '@ifixit/app';
import { ProductSearchHit } from '@models/product-list';
import * as React from 'react';
import { useProductSearchHitPricing } from './useProductSearchHitPricing';

export type ProductGridProps = React.PropsWithChildren<unknown>;

export function ProductGrid({ children }: ProductGridProps) {
   return (
      <SimpleGrid
         data-testid="grid-view-products"
         borderBottomColor="gray.100"
         borderBottomWidth="1px"
         columns={{
            base: 2,
            sm: 2,
            lg: 3,
         }}
         spacing="1px"
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

   const { price, compareAtPrice, isDiscounted, percentage } =
      useProductSearchHitPricing(product);

   return (
      <LinkBox
         as="article"
         display="block"
         w="full"
         role="group"
         borderTop="0"
         borderRight="1px"
         borderLeft="0"
         borderBottom="1px"
         borderRightColor="gray.100"
         borderBottomColor="gray.100"
      >
         <ProductCard h="full">
            <ProductCardImage src={product.image_url} alt={product.title} />
            <ProductCardBadgeList>
               {product.is_pro > 0 && (
                  <Badge
                     colorScheme="orange"
                     textTransform="none"
                     borderRadius="lg"
                     px="2.5"
                     py="1"
                  >
                     PRO
                  </Badge>
               )}
               {isDiscounted && (
                  <ProductCardDiscountBadge percentage={percentage} />
               )}
            </ProductCardBadgeList>
            <ProductCardBody>
               <LinkOverlay
                  href={`${appContext.absoluteIfixitOrigin}${product.url}`}
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
               <ProductCardPricing
                  currency="$"
                  price={price}
                  compareAtPrice={compareAtPrice}
               />
            </ProductCardBody>
         </ProductCard>
      </LinkBox>
   );
}
