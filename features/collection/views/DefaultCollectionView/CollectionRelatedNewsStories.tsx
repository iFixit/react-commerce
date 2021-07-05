import {
   Flex,
   Heading,
   Image,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   Text,
   usePrevious,
   VStack,
} from '@chakra-ui/react';
import { Card } from '@components/Card';
import {
   ALGOLIA_API_KEY,
   ALGOLIA_APP_ID,
   WP_BASIC_AUTH_PASSWORD,
   WP_BASIC_AUTH_USER,
   WP_ORIGIN,
} from '@config/env';
import { NewsStory } from '@features/collection';
import { AlgoliaProvider, useHits } from '@lib/algolia';
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
   // const { hits: posts } = useHits<NewsStory>();
   const { posts } = useRelatedNewsStories(['Right to Repair']);
   if (posts.length > 0) {
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
               {posts.map((post) => {
                  return (
                     <StoryCard
                        key={post.ID}
                        title={post.post_title}
                        category={post.categories[0]?.name}
                        imageSrc={post.featured_image?.md}
                        link={post.permalink || ''}
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

interface Params {
   tags: string[];
}

interface Post {
   ID: number;
   post_author: string;
   post_date: string;
   post_date_gmt: string;
   post_content: string;
   post_title: string;
   post_excerpt: string;
   permalink?: string;
   featured_image: PostImage;
   categories: PostCategory[];
}

interface PostCategory {
   term_id: number;
   name: string;
   slug: string;
   term_group: number;
   term_taxonomy_id: number;
   taxonomy: string;
   description: string;
   parent: number;
   count: number;
   filter: string;
   cat_ID: number;
   category_count: number;
   category_description: string;
   cat_name: string;
   category_nicename: string;
   category_parent: number;
}

interface PostImage {
   thumbnail: string;
   medium: string;
   medium_large: string;
   large: string;
   '1536x1536': string;
   '2048x2048': string;
   'post-header': string;
   sm: string;
   md: string;
   lg: string;
   'homepage-featured': string;
   'homepage-small': string;
   'homepage-medium': string;
   'rp4wp-thumbnail-post': string;
}

async function fetchRelatedNewsStories(params: Params): Promise<Post[]> {
   const base64Credentials = btoa(
      `${WP_BASIC_AUTH_USER}:${WP_BASIC_AUTH_PASSWORD}`
   );
   const response = await fetch(`${WP_ORIGIN}/wp-json/wp/v2/posts/related`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
         Authorization: `Basic ${base64Credentials}`,
         'Content-Type': 'application/json',
      },
   });
   if (response.status >= 200 && response.status < 300) {
      const json = await response.json();
      return json;
   }
   throw new Error(`failed with status "${response.statusText}"`);
}

interface UseRelatedNewsStories {
   posts: Post[];
   isLoading: boolean;
   error: null | string;
}

function useRelatedNewsStories(tags: string[]): UseRelatedNewsStories {
   const [state, setState] = React.useState<UseRelatedNewsStories>({
      posts: [],
      isLoading: true,
      error: null,
   });
   const previousTags = usePrevious(tags);

   React.useEffect(() => {
      const tagsHaveChanged =
         previousTags == null ||
         previousTags.some((prevTag) => !tags.includes(prevTag)) ||
         tags.some((tag) => !previousTags.includes(tag));
      if (tagsHaveChanged) {
         fetchRelatedNewsStories({ tags })
            .then((posts) => {
               setState({
                  posts,
                  isLoading: false,
                  error: null,
               });
            })
            .catch((error) => {
               setState((current) => ({
                  ...current,
                  isLoading: false,
                  error: error.message,
               }));
            });
      }
   }, [tags, previousTags]);

   return state;
}
