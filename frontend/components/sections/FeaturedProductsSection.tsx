import { Box, Flex } from '@chakra-ui/react';
import { ProductGrid } from '@components/common/ProductGrid';
import { ProductGridItem } from '@components/common/ProductGridItem';
import type { ProductPreview } from '@models/components/product-preview';
import { SectionDescription } from './SectionDescription';
import { SectionHeaderWrapper } from './SectionHeaderWrapper';
import { SectionHeading } from './SectionHeading';

export interface FeaturedProductsSectionProps {
   title?: string | null;
   description?: string | null;
   background?: BackgroundColor | null;
   products: ProductPreview[];
}

type BackgroundColor = 'transparent' | 'white';

export function FeaturedProductsSection({
   title,
   description,
   background,
   products,
}: FeaturedProductsSectionProps) {
   return (
      <Box
         as="section"
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
