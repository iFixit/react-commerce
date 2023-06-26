import {
   AspectRatio,
   Badge,
   Box,
   Center,
   Circle,
   Flex,
   HStack,
   Text,
} from '@chakra-ui/react';
import { ProductRating } from '@components/common';
import { Card } from '@components/ui';
import { SmartLink } from '@components/ui/SmartLink';
import { faImage } from '@fortawesome/pro-duotone-svg-icons';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import { productPath } from '@helpers/path-helpers';
import { FaIcon } from '@ifixit/icons';
import { ProductVariantPrice, ResponsiveImage } from '@ifixit/ui';
import type { Image } from '@models/components/image';
import type { Money } from '@models/components/money';
import type { ProPriceTiers } from '@models/components/pro-price-tiers';
import type { ProductReviews } from '@models/components/product-reviews';

interface CrossSellVariantCardProps {
   handle: string;
   title: string;
   image?: Image | null;
   reviews?: ProductReviews | null;
   price: Money;
   compareAtPrice?: Money | null;
   proPricesByTier?: ProPriceTiers | null;
   isCurrentItem?: boolean;
   isSelected: boolean;
   onChange: (selected: boolean) => void;
}

export function CrossSellVariantCard({
   handle,
   title,
   image,
   reviews,
   price,
   compareAtPrice,
   proPricesByTier,
   isCurrentItem,
   isSelected,
   onChange,
}: CrossSellVariantCardProps) {
   return (
      <Card
         data-testid="cross-sell-item"
         as={SmartLink}
         href={productPath(handle)}
         overflow="hidden"
         flexBasis={{
            md: 0,
         }}
         flexGrow={1}
      >
         <Flex
            direction={{
               base: 'row',
               md: 'column',
            }}
            bg="white"
            position="relative"
            align={{
               base: 'flex-start',
               md: 'stretch',
            }}
            p={{
               base: 3,
               md: 4,
            }}
            h="full"
            borderWidth="2px"
            borderColor={isSelected ? 'brand.500' : 'transparent'}
            borderRadius="lg"
            transition="all 300ms"
         >
            <CardImage src={image?.url ?? null} alt={title} />
            <Flex
               direction="column"
               w="full"
               h="full"
               justify="space-between"
               flexGrow={1}
            >
               <Flex w="full">
                  <Flex
                     w="full"
                     direction={{
                        base: 'column',
                     }}
                     ml={{
                        base: 3,
                        md: 0,
                     }}
                  >
                     {isCurrentItem && (
                        <HStack
                           position={{
                              base: 'relative',
                              md: 'absolute',
                           }}
                           top={{
                              base: 'auto',
                              md: 4,
                           }}
                           right={{
                              base: 'auto',
                              md: 4,
                           }}
                           spacing="1"
                           mb="3"
                        >
                           <Badge colorScheme="brand">Current item</Badge>
                        </HStack>
                     )}
                     <Flex direction="column" h="full" align="flex-start">
                        <Text
                           data-testid="cross-sell-item-title"
                           fontSize="md"
                           mb="2"
                           _groupHover={{ color: 'brand.500' }}
                        >
                           {title}
                        </Text>
                        {reviews && (
                           <ProductRating
                              mb="3"
                              rating={reviews.rating}
                              count={reviews.count}
                           />
                        )}
                     </Flex>
                  </Flex>
                  <Box
                     position={{
                        base: 'relative',
                        md: 'absolute',
                     }}
                     pl={{
                        base: 3,
                        md: 0,
                     }}
                     top={{
                        base: 0,
                        md: 4,
                     }}
                  >
                     <Center
                        onClick={(event) => {
                           onChange(!isSelected);
                           event.preventDefault();
                           event.stopPropagation();
                        }}
                        onKeyDown={(event) => {
                           if ('Enter' === event.code) {
                              onChange(!isSelected);
                              event.preventDefault();
                              event.stopPropagation();
                           }
                        }}
                        data-testid="cross-sell-item-select"
                        tabIndex={0}
                        outline="none"
                        _focus={{
                           boxShadow: 'outline',
                        }}
                        cursor="pointer"
                     >
                        <FaIcon
                           icon={faCircleCheck}
                           color={isSelected ? 'brand.500' : 'gray.300'}
                           h="6"
                           transition="color 300ms"
                           _hover={
                              isSelected ? { color: 'brand.700' } : undefined
                           }
                        />
                     </Center>
                  </Box>
               </Flex>
               <ProductVariantPrice
                  price={price}
                  compareAtPrice={compareAtPrice}
                  proPricesByTier={proPricesByTier}
                  direction="column-reverse"
                  alignSelf="flex-end"
                  size="medium"
               />
            </Flex>
         </Flex>
      </Card>
   );
}

export interface CardImageProps {
   src: string | null;
   alt?: string;
}

export const CardImage = ({ src, alt = '' }: CardImageProps) => {
   if (src == null) {
      return (
         <AspectRatio ratio={1} flexGrow={0} flexShrink={0} position="relative">
            <Box bgColor="gray.100" borderRadius="md">
               <Circle bgColor="gray.200" size="72px">
                  <FaIcon
                     icon={faImage}
                     color="gray.500"
                     h="8"
                     transition="color 300ms"
                  />
               </Circle>
            </Box>
         </AspectRatio>
      );
   }
   return (
      <AspectRatio
         ratio={1}
         flexGrow={0}
         flexShrink={0}
         position="relative"
         w={{
            base: '72px',
            md: 'unset',
         }}
         borderWidth={{
            base: '1px',
            md: '0',
         }}
         borderColor="gray.300"
         borderRadius={{
            base: 'md',
            md: 'unset',
         }}
         overflow="hidden"
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
