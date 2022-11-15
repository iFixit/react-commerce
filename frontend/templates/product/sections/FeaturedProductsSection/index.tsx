import {
   AspectRatio,
   Badge,
   BadgeProps,
   Box,
   Flex,
   Heading,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   Text,
} from '@chakra-ui/react';
import { ProductRating } from '@components/common';
import { getProductPath } from '@helpers/product-helpers';
import { trackInMatomoAndGA } from '@ifixit/analytics';
import {
   computeDiscountPercentage,
   isLifetimeWarranty,
   isPresent,
   Money,
} from '@ifixit/helpers';
import {
   ResizableImage,
   PageContentWrapper,
   ProductVariantPrice,
} from '@ifixit/ui';
import { Product } from '@models/product';
import { ImagePlaceholder } from '@templates/product/components/ImagePlaceholder';
import NextLink from 'next/link';
import * as React from 'react';

export type FeaturedProductsSectionProps = {
   product: Product;
};

export function FeaturedProductsSection({
   product,
}: FeaturedProductsSectionProps) {
   if (product.featuredProductVariants.length === 0) {
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
               Featured Products
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
            {product.featuredProductVariants.map((variant) => {
               return (
                  <ProductGridItem
                     key={variant.id}
                     handle={variant.product.handle}
                     title={variant.product.title}
                     imageSrc={variant.image?.url}
                     rating={variant.product.rating}
                     reviewsCount={variant.product.reviewsCount}
                     price={variant.price}
                     compareAtPrice={variant.compareAtPrice}
                     proPricesByTier={variant.proPricesByTier}
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
   handle: string;
   title: string;
   imageSrc?: string | null;
   rating?: number | null;
   reviewsCount?: number | null;
   price: Money;
   compareAtPrice?: Money | null;
   proPricesByTier?: Record<string, Money> | null;
   isPro?: boolean;
   warranty?: string | null;
   oemPartnership?: string | null;
};

function ProductGridItem({
   handle,
   title,
   imageSrc,
   rating,
   reviewsCount,
   price,
   compareAtPrice,
   proPricesByTier,
   isPro,
   warranty,
   oemPartnership,
}: ProductGridItemProps) {
   const discountPercentage = computeDiscountPercentage(price, compareAtPrice);
   const hasLifetimeWarranty =
      typeof warranty === 'string' && isLifetimeWarranty(warranty);

   const productHeadingId = `product-heading-${handle}`;
   const onClick = React.useCallback(() => {
      trackInMatomoAndGA({
         eventCategory: 'Featured Products - Product Page',
         eventAction: `Featured on Product Page - ${handle}`,
      });
   }, [handle]);

   return (
      <LinkBox
         as="article"
         aria-labelledby={productHeadingId}
         role="group"
         bg="white"
         p="4"
         display="flex"
         flexDirection="column"
         sx={{
            '@media (max-width: 1000px)': {
               '&:nth-of-type(1n + 5)': {
                  display: 'none',
               },
            },
         }}
      >
         <Box flexGrow={1}>
            <CardImage src={imageSrc} alt={title} />
            <NextLink href={getProductPath(handle)} passHref>
               <LinkOverlay
                  id={productHeadingId}
                  onClick={onClick}
                  mt="3"
                  display="inline-block"
                  fontSize="md"
                  _groupHover={{ color: 'brand.500' }}
               >
                  {title}
               </LinkOverlay>
            </NextLink>
            {rating != null && reviewsCount != null && (
               <ProductRating mt="2" rating={rating} count={reviewsCount} />
            )}
            <Flex
               position="absolute"
               top="4"
               right="4"
               left="4"
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
            proPricesByTier={proPricesByTier}
            direction="column-reverse"
            alignSelf="flex-end"
            mt="3"
         />
      </LinkBox>
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
         <ResizableImage
            sizes="(max-width: 629px) 250px, (max-width: 767px) 400px, (max-width: 895px) 250px, (max-width: 1000px) 400px, 250px"
            layout="fill"
            objectFit="contain"
            src={src}
            alt={alt}
         />
      </AspectRatio>
   );
};
