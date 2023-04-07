import { Box, Flex } from '@chakra-ui/react';
import { ProductGrid } from '@components/common/ProductGrid';
import { ProductGridItem } from '@components/common/ProductGridItem';
import type { ProductPreview } from '@models/components/product-preview';
import type { BackgroundColor } from '@models/sections/featured-products-section';
import { SectionDescription } from './SectionDescription';
import { SectionHeaderWrapper } from './SectionHeaderWrapper';
import { SectionHeading } from './SectionHeading';

export interface FeaturedProductsSectionProps {
   id: string;
   title?: string | null;
   description?: string | null;
   background?: BackgroundColor | null;
   products: ProductPreview[];
   onProductClick?: (product: ProductPreview) => void;
}

export function FeaturedProductsSection({
   id,
   title,
   description,
   background,
   products,
   onProductClick,
}: FeaturedProductsSectionProps) {
   if (products.length === 0) return null;

   return (
      <Box
         as="section"
         id={id}
         position="relative"
         w="full"
         bg={background ?? 'transparent'}
      >
         <Flex direction="column" alignItems="center">
            <SectionHeaderWrapper
               textAlign="center"
               mt={{
                  base: 12,
                  md: 16,
               }}
               mb={{
                  base: 6,
                  md: 12,
               }}
            >
               {title && <SectionHeading mb="4">{title}</SectionHeading>}
               {description && <SectionDescription richText={description} />}
            </SectionHeaderWrapper>
            <Box w="full">
               <ProductGrid
                  borderTopWidth="1px"
                  borderBottomWidth="1px"
                  columns={{
                     base: 2,
                     sm: 3,
                     md: 4,
                     lg: 5,
                     xl: 6,
                  }}
                  hideIncompleteRows
               >
                  {products.map((product) => (
                     <ProductGridItem
                        key={product.id}
                        product={product}
                        onClick={() => onProductClick?.(product)}
                     />
                  ))}
               </ProductGrid>
            </Box>
         </Flex>
      </Box>
   );
}
