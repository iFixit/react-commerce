import {
   AspectRatio,
   Badge,
   Box,
   Button,
   Center,
   Circle,
   Divider,
   Flex,
   Heading,
   HStack,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react';
import { ProductRating } from '@components/common';
import { Card } from '@components/ui';
import { faImage } from '@fortawesome/pro-duotone-svg-icons';
import { faCircleCheck } from '@fortawesome/pro-solid-svg-icons';
import { filterNullableItems } from '@helpers/application-helpers';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { CartLineItem, useAddToCart } from '@ifixit/cart-sdk';
import { formatMoney, isPresent, Money } from '@ifixit/helpers';
import { FaIcon } from '@ifixit/icons';
import {
   PageContentWrapper,
   ProductVariantPrice,
   ResponsiveImage,
   useCartDrawer,
   useGetUserPrice,
} from '@ifixit/ui';
import type { Product, ProductVariant } from '@models/product/server';
import NextLink from 'next/link';
import React from 'react';

export type CrossSellSectionProps = {
   product: Product;
   selectedVariant: ProductVariant;
};

export function CrossSellSection({
   product,
   selectedVariant,
}: CrossSellSectionProps) {
   const addToCart = useAddToCart('Frequently Bought Together');
   const getUserPrice = useGetUserPrice();
   const { onOpen } = useCartDrawer();

   const crossSellVariantsForSale =
      useCrossSellVariantsForSale(selectedVariant);

   const [selectedCrossSellVariantIds, setSelectedCrossSellVariantIds] =
      useSelectCrossSellVariantIds(selectedVariant, crossSellVariantsForSale);

   const handleToggleVariant = (variantId: string) => {
      setSelectedCrossSellVariantIds((current) => {
         if (current.includes(variantId)) {
            return current.filter((id) => id !== variantId);
         }
         return current.concat(variantId);
      });
   };

   const totalPrice = React.useMemo(() => {
      return selectedCrossSellVariantIds.reduce((acc, id) => {
         if (id === selectedVariant.id) {
            return acc + selectedVariant.price.amount;
         }
         const variant = crossSellVariantsForSale.find(
            (variant) => variant.id === id
         );
         if (variant) {
            return acc + variant.price.amount;
         }
         return acc;
      }, 0);
   }, [
      crossSellVariantsForSale,
      selectedVariant.id,
      selectedVariant.price.amount,
      selectedCrossSellVariantIds,
   ]);

   const formattedTotalPrice = React.useMemo(() => {
      return formatMoney({
         amount: totalPrice,
         currencyCode: selectedVariant.price.currencyCode,
      });
   }, [selectedVariant.price.currencyCode, totalPrice]);

   const currentProduct = React.useMemo<CrossSellProduct>(() => {
      return {
         handle: product.handle,
         title: product.title,
         rating: product.rating?.value,
         reviewsCount: product.reviewsCount,
      };
   }, [
      product.handle,
      product.rating?.value,
      product.reviewsCount,
      product.title,
   ]);

   const handleAddToCart = () => {
      const input = selectedCrossSellVariantIds.map(
         (variantId): CartLineItem | null => {
            if (variantId === selectedVariant.id) {
               if (!isPresent(selectedVariant.sku)) {
                  return null;
               }
               const userPrice = getUserPrice({
                  price: selectedVariant.price,
                  compareAtPrice: selectedVariant.compareAtPrice,
                  proPricesByTier: selectedVariant.proPricesByTier,
               });
               return {
                  name: product.title,
                  internalDisplayName:
                     selectedVariant.internalDisplayName ?? undefined,
                  itemcode: selectedVariant.sku,
                  shopifyVariantId: selectedVariant.id,
                  quantity: 1,
                  imageSrc: selectedVariant.image?.url,
                  price: userPrice.price,
                  compareAtPrice: userPrice.compareAtPrice,
               };
            }
            const variant = crossSellVariantsForSale.find(
               (v) => v.id === variantId
            );
            const variantSku = variant?.sku;
            if (variant == null || !isPresent(variantSku)) {
               return null;
            }
            const userPrice = getUserPrice({
               price: variant.price,
               compareAtPrice: variant.compareAtPrice,
               proPricesByTier: variant.proPricesByTier,
            });
            return {
               name: variant.product.title,
               itemcode: variantSku,
               shopifyVariantId: selectedVariant.id,
               quantity: 1,
               imageSrc: variant.image?.url ?? '',
               price: userPrice.price,
               compareAtPrice: userPrice.compareAtPrice,
            };
         }
      );
      const selectedVariantSku = selectedVariant.sku;
      if (isPresent(selectedVariantSku)) {
         addToCart.mutate({
            type: 'bundle',
            bundle: {
               currentItemCode: selectedVariantSku,
               items: filterNullableItems(input),
            },
         });
         onOpen();
      } else {
         console.error('No SKU found for selected variant');
      }
   };

   if (
      !selectedVariant.quantityAvailable ||
      crossSellVariantsForSale.length === 0
   ) {
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
               color="gray.700"
               textAlign="center"
               mb={{
                  base: 6,
                  md: 16,
               }}
               size="lg"
            >
               Frequently Bought Together
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
                        isSelected={selectedCrossSellVariantIds.includes(
                           selectedVariant.id
                        )}
                        onChange={() => handleToggleVariant(selectedVariant.id)}
                     />
                     {crossSellVariantsForSale.map((crossSellVariant) => {
                        return (
                           <CrossSellItem
                              key={crossSellVariant.id}
                              product={crossSellVariant.product}
                              variant={crossSellVariant}
                              isSelected={selectedCrossSellVariantIds.includes(
                                 crossSellVariant.id
                              )}
                              onChange={() =>
                                 handleToggleVariant(crossSellVariant.id)
                              }
                           />
                        );
                     })}
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
                     <Button
                        data-testid="cross-sell-add-to-cart-button"
                        disabled={!selectedCrossSellVariantIds.length}
                        colorScheme="brand"
                        minW="240px"
                        onClick={handleAddToCart}
                     >
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
   handle: string;
   title: string;
   rating: number | undefined | null;
   reviewsCount: number | undefined | null;
};

type CrossSellProductVariant = {
   price: Money;
   compareAtPrice?: Money | null;
   proPricesByTier?: Record<string, Money> | null;
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
   return (
      <NextLink href={`/products/${product.handle}`} passHref legacyBehavior>
         <Card
            data-testid="cross-sell-item"
            as="a"
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
               <CardImage
                  src={variant.image?.url ?? null}
                  alt={product.title}
               />
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
                     price={variant.price}
                     compareAtPrice={variant.compareAtPrice}
                     proPricesByTier={variant.proPricesByTier}
                     direction="column-reverse"
                     alignSelf="flex-end"
                  />
               </Flex>
            </Flex>
         </Card>
      </NextLink>
   );
}

export interface CardImageProps {
   src: string | null;
   alt?: string;
}

export const CardImage = ({ src, alt }: CardImageProps) => {
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
            layout="fill"
            objectFit="contain"
            src={src}
            alt={alt}
         />
      </AspectRatio>
   );
};

function useCrossSellVariantsForSale(variant: ProductVariant) {
   const getIsProductForSale = useGetIsProductForSale();

   const crossSellVariantsForSale = React.useMemo(() => {
      return variant.crossSellVariants.filter((v) => {
         const isProductForSale = getIsProductForSale(v.product);
         return isProductForSale;
      });
   }, [getIsProductForSale, variant.crossSellVariants]);

   return crossSellVariantsForSale;
}

function useGetIsProductForSale() {
   const user = useAuthenticatedUser();
   const getIsProductForSale = React.useCallback(
      (product: Pick<Product, 'tags'>) => {
         const isProOnlyProduct = product.tags.includes('Pro Only');
         const isProUser = user.data?.is_pro ?? false;
         const isForSale = !isProOnlyProduct || (isProOnlyProduct && isProUser);
         return isForSale;
      },
      [user.data?.is_pro]
   );
   return getIsProductForSale;
}

function useSelectCrossSellVariantIds(
   selectedVariant: ProductVariant,
   crossSellVariants: ReturnType<typeof useCrossSellVariantsForSale>
) {
   const [selectedVariantIds, setSelectedVariantIds] = React.useState(
      crossSellVariants.map((variant) => variant.id).concat(selectedVariant.id)
   );

   React.useEffect(() => {
      setSelectedVariantIds(
         crossSellVariants
            .map((variant) => variant.id)
            .concat(selectedVariant.id)
      );
   }, [crossSellVariants, selectedVariant.id]);

   return [selectedVariantIds, setSelectedVariantIds] as const;
}
