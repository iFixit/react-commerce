import {
   Box,
   Button,
   Collapse,
   Divider,
   Flex,
   Heading,
   LinkBox,
   LinkOverlay,
   SimpleGrid,
   Text,
   useBreakpointValue,
   VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import * as React from 'react';

export type CollectionSubcategoriesProps = {
   heading: string;
   categories: Category[];
};

export interface Category {
   handle: string;
   title: string;
   image?: {
      url: string;
      alt?: string;
   } | null;
}

export function SubcategoriesSection({
   heading,
   categories,
}: CollectionSubcategoriesProps) {
   const [shouldShowMore, setShouldShowMore] = React.useState(false);
   const visibleCategoriesCount = useBreakpointValue({
      base: 4,
      sm: 6,
      md: 12,
   });

   const visibleCategories = React.useMemo(() => {
      return categories.slice(0, visibleCategoriesCount);
   }, [categories, visibleCategoriesCount]);

   const hiddenCategories = React.useMemo(() => {
      return categories.slice(visibleCategoriesCount, categories.length);
   }, [categories, visibleCategoriesCount]);

   const onToggle = React.useCallback(() => {
      setShouldShowMore((current) => !current);
   }, []);

   return (
      <VStack
         spacing={6}
         align="stretch"
         px={{
            base: 6,
            sm: 0,
         }}
      >
         <Text fontSize="lg" fontWeight="bold">
            Choose a model of {heading}
         </Text>
         <VStack spacing="4" align="stretch">
            <SimpleGrid
               columns={{
                  base: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
               }}
               spacing="4"
            >
               {visibleCategories.map((child) => {
                  return <CategoryLink key={child.handle} category={child} />;
               })}
            </SimpleGrid>
            {hiddenCategories.length > 0 && (
               <Collapse in={shouldShowMore}>
                  <SimpleGrid
                     columns={{
                        base: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                     }}
                     spacing="4"
                  >
                     {hiddenCategories.map((child) => {
                        return (
                           <CategoryLink key={child.handle} category={child} />
                        );
                     })}
                  </SimpleGrid>
               </Collapse>
            )}
         </VStack>
         {hiddenCategories.length > 0 && (
            <Box>
               <Button
                  variant="link"
                  size="sm"
                  onClick={onToggle}
                  mt="1"
                  pl="2"
                  pr="2"
                  py="1"
                  ml="-8px"
                  display="block"
               >
                  {shouldShowMore ? 'Show less' : 'Show more'}
               </Button>
            </Box>
         )}
      </VStack>
   );
}

interface CategoryLinkProps {
   category: Category;
}

const CategoryLink = ({ category }: CategoryLinkProps) => {
   return (
      <LinkBox
         bg="white"
         borderRadius="lg"
         overflow="hidden"
         boxShadow="base"
         _hover={{
            boxShadow: 'md',
         }}
         transition="all 300ms"
      >
         <Flex h="full" direction="row" align="center" justifyContent="center">
            {category.image && (
               <Flex
                  align="center"
                  justify="center"
                  flexBasis="80px"
                  h="60px"
                  flexGrow={0}
                  flexShrink={0}
                  position="relative"
               >
                  <Image
                     src={category.image.url}
                     alt={category.image.alt}
                     objectFit="contain"
                     layout="fill"
                  />
               </Flex>
            )}
            <Divider orientation="vertical" />
            <NextLink href={`/collections/${category.handle}`} passHref>
               <LinkOverlay
                  px="3"
                  py="2"
                  boxSizing="border-box"
                  h="full"
                  display="flex"
                  alignItems="center"
                  flexGrow={1}
               >
                  <Heading as="h2" fontSize="sm">
                     {category.title}
                  </Heading>
               </LinkOverlay>
            </NextLink>
         </Flex>
      </LinkBox>
   );
};
