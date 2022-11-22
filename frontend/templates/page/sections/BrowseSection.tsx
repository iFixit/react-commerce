import {
   Box,
   Flex,
   Grid,
   GridItem,
   Icon,
   Input,
   InputGroup,
   InputLeftElement,
   Text,
   VStack,
} from '@chakra-ui/react';
import { ProductListCard } from '@components/product-list/ProductListCard';
import { productListPath } from '@helpers/path-helpers';
import { useAppContext } from '@ifixit/app';
import { PageContentWrapper } from '@ifixit/ui';
import { GetSection } from '@models/page';
import Image from 'next/image';
import NextLink from 'next/link';
import { RiSearchLine } from 'react-icons/ri';
import { SectionDescription } from '../components/SectionDescription';
import { SectionHeading } from '../components/SectionHeading';

export interface BrowseSectionProps {
   data: GetSection<'ComponentPageBrowse'>;
}

export function BrowseSection({
   data: { title, description, image, categories },
}: BrowseSectionProps) {
   return (
      <Box as="section" mb="16">
         <Box position="relative" w="full">
            <HeadingBackground image={image} />
            <PageContentWrapper py="16" textAlign="center" isResponsive>
               {title && (
                  <SectionHeading color="white" mb="6">
                     {title}
                  </SectionHeading>
               )}
               {description && (
                  <SectionDescription richText={description} color="gray.100" />
               )}
            </PageContentWrapper>
         </Box>
         <PageContentWrapper isResponsive>
            <VStack spacing="0">
               <SearchBox />
               <Text>or explore by category</Text>
            </VStack>
            <FeaturedCategories categories={categories} />
         </PageContentWrapper>
      </Box>
   );
}

type HeadingBackgroundProps = {
   image: BrowseSectionProps['data']['image'];
};

function HeadingBackground({ image }: HeadingBackgroundProps) {
   return (
      <>
         <Box
            position="absolute"
            bgGradient="linear(360deg, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.1) 100%)"
            zIndex={-1}
            w="full"
            h="full"
            opacity={0.8}
         />
         {image && (
            <Box position="absolute" zIndex={-2} w="full" h="full">
               <Image
                  src={image.url}
                  alt="store search image"
                  priority
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
               />
            </Box>
         )}
      </>
   );
}

function SearchBox() {
   const appContext = useAppContext();
   return (
      <Flex
         as="form"
         method="GET"
         action={`${appContext.ifixitOrigin}/Search`}
         w="full"
         justify="center"
      >
         <InputGroup
            transform="translateY(-50%)"
            size="lg"
            w={{
               base: 'full',
               md: '460px',
            }}
         >
            <InputLeftElement pointerEvents="none">
               <Icon as={RiSearchLine} color="gray.400" mr="-2" mb="-1px" />
            </InputLeftElement>
            <Input
               name="query"
               placeholder="Search.."
               tabIndex={0}
               variant="filled"
               bg="white"
               _hover={{
                  bg: 'gray.50',
               }}
               _focus={{
                  bg: 'white',
                  boxShadow: 'outline',
               }}
               fontSize="sm"
               borderRadius="md"
               boxShadow="lg"
            />
         </InputGroup>
      </Flex>
   );
}

type FeaturedCategoriesProps = {
   categories: BrowseSectionProps['data']['categories'];
};

function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
   return (
      <Grid mt="16" templateColumns="repeat(12, 1fr)" gap="4">
         {categories.map((category, index) => {
            const isBigger = index < 2;
            return (
               <GridItem
                  key={category.handle}
                  colSpan={{
                     base: 12,
                     sm: 6,
                     md: isBigger ? 6 : 4,
                     lg: isBigger ? 6 : 3,
                  }}
               >
                  <NextLink href={productListPath(category)} passHref>
                     <ProductListCard
                        as="a"
                        variant={isBigger ? 'medium' : 'small'}
                        productList={{
                           title: category.title,
                           imageUrl: category.image?.url,
                           description: category.metaDescription,
                        }}
                     />
                  </NextLink>
               </GridItem>
            );
         })}
      </Grid>
   );
}
