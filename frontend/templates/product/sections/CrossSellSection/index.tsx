import {
   Badge,
   Box,
   Button,
   Divider,
   Flex,
   Heading,
   HStack,
   useBoolean,
   useTheme,
   VStack,
} from '@chakra-ui/react';
import {
   ProductCard,
   ProductCardBadgeList,
   ProductCardBody,
   ProductCardImage,
   ProductCardPricing,
   ProductCardTitle,
} from '@components/common';
import { Card } from '@components/ui';
import {
   faBoxCircleCheck,
   faCircleCheck,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageContentWrapper } from '@ifixit/ui';
import { MoneyV2 } from '@lib/shopify-storefront-sdk';
import { Product, ProductVariant } from '@models/product';
import React from 'react';

export type CrossSellSectionProps = {
   product: Product;
   selectedVariant: ProductVariant;
};

export function CrossSellSection({
   product,
   selectedVariant,
}: CrossSellSectionProps) {
   console.log({ selectedVariant });
   if (selectedVariant.crossSellProducts.length === 0) {
      return null;
   }

   return (
      <Box
         my="16"
         px={{
            base: 5,
            sm: 0,
         }}
      >
         <PageContentWrapper>
            <Heading
               as="h2"
               fontFamily="Archivo Black"
               color="gray.700"
               textAlign="center"
               mb={{
                  base: 6,
                  md: 16,
               }}
               size="lg"
            >
               Frequently bought together
            </Heading>
            <Flex justify="center">
               <VStack spacing="6" divider={<Divider borderColor="gray.300" />}>
                  <HStack align="stretch" spacing="6">
                     <CrossSellItem
                        key={product.handle}
                        product={product}
                        variant={selectedVariant}
                        isThisItem
                     />
                     {selectedVariant.crossSellProducts.map(
                        (crossSellProduct) => {
                           return (
                              <CrossSellItem
                                 key={crossSellProduct.handle}
                                 product={crossSellProduct}
                                 variant={crossSellProduct.variant}
                              />
                           );
                        }
                     )}
                  </HStack>
                  <Flex align="center" justify="space-between" bg="red">
                     <Box>Total price: 30$</Box>
                     <Button colorScheme="brand">Add to cart</Button>
                  </Flex>
               </VStack>
            </Flex>
         </PageContentWrapper>
      </Box>
   );
}

type CrossSellItemProps = {
   product: CardProduct;
   variant: CardProductVariant;
   isThisItem?: boolean;
};

type CardProduct = {
   title: string;
};

type CardProductVariant = {
   price: MoneyV2;
   compareAtPrice?: MoneyV2 | null;
   formattedPrice: string;
   formattedCompareAtPrice: string | null;
   image?: CardImage | null;
};

type CardImage = {
   altText?: string | null;
   url: string;
};

function CrossSellItem({ product, variant, isThisItem }: CrossSellItemProps) {
   const [isSelected, selection] = useBoolean(false);
   const theme = useTheme();
   return (
      <Card w="240px" overflow="hidden" onClick={selection.toggle}>
         <ProductCard h="full">
            <FontAwesomeIcon
               icon={faCircleCheck}
               color={
                  isSelected ? theme.colors.brand[500] : theme.colors.gray[300]
               }
               style={{ width: '24px', height: '24px' }}
            />
            {variant.image && (
               <ProductCardImage src={variant.image.url} alt={product.title} />
            )}
            {isThisItem && (
               <ProductCardBadgeList>
                  <Badge
                     colorScheme="brand"
                     textTransform="none"
                     borderRadius="lg"
                     px="2.5"
                     py="1"
                  >
                     This item
                  </Badge>
               </ProductCardBadgeList>
            )}
            <ProductCardBody>
               <ProductCardTitle _groupHover={{ color: 'brand.500' }}>
                  {product.title}
               </ProductCardTitle>
               {/* {(product.rating >= 4 || product.rating_count > 10) && (
            <ProductCardRating
               rating={product.rating}
               count={product.rating_count}
            />
         )} */}
               <ProductCardPricing
                  currency="$"
                  price={variant.price.amount}
                  compareAtPrice={variant.compareAtPrice?.amount}
               />
            </ProductCardBody>
         </ProductCard>
      </Card>
   );
}
