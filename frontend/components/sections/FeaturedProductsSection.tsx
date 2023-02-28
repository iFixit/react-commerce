import { Box, Flex } from '@chakra-ui/react';
import type { FeaturedProductsSection } from '@models/shared/sections/featured-products-section';
import { SectionDescription } from './SectionDescription';
import { SectionHeaderWrapper } from './SectionHeaderWrapper';
import { SectionHeading } from './SectionHeading';

export interface FeaturedProductsSectionProps {
   data: FeaturedProductsSection;
}

export function FeaturedProductsSection({
   data: { title, description, products },
}: FeaturedProductsSectionProps) {
   console.log(products);
   return (
      <Box as="section" position="relative" w="full" bg="gray.200">
         <Flex direction="column" py="16" alignItems="center">
            <SectionHeaderWrapper textAlign="center">
               {title && <SectionHeading mb="4">{title}</SectionHeading>}
               {description && <SectionDescription richText={description} />}
            </SectionHeaderWrapper>
            <Box
               w="full"
               my={{
                  base: '6',
                  md: '8',
               }}
            >
               <p>Products go here</p>
            </Box>
         </Flex>
      </Box>
   );
}
