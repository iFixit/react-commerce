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

   const { price, compareAtPrice, isDiscounted, percentage } =
      useProductSearchHitPricing(product);

   return (
      <LinkBox as="article" display="block" w="full" role="group">
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
               <LinkOverlay href={`${appContext.ifixitOrigin}${product.url}`}>
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
