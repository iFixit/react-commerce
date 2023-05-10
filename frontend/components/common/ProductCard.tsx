import placeholderImageUrl from '@assets/images/no-image-fixie.jpeg';
import {
   AspectRatio,
   Badge,
   BadgeProps,
   forwardRef,
   Heading,
   HeadingProps,
   HStack,
   Stack,
   StackProps,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Rating } from '@components/ui';
import { ResponsiveImage } from '@ifixit/ui';
import React from 'react';

export const ProductCard = forwardRef<StackProps, 'div'>((props, ref) => {
   return (
      <Stack
         ref={ref}
         bg="white"
         position="relative"
         direction="column"
         spacing={{ base: 3, md: 4 }}
         align="center"
         p={{ base: 3, md: 4 }}
         {...props}
      />
   );
});

export interface ProductCardImageProps {
   src: string | null | undefined;
   alt?: string;
}

export const ProductCardImage = ({ src, alt = '' }: ProductCardImageProps) => {
   if (src == null) {
      return (
         <AspectRatio
            ratio={1}
            flexGrow={0}
            flexShrink={0}
            position="relative"
            maxW="96"
            w="full"
         >
            <ResponsiveImage
               sizes="30vw"
               fill
               src={placeholderImageUrl}
               alt={alt}
            />
         </AspectRatio>
      );
   }
   return (
      <AspectRatio
         ratio={1}
         flexGrow={0}
         flexShrink={0}
         position="relative"
         maxW="80"
         w="full"
      >
         <ResponsiveImage
            sizes="(max-width: 629px) 250px, (max-width: 767px) 400px, (max-width: 895px) 250px, (max-width: 1000px) 400px, 250px"
            fill
            style={{
               objectFit: 'contain',
            }}
            src={src}
            alt={alt}
         />
      </AspectRatio>
   );
};

export const ProductCardBody = (props: StackProps) => {
   return (
      <VStack
         h="full"
         w="full"
         spacing={{ base: 3, md: 4 }}
         align="flex-start"
         {...props}
      />
   );
};

export const ProductCardTitle = (props: HeadingProps) => {
   return (
      <Heading
         as="h3"
         fontSize={{ base: 'sm', md: 'md' }}
         fontWeight="medium"
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
         <Text lineHeight="1em" color="gray.600" fontSize="sm">
            {count}
         </Text>
      </HStack>
   );
};

export const ProductCardBadgeList = (props: StackProps) => {
   return (
      <HStack
         position="absolute"
         zIndex="1"
         top={{
            base: 3,
            md: 4,
         }}
         left={{
            base: 3,
            md: 4,
         }}
         right={{
            base: 3,
            md: 4,
         }}
         spacing="1"
         justify="flex-end"
         {...props}
      />
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
   isProPrice: boolean;
};

export const ProductCardDiscountBadge = ({
   percentage,
   isProPrice,
   ...badgeProps
}: ProductCardDiscountBadgeProps) => {
   return (
      <ProductCardBadge
         {...badgeProps}
         colorScheme={isProPrice ? 'orange' : 'red'}
      >
         {percentage}% Off
      </ProductCardBadge>
   );
};
