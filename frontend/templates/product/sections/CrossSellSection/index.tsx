import {
   Box,
   Button,
   Divider,
   Flex,
   Heading,
   Stack,
   VStack,
} from '@chakra-ui/react';
import { isPresent } from '@ifixit/helpers';
import { Wrapper } from '@ifixit/ui';
import type { Product, ProductVariant } from '@models/product';
import { CrossSellVariantCard } from './CrossSellVariantCard';
import { useAvailableForSaleVariants } from './useAvailableForSaleVariants';
import { useBundlePrice } from './useBundlePrice';
import { useCrossSellVariants } from './useCrossSellVariants';
import { useOptimisticAddToCart } from './useOptimisticAddToCart';

export interface CrossSellSectionProps {
   id: string;
   title?: string | null;
   product: Product;
   selectedVariant: ProductVariant;
}

export function CrossSellSection({
   id,
   title,
   product,
   selectedVariant,
}: CrossSellSectionProps) {
   const sectionTitle = isPresent(title) ? title : 'Frequently Bought Together';
   const availableForSaleVariants = useAvailableForSaleVariants(
      selectedVariant,
      product.crossSellVariants
   );

   const { selectedVariantIds, toggle } = useCrossSellVariants(
      selectedVariant,
      availableForSaleVariants
   );

   const bundlePrice = useBundlePrice({
      selectedVariant,
      crossSellVariants: availableForSaleVariants,
      selectedVariantIds,
   });

   const optimisticAddToCart = useOptimisticAddToCart({
      product,
      selectedVariant,
      crossSellVariants: availableForSaleVariants,
      selectedVariantIds: selectedVariantIds,
   });

   if (
      !selectedVariant.quantityAvailable ||
      availableForSaleVariants.length === 0
   ) {
      return null;
   }

   return (
      <Box as="section" id={id} my="16">
         <Wrapper>
            <Heading
               as="h2"
               color="gray.900"
               textAlign="center"
               mb={{
                  base: 6,
                  md: 16,
               }}
               size="lg"
               fontSize={{ base: '2xl', md: '3xl' }}
               fontWeight="medium"
            >
               {sectionTitle}
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
                  w="full"
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
                     <CrossSellVariantCard
                        key={product.handle}
                        handle={product.handle}
                        title={product.title}
                        image={selectedVariant.image ?? product.images[0]}
                        reviews={product.reviews}
                        price={selectedVariant.price}
                        compareAtPrice={selectedVariant.compareAtPrice}
                        proPricesByTier={selectedVariant.proPricesByTier}
                        isCurrentItem
                        isSelected={selectedVariantIds.includes(
                           selectedVariant.id
                        )}
                        onChange={() => toggle(selectedVariant.id)}
                     />
                     {availableForSaleVariants.map((crossSellVariant) => {
                        return (
                           <CrossSellVariantCard
                              key={crossSellVariant.id}
                              handle={crossSellVariant.handle}
                              title={crossSellVariant.title}
                              image={crossSellVariant.image}
                              reviews={crossSellVariant.reviews}
                              price={crossSellVariant.price}
                              compareAtPrice={crossSellVariant.compareAtPrice}
                              proPricesByTier={crossSellVariant.proPricesByTier}
                              isSelected={selectedVariantIds.includes(
                                 crossSellVariant.id
                              )}
                              onChange={() => toggle(crossSellVariant.id)}
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
                        data-testid="cross-sell-total-price"
                     >
                        Total price:{' '}
                        <Box as="span" fontWeight="semibold">
                           {bundlePrice}
                        </Box>
                     </Box>
                     <Button
                        data-testid="cross-sell-add-to-cart-button"
                        disabled={!selectedVariantIds.length}
                        colorScheme="brand"
                        minW="240px"
                        onClick={optimisticAddToCart}
                     >
                        Add to cart
                     </Button>
                  </Flex>
               </VStack>
            </Flex>
         </Wrapper>
      </Box>
   );
}
