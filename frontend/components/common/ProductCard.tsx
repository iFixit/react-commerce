import placeholderImageUrl from '@assets/images/no-image-fixie.jpeg';
import {
   AspectRatio,
   Badge,
   BadgeProps,
   Heading,
   HeadingProps,
   HStack,
   Stack,
   StackProps,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Rating } from '@components/ui';
import Image from 'next/image';
import React from 'react';

export const ProductCard = (props: StackProps) => {
   return (
      <Stack
         bg="white"
         position="relative"
         direction="column"
         spacing={5}
         align="stretch"
         p={4}
         {...props}
      />
   );
};

export interface ProductCardImageProps {
   src: string;
   alt?: string;
}

export const ProductCardImage = ({ src, alt }: ProductCardImageProps) => {
   if (src == null) {
      return (
         <AspectRatio ratio={1} flexGrow={0} flexShrink={0} position="relative">
            <Image
               sizes="30vw"
               layout="fill"
               src={placeholderImageUrl}
               alt={alt}
            />
         </AspectRatio>
      );
   }
   return (
      <AspectRatio ratio={1} flexGrow={0} flexShrink={0} position="relative">
         <Image
            sizes="30vw"
            layout="fill"
            objectFit="contain"
            src={src}
            alt={alt}
         />
      </AspectRatio>
   );
};

export const ProductCardBody = (props: StackProps) => {
   return <VStack h="full" spacing="4" align="flex-start" {...props} />;
};

export const ProductCardTitle = (props: HeadingProps) => {
   return (
      <Heading
         as="h3"
         fontSize={{
            base: 'xs',
            sm: 'sm',
            md: 'md',
            lg: 'md',
         }}
         {...props}
      />
   );
};

export type ProductCardRatingProps = StackProps & {
   rating: number;
   count: number;
};

export const ProductCardRating = ({
   rating,
   count,
   ...stackProps
}: ProductCardRatingProps) => {
   return (
      <HStack {...stackProps} align="flex-end">
         <Rating value={rating} />
         <Text lineHeight="1em">{count}</Text>
      </HStack>
   );
};

export type ProductCardPricingProps = StackProps & {
   price: number;
   compareAtPrice?: number;
   currency: string;
};

export const ProductCardPricing = ({
   price,
   compareAtPrice,
   currency,
   ...stackProps
}: ProductCardPricingProps) => {
   const isDiscounted = compareAtPrice != null && compareAtPrice > price;
   if (price == null) {
      return null;
   }
   return (
      <HStack
         w="full"
         flexGrow={1}
         align="flex-end"
         justify="flex-end"
         spacing="2"
         {...stackProps}
      >
         {isDiscounted && (
            <Text
               lineHeight="1em"
               textDecoration="line-through"
               color="gray.400"
               data-testid="product-price"
            >
               {currency}
               {compareAtPrice}
            </Text>
         )}
         <Text
            color={isDiscounted ? 'red.700' : 'inherit'}
            fontWeight="bold"
            fontSize="xl"
            lineHeight="1em"
         >
            {currency}
            {price}
         </Text>
      </HStack>
   );
};

export const ProductCardBadgeList = (props: StackProps) => {
   return (
      <HStack position="absolute" top="-1" right="4" spacing="1" {...props} />
   );
};

export const ProductCardBadge = (props: BadgeProps) => {
   return (
      <Badge
         textTransform="none"
         borderRadius="lg"
         px="2.5"
         py="1"
         {...props}
      />
   );
};

export const ProductCardSoldOutBadge = (props: BadgeProps) => {
   return (
      <ProductCardBadge {...props} colorScheme="gray">
         Sold out
      </ProductCardBadge>
   );
};

export type ProductCardDiscountBadgeProps = BadgeProps & {
   percentage: number;
};

export const ProductCardDiscountBadge = ({
   percentage,
   ...badgeProps
}: ProductCardDiscountBadgeProps) => {
   return (
      <ProductCardBadge {...badgeProps} colorScheme="red">
         {percentage}% Off
      </ProductCardBadge>
   );
};
