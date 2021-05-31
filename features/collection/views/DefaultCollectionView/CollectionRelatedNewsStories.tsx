import {
   Flex,
   Heading,
   Image,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   Text,
   VStack,
} from '@chakra-ui/react';
import { Card } from '@components/Card';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { NewsStoryHit } from '@features/collection';
import { AlgoliaProvider, useHits } from '@libs/algolia';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import * as React from 'react';

export default function CollectionRelatedNewsStories() {
   return (
      <AlgoliaProvider
         appId={ALGOLIA_APP_ID}
         apiKey={ALGOLIA_API_KEY}
         indexName="wp_searchable_posts"
         initialState={{
            limit: 3,
            rawFilters: 'taxonomies.language:English',
         }}
      >
         <RelatedNewsStories />
      </AlgoliaProvider>
   );
}

function RelatedNewsStories() {
   const { hits } = useHits<NewsStoryHit>();
   console.log(hits);
   if (hits.length > 0) {
      return (
         <VStack
            align="flex-start"
            spacing="6"
            px={{
               base: 6,
               sm: 0,
            }}
         >
            <Heading as="h2" size="lg">
               Related News Stories
            </Heading>
            <SimpleGrid
               columns={{
                  base: 1,
                  sm: 2,
                  md: 3,
               }}
               spacing="6"
            >
               {hits.map((hit) => {
                  return (
                     <StoryCard
                        key={hit.objectID}
                        title={hit.post_title}
                        category={hit.taxonomies.category[0]}
                        imageSrc={hit.images['sm']?.url}
                        link={`https://ifixit.com${hit.permalink}`}
                     />
                  );
               })}
            </SimpleGrid>
         </VStack>
      );
   }
   return null;
}

interface StoryCardProps {
   title: string;
   category?: string;
   imageSrc?: string;
   imageAlt?: string;
   link: string;
   date?: Date | string | number;
}

function StoryCard({
   title,
   category,
   imageSrc,
   imageAlt,
   link,
   date,
}: StoryCardProps) {
   return (
      <LinkBox
         bg="white"
         as={Card}
         overflow="hidden"
         _hover={{
            boxShadow: 'md',
         }}
         transition="all 300ms"
      >
         <Flex direction="column">
            {imageSrc && (
               <Image
                  objectFit="cover"
                  h="140px"
                  src={imageSrc}
                  alt={imageAlt}
               />
            )}
            <VStack spacing="2" p="4" align="flex-start">
               {category && category.length > 0 && (
                  <Text
                     color="brand.500"
                     fontSize="xs"
                     fontWeight="bold"
                     textTransform="uppercase"
                  >
                     {category}
                  </Text>
               )}
               <NextLink href={link} passHref>
                  <LinkOverlay>
                     <Text as="h3" fontSize="lg" fontWeight="bold">
                        {title}
                     </Text>
                  </LinkOverlay>
               </NextLink>
               <Text fontFamily="mono" fontSize="sm" color="gray.600">
                  {dayjs(date).format('MMMM D, YYYY')}
               </Text>
            </VStack>
         </Flex>
      </LinkBox>
   );
}
