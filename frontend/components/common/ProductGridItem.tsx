import { HStack, LinkBox, LinkOverlay } from '@chakra-ui/react';
import {
   ProductCard,
   ProductCardBadgeList,
   ProductCardBody,
   ProductCardImage,
   ProductCardRating,
   ProductCardTitle,
} from '@components/common';
import { getProductPath } from '@helpers/product-helpers';
import {
   computeDiscountPercentage,
   shouldShowProductRating,
} from '@ifixit/helpers';
import { IconBadge, ProductVariantPrice, useUserPrice } from '@ifixit/ui';
import type { ProductPreview } from '@models/components/product-preview';
import { useId } from 'react';

export interface ProductGridItemProps {
   product: ProductPreview;
   onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function ProductGridItem({ product, onClick }: ProductGridItemProps) {
   const userPrice = useUserPrice(product);

   const discountPercentage =
      userPrice.compareAtPrice != null
         ? computeDiscountPercentage(userPrice.price, userPrice.compareAtPrice)
         : 0;

   const productHeadingId = useId();

   return (
      <LinkBox
         as="article"
         role="group"
         aria-labelledby={productHeadingId}
         display="block"
         w="full"
      >
         <ProductCardBadgeList
            sx={{
               '& > div:first-of-type': {
                  display: 'block',
               },
               '& > div:not(:first-of-type)': {
                  display: 'none',
               },
            }}
         >
            {product.oemPartnership && (
               <IconBadge colorScheme="green">
                  {product.oemPartnership}
               </IconBadge>
            )}
            {product.isPro && (
               <IconBadge colorScheme="orange">iFixit Pro</IconBadge>
            )}
            {discountPercentage > 0 && (
               <IconBadge colorScheme={userPrice.isProPrice ? 'orange' : 'red'}>
                  {discountPercentage}% Off
               </IconBadge>
            )}
            {product.hasLifetimeWarranty && (
               <IconBadge colorScheme="blue">Lifetime Guarantee</IconBadge>
            )}
         </ProductCardBadgeList>
         <ProductCard h="full">
            <ProductCardImage src={product.image?.url} alt={product.title} />
            <ProductCardBody>
               <LinkOverlay
                  href={getProductPath(product.handle)}
                  onClick={onClick}
               >
                  <ProductCardTitle
                     _groupHover={{ color: 'brand.500' }}
                     id={productHeadingId}
                  >
                     {product.title}
                  </ProductCardTitle>
               </LinkOverlay>
               {shouldShowProductRating(product.reviews) && (
                  <ProductCardRating
                     rating={product.reviews.rating}
                     count={product.reviews.count}
                  />
               )}
               <HStack w="full" flexGrow={1} justify="flex-end" spacing="2">
                  <ProductVariantPrice
                     price={product.price}
                     compareAtPrice={product.compareAtPrice}
                     proPricesByTier={product.proPricesByTier}
                     showDiscountLabel={false}
                     direction="row-reverse"
                     alignSelf="flex-end"
                  />
               </HStack>
            </ProductCardBody>
         </ProductCard>
      </LinkBox>
   );
}
