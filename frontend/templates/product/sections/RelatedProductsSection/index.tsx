import {
   AspectRatio,
   Box,
   Flex,
   Heading,
   SimpleGrid,
   Text,
} from '@chakra-ui/react';
import { ProductRating, ProductVariantPrice } from '@components/common';
import { IfixitImage } from '@components/ifixit-image';
import { PageContentWrapper } from '@ifixit/ui';
import { Product } from '@models/product';
import { ImagePlaceholder } from '@templates/product/components/ImagePlaceholder';

export type RelatedProductsSectionProps = {
   product: Product;
};

export function RelatedProductsSection({
   product,
}: RelatedProductsSectionProps) {
   return (
      <Box bg="white" pt="16" fontSize="sm">
         <PageContentWrapper>
            <Heading
               as="h2"
               fontFamily="Archivo Black"
               color="gray.700"
               textAlign="center"
               mb="12"
            >
               Related products
            </Heading>
         </PageContentWrapper>
         <SimpleGrid
            columns={5}
            spacing="1px"
            bg="gray.200"
            borderTopWidth="1px"
            borderColor="gray.200"
         >
            {product.relatedProductVariants.map((variant) => {
               return (
                  <Flex key={variant.id} direction="column" bg="white" p="4">
                     <Box flexGrow={1}>
                        <CardImage
                           src={variant.image?.url}
                           alt={product.title}
                        />
                        <Text fontSize="md" mt="3">
                           {variant.product.title}
                        </Text>
                        {variant.product.rating != null &&
                           variant.product.reviewsCount != null && (
                              <ProductRating
                                 mt="2"
                                 mb="3"
                                 rating={variant.product.rating}
                                 count={variant.product.reviewsCount}
                              />
                           )}
                     </Box>
                     <ProductVariantPrice
                        price={variant.price}
                        compareAtPrice={variant.compareAtPrice}
                        alignSelf="flex-end"
                     />
                  </Flex>
               );
            })}
         </SimpleGrid>
      </Box>
   );
}

export interface CardImageProps {
   src?: string | null;
   alt?: string;
}

export const CardImage = ({ src, alt }: CardImageProps) => {
   if (src == null) {
      return (
         <AspectRatio ratio={1} flexGrow={0} flexShrink={0} position="relative">
            <ImagePlaceholder />
         </AspectRatio>
      );
   }
   return (
      <AspectRatio ratio={1} flexGrow={0} flexShrink={0} position="relative">
         <IfixitImage
            sizes="(max-width: 629px) 250px, (max-width: 767px) 400px, (max-width: 895px) 250px, (max-width: 1000px) 400px, 250px"
            layout="fill"
            objectFit="contain"
            src={src}
            alt={alt}
         />
      </AspectRatio>
   );
};
