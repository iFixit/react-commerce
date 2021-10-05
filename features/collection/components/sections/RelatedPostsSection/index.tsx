import { SimpleGrid, usePrevious } from '@chakra-ui/react';
import { fetchPosts, Post } from '@lib/api';
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
               link={post.permalink || ''}
            />
         ))}
      </SimpleGrid>
   );
}

function usePosts(tags: string[]) {
   const previousTags = usePrevious(tags);

   const [state, setState] = React.useState<{
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
   }, [tags, previousTags]);

   return state;
}
