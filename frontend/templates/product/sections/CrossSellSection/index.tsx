import placeholderImageUrl from '@assets/images/no-image-fixie.jpeg';
import {
   AspectRatio,
   Badge,
   Box,
   Button,
   Circle,
   Divider,
   Flex,
   Heading,
   HStack,
   Stack,
   StackProps,
   Text,
   useTheme,
   VStack,
} from '@chakra-ui/react';
import { ProductRating } from '@components/common';
import { IfixitImage } from '@components/ifixit-image';
import { Card } from '@components/ui';
import { faImage } from '@fortawesome/pro-duotone-svg-icons';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatShopifyPrice } from '@helpers/commerce-helpers';
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
   const [selectedVariantIds, setSelectedVariantIds] = React.useState(
      selectedVariant.crossSellVariants
         .map((variant) => variant.id)
         .concat(selectedVariant.id)
   );

   const handleToggleVariant = (variantId: string) => {
      setSelectedVariantIds((current) => {
         if (current.includes(variantId)) {
            return current.filter((id) => id !== variantId);
         }
         return current.concat(variantId);
      });
   };

   const totalPrice = React.useMemo(() => {
      return selectedVariantIds.reduce((acc, id) => {
         if (id === selectedVariant.id) {
            return acc + parseFloat(selectedVariant.price.amount);
         }
         const variant = selectedVariant.crossSellVariants.find(
            (variant) => variant.id === id
         );
         if (variant) {
            return acc + parseFloat(variant.price.amount);
         }
         return acc;
      }, 0);
   }, [
      selectedVariant.crossSellVariants,
      selectedVariant.id,
      selectedVariant.price.amount,
      selectedVariantIds,
   ]);

   const formattedTotalPrice = React.useMemo(() => {
      return formatShopifyPrice({
         amount: totalPrice,
         currencyCode: selectedVariant.price.currencyCode,
      });
   }, [selectedVariant.price.currencyCode, totalPrice]);

   const currentProduct = React.useMemo<CrossSellProduct>(() => {
      return {
         title: product.title,
         rating: product.reviewsData?.average,
         reviewsCount: product.reviewsData?.count,
      };
   }, [
      product.reviewsData?.average,
      product.reviewsData?.count,
      product.title,
   ]);

   if (selectedVariant.crossSellVariants.length === 0) {
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
            <Flex
               justify="center"
               maxWidth={{
                  md: '768px',
               }}
               mx={{
                  md: 'auto',
               }}
            >
               <VStack
                  spacing="6"
                  align="stretch"
                  divider={<Divider borderColor="gray.300" />}
               >
                  <Stack
                     direction={{
                        base: 'column',
                        md: 'row',
                     }}
                     align="stretch"
                     spacing="6"
                  >
                     <CrossSellItem
                        key={product.handle}
                        product={currentProduct}
                        variant={selectedVariant}
                        isCurrentItem
                        isSelected={selectedVariantIds.includes(
                           selectedVariant.id
                        )}
                        onChange={() => handleToggleVariant(selectedVariant.id)}
                     />
                     {selectedVariant.crossSellVariants.map(
                        (crossSellVariant) => {
                           return (
                              <CrossSellItem
                                 key={crossSellVariant.id}
                                 product={crossSellVariant.product}
                                 variant={crossSellVariant}
                                 isSelected={selectedVariantIds.includes(
                                    crossSellVariant.id
                                 )}
                                 onChange={() =>
                                    handleToggleVariant(crossSellVariant.id)
                                 }
                              />
                           );
                        }
                     )}
                  </Stack>
                  <Flex
                     direction={{
                        base: 'column',
                        sm: 'row',
                     }}
                     align={{
                        base: 'stretch',
                     }}
                     justify="space-between"
                  >
                     <Box
                        alignSelf={{
                           base: 'flex-end',
                           sm: 'center',
                        }}
                        mb={{
                           base: 6,
                           sm: 0,
                        }}
                     >
                        Total price:{' '}
                        <Box as="span" fontWeight="semibold">
                           {formattedTotalPrice}
                        </Box>
                     </Box>
                     <Button colorScheme="brand" minW="240px">
                        Add to cart
                     </Button>
                  </Flex>
               </VStack>
            </Flex>
         </PageContentWrapper>
      </Box>
   );
}

