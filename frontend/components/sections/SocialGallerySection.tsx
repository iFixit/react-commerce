'use client';

import { AspectRatio, Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { ResponsiveImage, Wrapper } from '@ifixit/ui';
import type { SocialPost } from '@models/components/social-post';
import { SectionDescription } from './SectionDescription';
import { SectionHeaderWrapper } from './SectionHeaderWrapper';
import { SectionHeading } from './SectionHeading';

export interface SocialGallerySectionProps {
   title?: string | null;
   description?: string | null;
   posts: SocialPost[];
}

export function SocialGallerySection({
   title,
   description,
   posts,
}: SocialGallerySectionProps) {
   if (posts.length === 0) return null;

   return (
      <Box as="section" position="relative" w="full" py="16">
         <SectionHeaderWrapper textAlign="center" mb="12">
            {title && <SectionHeading mb="4">{title}</SectionHeading>}
            {description && <SectionDescription richText={description} />}
         </SectionHeaderWrapper>
         <Wrapper>
            <Grid
               templateColumns={{
                  base: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(5, 1fr)',
               }}
               w="full"
               gap={{
                  base: 4,
                  md: 5,
               }}
            >
               {posts.map((post, index) => {
                  const isFirstPost = index === 0;
                  return (
                     <GridItem
                        key={index}
                        rowSpan={isFirstPost ? 2 : 1}
                        colSpan={isFirstPost ? 2 : 1}
                        position="relative"
                     >
                        <SocialPost post={post} />
                     </GridItem>
                  );
               })}
            </Grid>
         </Wrapper>
      </Box>
   );
}

interface SocialPostGridItemProps {
   post: SocialPost;
}

function SocialPost({ post: { image, author, url } }: SocialPostGridItemProps) {
   return (
      <Box as="article" position="relative" borderRadius="md" overflow="hidden">
         {image && (
            <Box w="full" position="relative">
               <AspectRatio ratio={1}>
                  <ResponsiveImage
                     src={image.url}
                     alt={image.altText ?? ''}
                     style={{
                        objectFit: 'cover',
                     }}
                     fill
                  />
               </AspectRatio>
            </Box>
         )}
         <Flex
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
            align="flex-end"
            justify="flex-end"
            py="3"
            px="4"
            bgGradient="linear(to-b, transparent 70%, black)"
         >
            <Text
               as="a"
               href={url ?? '#'}
               target="_blank"
               color="white"
               fontWeight="medium"
               noOfLines={1}
            >
               {authorWithHandle(author)}
            </Text>
         </Flex>
      </Box>
   );
}

function authorWithHandle(author: string) {
   if (author.startsWith('@')) return author;

   return `@${author}`;
}
