import {
   Box,
   Button,
   Flex,
   LinkBox,
   LinkOverlay,
   StackDivider,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Thumbnail } from '@components/ui/Thumbnail';
import { productPath } from '@helpers/path-helpers';
import {
   createCartLineItem,
   ProductPreviewWithCartDetails,
} from '@helpers/product-preview-helpers';
import { useAddToCart } from '@ifixit/cart-sdk';
import {
   ProductVariantPrice,
   useCartDrawer,
   useGetUserPrice,
} from '@ifixit/ui';
import type { Money } from '@models/components/money';
import type { Product, ProductVariant } from '@pages/api/nextjs/cache/product';
import NextLink from 'next/link';
import { useAvailableForSaleVariants } from './useAvailableForSaleVariants';

interface CrossSellProps {
   product: Product;
   selectedVariant: ProductVariant;
}

export function CrossSell({ product, selectedVariant }: CrossSellProps) {
   const availableForSaleVariants = useAvailableForSaleVariants(
      selectedVariant,
      product.crossSellVariants
   );

   if (availableForSaleVariants.length === 0) {
      return null;
   }

   return (
      <Box
         bg="white"
         rounded="md"
         my="4"
         borderWidth="1px"
         borderColor="borderColor"
         p="4"
         data-testid="product-cross-sell"
      >
         <Text fontWeight="semibold">Frequently Bought Together</Text>
         <VStack
            spacing="0"
            borderColor="borderColor"
            borderWidth="1px"
            divider={<StackDivider borderColor="borderColor" />}
            rounded="md"
            mt="4"
         >
            {availableForSaleVariants.map((variant) => {
               return (
                  <CrossSellItem
                     key={variant.id}
                     productPreview={variant}
                     selectedVariant={selectedVariant}
                  />
               );
            })}
         </VStack>
      </Box>
   );
}

interface CrossSellItemProps {
   productPreview: ProductPreviewWithCartDetails;
   selectedVariant: ProductVariant;
}

function CrossSellItem({
   productPreview,
   selectedVariant,
}: CrossSellItemProps) {
   const addToCart = useAddToCart('Frequently Bought Together');
   const withUserPrice = useWithUserPrice();
   const drawer = useCartDrawer();

   const handleAddToCart = () => {
      if (selectedVariant.sku == null) {
         console.error(`Variant ${selectedVariant.id} has no SKU`);
         return;
      }

      addToCart.mutate({
         type: 'bundle',
         bundle: {
            currentItemCode: selectedVariant.sku,
            items: [createCartLineItem(withUserPrice(productPreview))],
         },
      });
      drawer.onOpen(event, true);
   };

   return (
      <Flex
         key={productPreview.id}
         data-testid="product-cross-sell-item"
         direction="column"
         w="full"
         p="2"
      >
         <LinkBox role="group">
            <Flex alignItems="center">
               <Thumbnail variant="small" image={productPreview.image} />
               <Flex direction="column">
                  <LinkOverlay
                     as={NextLink}
                     href={productPath(productPreview.handle)}
                     fontWeight="medium"
                     data-testid="product-cross-sell-item-title"
                     _groupHover={{
                        textDecoration: 'underline',
                     }}
                  >
                     {productPreview.title}
                  </LinkOverlay>
                  <ProductVariantPrice
                     price={productPreview.price}
                     compareAtPrice={productPreview.compareAtPrice}
                     proPricesByTier={productPreview.proPricesByTier}
                     direction="column-reverse"
                     size="extra-small"
                     variant="subdued"
                  />
               </Flex>
            </Flex>
         </LinkBox>
         <Button
            size={{
               base: 'xs',
               sm: 'sm',
            }}
            mt="1"
            colorScheme="brand"
            alignSelf="end"
            onClick={handleAddToCart}
         >
            Add to cart
         </Button>
      </Flex>
   );
}

function useWithUserPrice() {
   const getUserPrice = useGetUserPrice();
   return (
      productPreview: ProductPreviewWithCartDetails
   ): ProductPreviewWithCartDetails => {
      const userPrice = getUserPrice({
         price: productPreview.price,
         compareAtPrice: productPreview.compareAtPrice,
         proPricesByTier: productPreview.proPricesByTier,
      });
      return {
         ...productPreview,
         price: userPrice.price as Money,
         compareAtPrice: userPrice.compareAtPrice as Money,
      };
   };
}
