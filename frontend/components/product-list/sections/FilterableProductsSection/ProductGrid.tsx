import { LinkBox, LinkOverlay, SimpleGrid } from '@chakra-ui/react';
import {
   ProductCard,
   ProductCardBadgeList,
   ProductCardBody,
   ProductCardDiscountBadge,
   ProductCardImage,
   ProductCardPricing,
   ProductCardRating,
   ProductCardSoldOutBadge,
   ProductCardTitle,
} from '@components/common';
import { computeDiscountPercentage } from '@helpers/commerce-helpers';
import { ProductSearchHit } from '@models/product-list';
import * as React from 'react';

export type ProductGridProps = React.PropsWithChildren<unknown>;

export function ProductGrid({ children }: ProductGridProps) {
   return (
      <SimpleGrid
         bg="gray.100"
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
   const isDiscounted =
      product.compare_at_price != null &&
      product.compare_at_price > product.price_float;

   const percentage = isDiscounted
      ? computeDiscountPercentage(
           product.price_float * 100,
           product.compare_at_price! * 100
        )
      : 0;

   const isSoldOut = product.quantity_available <= 0;

   return (
      <LinkBox as="article" display="block" w="full">
         <ProductCard h="full">
            <ProductCardImage src={product.image_url} alt={product.title} />
            <ProductCardBadgeList>
               {isSoldOut ? (
                  <ProductCardSoldOutBadge />
               ) : (
                  isDiscounted && (
                     <ProductCardDiscountBadge percentage={percentage} />
                  )
               )}
            </ProductCardBadgeList>
            <ProductCardBody>
               <LinkOverlay
                  href={`https://ifixit.com/Store/Product/${product.sku}`}
               >
                  <ProductCardTitle>{product.title}</ProductCardTitle>
               </LinkOverlay>
               <ProductCardRating rating={product.rating} count={102} />
               <ProductCardPricing
                  currency="$"
                  price={product.price_float}
                  compareAtPrice={product.compare_at_price}
               />
            </ProductCardBody>
         </ProductCard>
      </LinkBox>
   );
}
