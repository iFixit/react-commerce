import {
   HStack,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   Text,
   VStack,
} from '@chakra-ui/react';
import {
   ProductCard,
   ProductCardBadge,
   ProductCardBadgeList,
   ProductCardBody,
   ProductCardDiscountBadge,
   ProductCardImage,
   ProductCardPricing,
   ProductCardRating,
   ProductCardSoldOutBadge,
   ProductCardTitle,
} from '@components/ProductCard';
import { Rating } from '@components/Rating';
import { ProductHit } from '@features/productList';
import { computeDiscountPercentage } from '@lib/commerce-utils';
import * as React from 'react';

export type ProductGridProps = React.PropsWithChildren<unknown>;

export function ProductGrid({ children }: ProductGridProps) {
   return (
      <SimpleGrid
         bg="gray.100"
         borderBottomColor="gray.100"
         borderBottomWidth="1px"
         w="100%"
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
   product: ProductHit;
}

export function ProductGridItem({ product }: ProductGridItemProps) {
   const isDiscounted =
      product.compare_at_price != null &&
      product.compare_at_price > product.price;

   const percentage = isDiscounted
      ? computeDiscountPercentage(
           product.price * 100,
           product.compare_at_price! * 100
        )
      : 0;

   const isSoldOut = product.inventory_quantity <= 0;

   return (
      <LinkBox as="article" display="block" w="full">
         <ProductCard h="full">
            <ProductCardImage src={product.product_image} alt={product.title} />
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
               <ProductCardRating rating={4} count={102} />
               <ProductCardPricing
                  currency="$"
                  price={product.price}
                  compareAtPrice={product.compare_at_price}
               />
            </ProductCardBody>
            {/* <ProductCardBody>
               <VStack align="flex-start" flexGrow={1}>
                  <LinkOverlay
                     href={`https://ifixit.com/Store/Product/${product.sku}`}
                  >
                     <ProductCardTitle>{product.title}</ProductCardTitle>
                  </LinkOverlay>
                  <HStack>
                     <Rating value={4} />
                     <Text>102</Text>
                  </HStack>
               </VStack>
               <HStack
                  w="full"
                  flexGrow={0}
                  align="center"
                  justify="flex-end"
                  spacing="2"
               >
                  {isDiscounted && (
                     <Text
                        lineHeight="1em"
                        textDecoration="line-through"
                        color="gray.400"
                     >
                        ${product.compare_at_price}
                     </Text>
                  )}
                  <Text
                     color={isDiscounted ? 'red.700' : 'inherit'}
                     fontWeight="bold"
                     fontSize="xl"
                     lineHeight="1em"
                  >
                     ${product.price}
                  </Text>
               </HStack>
            </ProductCardBody> */}
            {/* <HStack position="absolute" top="-1" right="4" spacing="1">
               {product.inventory_quantity > 0 ? (
                  <>
                     {percentage > 0 && (
                        <ProductCardBadge colorScheme="red">
                           {percentage}% Off
                        </ProductCardBadge>
                     )}
                  </>
               ) : (
                  <ProductCardBadge colorScheme="gray">
                     Sold out
                  </ProductCardBadge>
               )}
            </HStack> */}
         </ProductCard>
      </LinkBox>
   );
}
