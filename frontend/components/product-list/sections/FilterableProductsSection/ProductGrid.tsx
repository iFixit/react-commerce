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
import { computeDiscountPercentage } from '@helpers/commerce-helpers';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { useAppContext } from '@ifixit/ui';
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
   const user = useAuthenticatedUser();
   const appContext = useAppContext();

   const proTierPrice = React.useMemo(() => {
      const proTier = user.data?.discountTier ?? null;
      if (proTier) {
         const priceString = product.price_tiers?.[proTier];
         return priceString == null ? null : parseFloat(priceString);
      }
      return null;
   }, [user.data?.discountTier, product.price_tiers]);

   const isDiscounted =
      product.compare_at_price != null &&
      product.compare_at_price > product.price_float;

   const percentage = isDiscounted
      ? computeDiscountPercentage(
           product.price_float * 100,
           product.compare_at_price! * 100
        )
      : 0;

   const price = proTierPrice ?? product.price_float;
   const compareAtPrice =
      proTierPrice == null ? product.compare_at_price : undefined;

   return (
      <LinkBox as="article" display="block" w="full">
         <ProductCard h="full">
            <ProductCardImage
               src={product.image_url}
               alt={product.group_title}
            />
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
                  <ProductCardTitle>{product.group_title}</ProductCardTitle>
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