type CrossSellItemProps = {
   product: CrossSellProduct;
   variant: CrossSellProductVariant;
   isCurrentItem?: boolean;
   isSelected: boolean;
   onChange: (selected: boolean) => void;
};

type CrossSellProduct = {
   title: string;
   rating: number | undefined | null;
   reviewsCount: number | undefined | null;
};

type CrossSellProductVariant = {
   price: MoneyV2;
   compareAtPrice?: MoneyV2 | null;
   formattedPrice: string;
   formattedCompareAtPrice: string | null;
   image?: {
      altText?: string | null;
      url: string;
   } | null;
};

function CrossSellItem({
   product,
   variant,
   isCurrentItem,
   isSelected,
   onChange,
}: CrossSellItemProps) {
   const theme = useTheme();

   return (
      <Card
         overflow="hidden"
         onClick={() => onChange(!isSelected)}
         onKeyUp={(event) => {
            console.log(event.key, event.code);
            if (['Enter'].includes(event.code)) {
               onChange(!isSelected);
               event.preventDefault();
               event.stopPropagation();
            }
         }}
         tabIndex={0}
         flexBasis={{
            md: 0,
         }}
         flexGrow={1}
         outline="none"
         _focus={{
            boxShadow: 'outline',
         }}
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
            <CardImage src={variant.image?.url ?? null} alt={product.title} />
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
                           <Badge
                              colorScheme="brand"
                              textTransform="none"
                              borderRadius="lg"
                              px="2.5"
                              py="1"
                           >
                              Current item
                           </Badge>
                        </HStack>
                     )}
                     <Flex direction="column" h="full" align="flex-start">
                        <Text
                           fontSize="md"
                           mb="2"
                           _groupHover={{ color: 'brand.500' }}
                        >
                           {product.title}
                        </Text>
                        {product.rating != null &&
                           product.reviewsCount != null && (
                              <ProductRating
                                 mb="3"
                                 rating={product.rating}
                                 count={product.reviewsCount}
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
                     <FontAwesomeIcon
                        icon={faCircleCheck}
                        color={
                           isSelected
                              ? theme.colors.brand[500]
                              : theme.colors.gray[300]
                        }
                        style={{
                           width: '24px',
                           height: '24px',
                           transition: 'color 300ms',
                        }}
                     />
                  </Box>
               </Flex>
               <Pricing
                  price={formatShopifyPrice(variant.price)}
                  compareAtPrice={
                     variant.compareAtPrice
                        ? formatShopifyPrice(variant.compareAtPrice)
                        : undefined
                  }
                  alignSelf="flex-end"
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

export const CardImage = ({ src, alt }: CardImageProps) => {
   const theme = useTheme();
   if (src == null) {
      return (
         <AspectRatio ratio={1} flexGrow={0} flexShrink={0} position="relative">
            <Box bgColor="gray.100" borderRadius="md">
               <Circle bgColor="gray.200" size="72px">
                  <FontAwesomeIcon
                     icon={faImage}
                     color={theme.colors.gray[500]}
                     style={{
                        width: '32px',
                        height: '32px',
                        transition: 'color 300ms',
                     }}
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

export type PricingProps = StackProps & {
   price: string;
   compareAtPrice?: string | null;
};

export const Pricing = ({
   price,
   compareAtPrice,
   ...stackProps
}: PricingProps) => {
   const isDiscounted = compareAtPrice != null;
   if (price == null) {
      return null;
   }
   return (
      <VStack
         w="full"
         flexGrow={1}
         align="flex-end"
         justify="flex-end"
         spacing="2px"
         {...stackProps}
      >
         {isDiscounted && (
            <Text
               lineHeight="1em"
               textDecoration="line-through"
               color="gray.400"
               fontSize="sm"
               data-testid="product-price"
            >
               {compareAtPrice}
            </Text>
         )}
         <Text
            color={isDiscounted ? 'red.600' : 'inherit'}
            fontWeight="semibold"
            lineHeight="1em"
         >
            {price}
         </Text>
      </VStack>
   );
};
