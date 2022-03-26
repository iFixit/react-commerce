import {
   Box,
   Button,
   Flex,
   Heading,
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
   ProductCardPricing,
   ProductCardRating,
   ProductCardSoldOutBadge,
   ProductCardTitle,
} from '@components/common';
import { Card } from '@components/ui';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID, IFIXIT_ORIGIN } from '@config/env';
import { computeDiscountPercentage } from '@helpers/commerce-helpers';
import { AlgoliaProvider, useHits } from '@lib/algolia';
import { ProductListPreview, ProductSearchHit } from '@models/product-list';
import Image from 'next/image';
import NextLink from 'next/link';
import * as React from 'react';

export interface FeaturedProductListSectionProps {
   productList: ProductListPreview;
   algoliaIndexName: string;
}

export function FeaturedProductListSection({
   productList,
   algoliaIndexName,
}: FeaturedProductListSectionProps) {
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
                  <Image
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
                        fontFamily="Archivo Black"
                        color="white"
                        noOfLines={3}
                     >
                        {productList.title}
                     </Heading>
                     <Text color="white" noOfLines={2}>
                        {productList.description}
                     </Text>
                     <NextLink href={productList.path} passHref>
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
               <AlgoliaProvider
                  key={productList.handle}
                  appId={ALGOLIA_APP_ID}
                  apiKey={ALGOLIA_API_KEY}
                  initialIndexName={algoliaIndexName}
                  filtersPreset={
                     productList.filters ??
                     `device:${productList.deviceTitle} AND public=1`
                  }
                  productsPerPage={3}
               >
                  <ProductGrid />
               </AlgoliaProvider>
            </Box>
         </Flex>
      </Card>
   );
}

function ProductGrid() {
   const hits = useHits<ProductSearchHit>();
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
            return <ProductListItem key={hit.handle} product={hit} />;
         })}
      </SimpleGrid>
   );
}

interface ProductListItemProps {
   product: ProductSearchHit;
}

function ProductListItem({ product }: ProductListItemProps) {
   const isDiscounted =
      product.compare_at_price != null &&
      product.compare_at_price > product.price_float;

   const percentage = isDiscounted
      ? computeDiscountPercentage(
           product.price_float * 100,
           product.compare_at_price! * 100
        )
      : 0;

   const isSoldOut = product.quantity_available <= 0;

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
      >
         <ProductCard flexGrow={1} h="full">
            <ProductCardImage src={product.image_url} alt={product.title} />
            <ProductCardBadgeList>
               {isSoldOut ? (
                  <ProductCardSoldOutBadge />
               ) : (
                  isDiscounted && (
                     <ProductCardDiscountBadge percentage={percentage} />
                  )
               )}
            </ProductCardBadgeList>
            <ProductCardBody>
               <LinkOverlay href={`${IFIXIT_ORIGIN}${product.url}`}>
                  <ProductCardTitle>{product.title}</ProductCardTitle>
               </LinkOverlay>
               <ProductCardRating rating={product.rating} count={102} />
               <ProductCardPricing
                  currency="$"
                  price={product.price_float}
                  compareAtPrice={product.compare_at_price}
               />
            </ProductCardBody>
         </ProductCard>
      </LinkBox>
   );
}
