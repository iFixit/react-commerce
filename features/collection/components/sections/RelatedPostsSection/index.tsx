import { SimpleGrid } from '@chakra-ui/react';
import { Post } from '@features/collection';
import * as React from 'react';
import { PostCard } from './PostCard';

export interface RelatedPostsSectionProps {
   posts: Post[];
}

export function RelatedPostsSection({ posts }: RelatedPostsSectionProps) {
   if (posts.length === 0) {
      return null;
   }
   return (
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="6">
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
