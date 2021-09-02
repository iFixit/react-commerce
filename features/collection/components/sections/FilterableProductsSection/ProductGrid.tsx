import { SimpleGrid } from '@chakra-ui/react';
import {
   ProductCard,
   ProductCardBody,
   ProductCardImage,
   ProductCardPrice,
   ProductCardTitle,
} from '@components/ProductCard';
import { ProductHit } from '@features/collection';
import * as React from 'react';

export type ProductGridProps = React.PropsWithChildren<unknown>;

export function ProductGrid({ children }: ProductGridProps) {
   return (
      <SimpleGrid
         w="100%"
         columns={{
            base: 2,
            sm: 2,
            lg: 3,
         }}
         spacing={2}
      >
         {children}
      </SimpleGrid>
   );
}

export interface ProductGridItemProps {
   product: ProductHit;
}

export function ProductGridItem({ product }: ProductGridItemProps) {
   return (
      <ProductCard>
         <ProductCardImage src={product.product_image} alt={product.title} />
         <ProductCardBody>
            <ProductCardTitle>{product.title}</ProductCardTitle>
            <ProductCardPrice price={product.price} />
         </ProductCardBody>
      </ProductCard>
   );
}
