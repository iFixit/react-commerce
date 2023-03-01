import { Box, Flex } from '@chakra-ui/react';
import { ProductGrid } from '@components/common/ProductGrid';
import { ProductGridItem } from '@components/common/ProductGridItem';
import type { ProductCard } from '@models/shared/components/product-card';
import { SectionDescription } from './SectionDescription';
import { SectionHeaderWrapper } from './SectionHeaderWrapper';
import { SectionHeading } from './SectionHeading';

export interface FeaturedProductsSectionProps {
   title?: string | null;
   description?: string | null;
   products: ProductCard[];
}

export function FeaturedProductsSection({
   title,
   description,
   products,
}: FeaturedProductsSectionProps) {
   // products = products.slice(0, 10);
   return (
      <Box as="section" position="relative" w="full" bg="white">
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
                  borderBottomColor="gray.100"
                  borderTopWidth="1px"
                  borderBottomWidth="1px"
                  columns={{
                     base: 2,
                     sm: 3,
                     md: 4,
                     lg: 5,
                     xl: 6,
                  }}
                  spacing="1px"
                  bg="gray.100"
               >
                  {products.map((product) => (
                     <ProductGridItem key={product.id} product={product} />
                  ))}
               </ProductGrid>
            </Box>
         </Flex>
      </Box>
   );
}
