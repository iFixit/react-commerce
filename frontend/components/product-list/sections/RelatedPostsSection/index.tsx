import { Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import { fetchPosts, Post } from '@models/posts';
import { useQuery } from 'react-query';
import { PostCard } from './PostCard';

export interface RelatedPostsSectionProps {
   tags?: string[];
}

export function RelatedPostsSection({ tags = [] }: RelatedPostsSectionProps) {
   const { data: posts, isLoading, isError, error } = usePosts(tags);

   if (isError) {
      console.warn(`Failed to load related posts: ${error}`);
   }

   if (isLoading || !posts || posts.length === 0) {
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
                  date={post.date}
               />
            ))}
         </SimpleGrid>
      </VStack>
   );
}

const computeRelatedPostsKey = (tags: string[]) => [
   `related_posts?data=${encodeURIComponent(JSON.stringify({ tags }))}`,
];

function usePosts(tags: string[]) {
   const query = useQuery(
      computeRelatedPostsKey(tags),
      async (): Promise<Post[]> => {
         return await fetchPosts(tags);
      },
      {
         retryOnMount: false,
         staleTime: Infinity,
      }
   );
   return query;
}
