import {
   Box,
   Button,
   Flex,
   Grid,
   GridItem,
   Heading,
   HStack,
   Icon,
   Link,
   Progress,
   Stack,
   Tag,
   Text,
} from '@chakra-ui/react';
import { Rating, RatingStar, RatingStarAppearance } from '@components/ui';
import { useAppContext } from '@ifixit/app';
import { PageContentWrapper } from '@ifixit/ui';
import type { Product } from '@models/product';
import { ProductVariant } from '@models/product';
import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { useProductReviews } from '../../hooks/useProductReviews';

const INITIAL_VISIBILE_REVIEWS = 3;

export type ReviewsSectionProps = {
   product: Product;
   selectedVariant: ProductVariant;
};

export function ReviewsSection({
   product,
   selectedVariant,
}: ReviewsSectionProps) {
   const appContext = useAppContext();
   const reviewsQuery = useProductReviews(product);
   const [visibleReviewsCount, setVisibleReviewsCount] = React.useState(
      INITIAL_VISIBILE_REVIEWS
   );

   const reviewsData = reviewsQuery.data;

   const totalReviewsCount = reviewsData?.count ?? 0;

   const reviewCountsByRating = React.useMemo(() => {
      if (reviewsData?.groupedReviews == null) {
         return [];
      }
      const reviewsCount: RatingCount[] = Object.keys(
         reviewsData.groupedReviews
      ).map((current) => {
         const rating = parseInt(current, 10);
         const count = reviewsData?.groupedReviews?.[current] ?? 0;
         return { rating, count };
      });
      reviewsCount.sort((a, b) => b.rating - a.rating);
      return reviewsCount;
   }, [reviewsData?.groupedReviews]);

   const allReviews = reviewsData?.reviews ?? [];
   const visibleReviews = allReviews.slice(0, visibleReviewsCount) ?? [];
   const hasMoreReviews = visibleReviewsCount < allReviews.length;

   const showMoreReviews = () => {
      setVisibleReviewsCount(
         Math.min(allReviews.length, visibleReviewsCount + 20)
      );
   };

   if (reviewsData == null) {
      return null;
   }

   return (
      <Box bg="white" py="16" mt="16" fontSize="sm">
         <PageContentWrapper>
            <Heading
               as="h2"
               fontFamily="Archivo Black"
               color="gray.700"
               textAlign="center"
               mb="12"
            >
               Customer reviews
            </Heading>
            {totalReviewsCount > 0 && (
               <Stack
                  direction={{
                     base: 'column',
                     md: 'row',
                  }}
                  spacing="10"
                  align="center"
                  justify="center"
               >
                  <Flex direction="column" align="center">
                     <Text fontSize="5xl">{reviewsData.average}</Text>
                     <Rating value={reviewsData.average ?? 0} />
                     {reviewsData.count && (
                        <Text fontSize="sm">{reviewsData.count} reviews</Text>
                     )}
                  </Flex>
                  <Grid
                     templateColumns="auto 200px auto"
                     gap="2.5"
                     alignItems="center"
                  >
                     {reviewCountsByRating.map(({ rating, count }) => {
                        const percentage = (count / totalReviewsCount) * 100;
                        return (
                           <React.Fragment key={rating}>
                              <GridItem>
                                 <Flex align="center">
                                    <Text
                                       as="span"
                                       fontSize="xs"
                                       lineHeight="1em"
                                       color="brand.500"
                                       mr="3px"
                                       mt="2px"
                                    >
                                       {rating}
                                    </Text>
                                    <RatingStar
                                       appearence={RatingStarAppearance.Full}
                                    />
                                 </Flex>
                              </GridItem>
                              <GridItem>
                                 <Progress
                                    w="200px"
                                    value={percentage}
                                    rounded="full"
                                 />
                              </GridItem>
                              <GridItem>
                                 <Tag
                                    justifyContent="center"
                                    w="full"
                                    colorScheme="brand"
                                 >
                                    {count}
                                 </Tag>
                              </GridItem>
                           </React.Fragment>
                        );
                     })}
                  </Grid>
               </Stack>
            )}
            <Flex bg="gray.100" p="5" rounded="md" mt="24">
               <Button
                  as="a"
                  href={`${appContext.ifixitOrigin}/User/Reviews/${selectedVariant.sku}`}
                  colorScheme="brand"
                  minW="200px"
               >
                  Write a product review
               </Button>
            </Flex>
            <Box>
               {visibleReviews.map((review) => {
                  return (
                     <Flex
                        key={review.reviewid}
                        py="6"
                        mx="5"
                        borderBottomWidth="1px"
                        borderColor="gray.200"
                     >
                        <Box w="240px" flexShrink={0}>
                           <Rating value={review.rating} mb="4" />
                           {review.author && (
                              <Link href={review.author.url} fontWeight="bold">
                                 {review.author.name}
                              </Link>
                           )}
                           <HStack color="green.500" spacing="1">
                              <Icon as={FaShieldAlt} />
                              <Text fontWeight="bold">Verified buyer</Text>
                           </HStack>
                           {review.created_date && (
                              <Text mt="4" fontWeight="bold" color="gray.500">
                                 Posted {formatReviewDate(review.created_date)}
                              </Text>
                           )}
                        </Box>
                        <Box>
                           <Text fontWeight="bold" color="brand.500" mb="3">
                              {review.productName} | {review.productVariantName}
                           </Text>
                           {review.body && (
                              <Box
                                 dangerouslySetInnerHTML={{
                                    __html: review.body,
                                 }}
                              />
                           )}
                        </Box>
                     </Flex>
                  );
               })}
            </Box>
            {hasMoreReviews && (
               <Box textAlign="center" mt="6">
                  <Button variant="outline" onClick={showMoreReviews}>
                     see more reviews
                  </Button>
               </Box>
            )}
         </PageContentWrapper>
      </Box>
   );
}

type RatingCount = {
   rating: number;
   count: number;
};

function formatReviewDate(timeSeconds: number) {
   return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
      new Date(timeSeconds * 1000)
   );
}
