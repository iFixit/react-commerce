import {
   Box,
   Button,
   Flex,
   Heading,
   HStack,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   Text,
   VStack,
} from '@chakra-ui/react';
import {
   ProductCard,
   ProductCardBadgeList,
   ProductCardBody,
   ProductCardDiscountBadge,
   ProductCardImage,
   ProductCardRating,
   ProductCardSoldOutBadge,
   ProductCardTitle,
} from '@components/common';
import { Card } from '@components/ui';
import { computeProductListAlgoliaFilterPreset } from '@helpers/product-list-helpers';
import { useAppContext } from '@ifixit/app';
import { FeaturedProductList, ProductSearchHit } from '@models/product-list';
import { ResponsiveImage, ProductVariantPrice, useUserPrice } from '@ifixit/ui';
import NextLink from 'next/link';
import { Configure, Index, useHits } from 'react-instantsearch-hooks-web';
import { computeDiscountPercentage } from '@ifixit/helpers';
import { productListPath } from '@helpers/path-helpers';
import { useProductSearchHitPricing } from './FilterableProductsSection/useProductSearchHitPricing';

export interface FeaturedProductListSectionProps {
   productList: FeaturedProductList;
   index: number;
}

export function FeaturedProductListSection({
   productList,
   index,
}: FeaturedProductListSectionProps) {
   const filters = computeProductListAlgoliaFilterPreset(productList);
   return (
      <Card
         overflow="hidden"
         borderRadius={{
            base: 'none',
            sm: 'lg',
         }}
      >
         <Flex
            direction={{
               base: 'column',
               md: 'row',
            }}
         >
            <Box
               position="relative"
               flexShrink={0}
               w={{
                  base: 'full',
                  md: '300px',
                  lg: '400px',
               }}
               maxH={{
                  base: '240px',
                  sm: 'unset',
               }}
               overflow="hidden"
               display="flex"
               alignItems="center"
            >
               {productList.image && (
                  <ResponsiveImage
                     src={productList.image.url}
                     alt={productList.image.alternativeText ?? ''}
                     objectFit="contain"
                     layout="fill"
                  />
               )}
               <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bg="blackAlpha.700"
               ></Box>
               <Box w="full" position="relative" py="10">
                  <VStack
                     px={{
                        base: '5',
                        sm: '7',
                        lg: '14',
                     }}
                     align="flex-start"
                     spacing="4"
                  >
                     <Heading
                        fontSize={{
                           base: productList.title.length > 40 ? 'xl' : '2xl',
                           sm: productList.title.length > 30 ? 'lg' : '2xl',
                           lg: productList.title.length > 40 ? '2xl' : '3xl',
                        }}
                        color="white"
                        noOfLines={3}
                     >
                        {productList.title}
                     </Heading>
                     <Text color="white" noOfLines={2}>
                        {productList.description}
                     </Text>
                     <NextLink href={productListPath(productList)} passHref>
                        <Button
                           as="a"
                           variant="outline"
                           color="white"
                           fontSize="sm"
                           colorScheme="whiteAlpha"
                        >
                           View more
                        </Button>
                     </NextLink>
                  </VStack>
               </Box>
            </Box>
            <Box flexGrow={1}>
               <Index
                  indexName={productList.algolia.indexName}
                  indexId={`featured-product-list-${index}`}
               >
                  <Configure hitsPerPage={3} filters={filters} />
                  <ProductGrid />
               </Index>
            </Box>
         </Flex>
      </Card>
   );
}

function ProductGrid() {
   const { hits } = useHits<ProductSearchHit>();
   return (
      <SimpleGrid
         bg="gray.100"
         w="100%"
         columns={{
            base: 2,
            lg: 3,
         }}
         spacing="1px"
      >
         {hits.map((hit) => {
            return <ProductListItem key={hit.objectID} product={hit} />;
         })}
      </SimpleGrid>
   );
}

interface ProductListItemProps {
   product: ProductSearchHit;
}

function ProductListItem({ product }: ProductListItemProps) {
   const appContext = useAppContext();
   const { price, compareAtPrice, isDiscounted, percentage, proPricesByTier } =
      useProductSearchHitPricing(product);
   const isSoldOut = product.quantity_available <= 0;

   const { isProPrice } = useUserPrice({
      price,
      compareAtPrice,
      proPricesByTier,
   });

   return (
      <LinkBox
         as="article"
         display="block"
         sx={{
            '&:nth-of-type(n+3)': {
               display: {
                  base: 'none',
                  lg: 'block',
               },
            },
         }}
         role="group"
      >
         <ProductCard flexGrow={1} h="full">
            <ProductCardImage src={product.image_url} alt={product.title} />
            <ProductCardBadgeList>
               {isSoldOut ? (
                  <ProductCardSoldOutBadge />
               ) : (
                  isDiscounted && (
                     <ProductCardDiscountBadge
                        percentage={percentage}
                        isProPrice={isProPrice}
                     />
                  )
               )}
            </ProductCardBadgeList>
            <ProductCardBody>
               <LinkOverlay href={`${appContext.ifixitOrigin}${product.url}`}>
                  <ProductCardTitle _groupHover={{ color: 'brand.500' }}>
                     {product.title}
                  </ProductCardTitle>
               </LinkOverlay>
               <ProductCardRating rating={product.rating} count={102} />
               <HStack w="full" flexGrow={1} justify="flex-end" spacing="2">
                  <ProductVariantPrice
                     price={price}
                     compareAtPrice={compareAtPrice}
                     proPricesByTier={proPricesByTier}
                     showDiscountLabel={false}
                     direction="column"
                     alignSelf="flex-end"
                  />
               </HStack>
            </ProductCardBody>
         </ProductCard>
      </LinkBox>
   );
}
