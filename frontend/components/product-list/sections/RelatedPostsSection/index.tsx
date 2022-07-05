import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { usePrevious, useSafeSetState } from '@ifixit/ui';
import { fetchPosts, Post } from '@models/posts';
import * as React from 'react';
import isEqual from 'react-fast-compare';
import { PostCard } from './PostCard';

export interface RelatedPostsSectionProps {
   tags?: string[];
}

export function RelatedPostsSection({ tags = [] }: RelatedPostsSectionProps) {
   const { posts, isLoading, error } = usePosts(tags);

   if (error) {
      console.warn(`Failed to load related posts: ${error}`);
   }

   if (isLoading || posts.length === 0) {
      return null;
   }

   return (
      <VStack align="stretch" spacing="6">
         <Heading
            size="lg"
            px={{
               base: 6,
               sm: 0,
            }}
         >
            Related News Stories
         </Heading>
         <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing="6"
            px={{
               base: 6,
               sm: 0,
            }}
         >
            {posts.map((post) => (
               <PostCard
                  key={post.id}
                  title={post.title}
                  category={post.category}
                  imageSrc={post.image?.url}
                  imageAlt=""
                  link={post.permalink || ''}
               />
            ))}
         </SimpleGrid>
      </VStack>
   );
}

function usePosts(tags: string[]) {
   const previousTags = usePrevious(tags);

   const [state, setState] = useSafeSetState<{
      posts: Post[];
      isLoading: boolean;
      error?: string;
   }>({
      posts: [],
      isLoading: true,
   });

   React.useEffect(() => {
      if (!isEqual(tags, previousTags)) {
         fetchPosts(tags)
            .then((posts) => {
               setState({
                  posts,
                  isLoading: false,
                  error: undefined,
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
   }, [previousTags, setState, tags]);

   return state;
}
