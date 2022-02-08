import {
   AspectRatio,
   Box,
   Flex,
   Grid,
   GridItem,
   Image,
   Text,
   VStack,
} from '@chakra-ui/react';
import {
   SocialGallerySection as SectionData,
   SocialPost as SocialPostData,
} from '@models/page';
import NextLink from 'next/link';
import { PageContentWrapper } from './PageContentWrapper';
import { SectionDescription } from './SectionDescription';
import { SectionHeading } from './SectionHeading';

export interface SocialGallerySectionProps {
   data: SectionData;
}

export function SocialGallerySection({
   data: { title, description, posts },
}: SocialGallerySectionProps) {
   return (
      <VStack as="section" position="relative" w="full" pt="20" spacing="16">
         <PageContentWrapper>
            <VStack textAlign="center" spacing="4" mb="20">
               {title && <SectionHeading>{title}</SectionHeading>}
               {description && (
                  <SectionDescription richText={description} maxW="750px" />
               )}
            </VStack>
            <Grid
               templateColumns={{
                  base: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(5, 1fr)',
               }}
               w="full"
               gap={5}
               mt="20"
               mb="36"
            >
               {posts.map((post, index) => {
                  const size = index === 0 ? PostSize.Large : PostSize.Default;
                  return (
                     <NextLink key={index} href={post.url ?? '#'} passHref>
                        <GridItem
                           as="a"
                           rowSpan={size === PostSize.Large ? 2 : 1}
                           colSpan={size === PostSize.Large ? 2 : 1}
                           position="relative"
                        >
                           <SocialPost post={post} />
                        </GridItem>
                     </NextLink>
                  );
               })}
            </Grid>
         </PageContentWrapper>
      </VStack>
   );
}

interface SocialPostGridItemProps {
   post: SocialPostData;
}

enum PostSize {
   Default = 'default',
   Large = 'large',
}

function SocialPost({
   post: { image, url, username },
}: SocialPostGridItemProps) {
   return (
      <Box as="article" position="relative">
         {image && (
            <Box w="full" position="relative">
               <AspectRatio ratio={1}>
                  <Image
                     src={image.url}
                     alt={image.alternativeText ?? undefined}
                     objectFit="cover"
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
            py="2.5"
            px="5"
            bgGradient="linear(to-b, transparent 78%, brand.500 )"
         >
            <Text
               color="white"
               fontFamily="mono"
               fontWeight="medium"
               isTruncated
            >
               @{username}
            </Text>
         </Flex>
      </Box>
   );
}
