import { SimpleGrid, VStack } from '@chakra-ui/react';
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
import { computeDiscountPercentage } from '@helpers/commerce-helpers';
import {
   FeaturedProduct,
   FeaturedProductListSection as SectionData,
} from '@models/page';
import { PageContentWrapper } from './PageContentWrapper';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';

export interface FeaturedProductListSectionProps {
   data: SectionData;
}

export function FeaturedProductListSection({
   data: { title, description, products },
}: FeaturedProductListSectionProps) {
   return (
      <VStack
         as="section"
         position="relative"
         w="full"
         bg="white"
         pt="16"
         spacing="16"
      >
         <PageContentWrapper>
            <VStack textAlign="center" spacing="4">
               {title && <SectionHeading>{title}</SectionHeading>}
               {description && (
                  <SectionDescription richText={description} maxW="750px" />
               )}
            </VStack>
         </PageContentWrapper>
         <SimpleGrid
            bg="gray.200"
            borderColor="gray.200"
            borderBottomWidth="1px"
            borderTopWidth="1px"
            columns={{
               base: 2,
               lg: 5,
            }}
            spacing="1px"
            w="full"
            maxW="1800px"
         >
            {products.map((product) => (
               <FeaturedProductGridItem key={product.id} product={product} />
            ))}
         </SimpleGrid>
      </VStack>
   );
}

interface FeaturedProductGridItemProps {
   product: FeaturedProduct;
}

function FeaturedProductGridItem({ product }: FeaturedProductGridItemProps) {
   const isDiscounted =
      product.compareAtPrice != null && product.compareAtPrice > product.price;

   const percentage = isDiscounted
      ? computeDiscountPercentage(
           product.price * 100,
           product.compareAtPrice! * 100
        )
      : 0;

   const isSoldOut = product.inventoryQuantity <= 0;
   return (
      <ProductCard
         as="a"
         href={`https://ifixit.com/Store/Product/${product.sku}`}
         h="full"
      >
         <ProductCardImage src={product.image?.url} alt={product.title} />
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
            <ProductCardTitle>{product.title}</ProductCardTitle>
            <ProductCardRating rating={4} count={102} />
            <ProductCardPricing
               currency="$"
               price={product.price}
               compareAtPrice={product.compareAtPrice ?? undefined}
            />
         </ProductCardBody>
      </ProductCard>
   );
}
