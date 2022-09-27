import {
   AspectRatio,
   Badge,
   BadgeProps,
   Box,
   Flex,
   Heading,
   SimpleGrid,
   Text,
} from '@chakra-ui/react';
import { ProductRating, ProductVariantPrice } from '@components/common';
import { IfixitImage } from '@components/ifixit-image';
import { computeDiscountPercentage, Money } from '@helpers/commerce-helpers';
import { isLifetimeWarranty } from '@helpers/product-helpers';
import { isPresent } from '@ifixit/helpers';
import { PageContentWrapper } from '@ifixit/ui';
import { Product } from '@models/product';
import { ImagePlaceholder } from '@templates/product/components/ImagePlaceholder';

export type RelatedProductsSectionProps = {
   product: Product;
};

export function RelatedProductsSection({
   product,
}: RelatedProductsSectionProps) {
   if (product.relatedProductVariants.length === 0) {
      return null;
   }
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
            columns={{
               base: 2,
               lg: 5,
            }}
            spacing="1px"
            bg="gray.200"
            borderTopWidth="1px"
            borderColor="gray.200"
         >
            {product.relatedProductVariants.map((variant) => {
               return (
                  <ProductGridItem
                     key={variant.id}
                     title={variant.product.title}
                     imageSrc={variant.image?.url}
                     rating={variant.product.rating}
                     reviewsCount={variant.product.reviewsCount}
                     price={variant.price}
                     compareAtPrice={variant.compareAtPrice}
                     oemPartnership={variant.product.oemPartnership}
                     warranty={variant.warranty}
                  />
               );
            })}
         </SimpleGrid>
      </Box>
   );
}

type ProductGridItemProps = {
   title: string;
   imageSrc?: string | null;
   rating?: number | null;
   reviewsCount?: number | null;
   price: Money;
   compareAtPrice?: Money | null;
   isPro?: boolean;
   warranty?: string | null;
   oemPartnership?: string | null;
};

function ProductGridItem({
   title,
   imageSrc,
   rating,
   reviewsCount,
   price,
   compareAtPrice,
   isPro,
   warranty,
   oemPartnership,
}: ProductGridItemProps) {
   const discountPercentage = computeDiscountPercentage(price, compareAtPrice);
   const hasLifetimeWarranty =
      typeof warranty === 'string' && isLifetimeWarranty(warranty);

   return (
      <Flex
         direction="column"
         bg="white"
         p="4"
         sx={{
            '@media (max-width: 1000px)': {
               '&:nth-of-type(1n + 5)': {
                  display: 'none',
               },
            },
         }}
      >
         <Box flexGrow={1} position="relative">
            <CardImage src={imageSrc} alt={title} />
            <Text fontSize="md" mt="3">
               {title}
            </Text>
            {rating != null && reviewsCount != null && (
               <ProductRating mt="2" rating={rating} count={reviewsCount} />
            )}
            <Flex
               position="absolute"
               top="0"
               right="0"
               left="0"
               justify="flex-end"
               sx={{
                  '&>:nth-of-type(1n + 2)': {
                     display: 'none',
                  },
               }}
            >
               {isPresent(oemPartnership) && (
                  <ProductGridItemBadge colorScheme="green">
                     {oemPartnership}
                  </ProductGridItemBadge>
               )}
               {isPro && (
                  <ProductGridItemBadge colorScheme="orange">
                     iFixit Pro
                  </ProductGridItemBadge>
               )}
               {discountPercentage > 0 && (
                  <ProductGridItemBadge colorScheme="red">
                     {discountPercentage}% Off
                  </ProductGridItemBadge>
               )}
               {hasLifetimeWarranty && (
                  <ProductGridItemBadge colorScheme="blue">
                     Lifetime Warranty
                  </ProductGridItemBadge>
               )}
            </Flex>
         </Box>
         <ProductVariantPrice
            price={price}
            compareAtPrice={compareAtPrice}
            alignSelf="flex-end"
            mt="3"
         />
      </Flex>
   );
}

function ProductGridItemBadge(props: BadgeProps) {
   return (
      <Badge
         fontSize={{
            base: 'xs',
            xl: 'sm',
         }}
         maxW="full"
         overflow="hidden"
         isTruncated
         textTransform="none"
         {...props}
      />
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
