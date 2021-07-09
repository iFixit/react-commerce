import {
   Box,
   Center,
   Collapse,
   Flex,
   Heading,
   HStack,
   Image,
   LinkBox,
   LinkOverlay,
   Select,
   SimpleGrid,
   VStack,
} from '@chakra-ui/react';
import { Card } from '@components/Card';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { Collection } from '@features/collection';
import {
   CollectionFilters,
   CollectionPagination,
   CollectionProducts,
   CollectionToolbar,
   ProductViewType,
   SearchInput,
} from '@features/collection/components';
import { DefaultLayout } from '@layouts/DefaultLayout';
import {
   AlgoliaProvider,
   useFacetFilterList,
   useFacetValues,
   useIsFiltered,
} from '@lib/algolia';
import NextLink from 'next/link';
import * as React from 'react';
import { CategoryInput } from './CategoryInput';

export type PartsCollectionViewProps = {
   collection: Collection;
};

export function PartsCollectionView(props: PartsCollectionViewProps) {
   return (
      <DefaultLayout title={`iFixit | ${props.collection.title}`}>
         <AlgoliaProvider
            appId={ALGOLIA_APP_ID}
            apiKey={ALGOLIA_API_KEY}
            initialIndexName="shopify_ifixit_test_products"
            // initialRawFilters={`collections:${props.collection.handle}`}
         >
            <View {...props} />
         </AlgoliaProvider>
      </DefaultLayout>
   );
}

const View = React.memo(({ collection }: PartsCollectionViewProps) => {
   return (
      <VStack
         w={{ base: 'full', lg: '960px', xl: '1100px' }}
         mx="auto"
         align="stretch"
         py={10}
         spacing={12}
      >
         <Box
            backgroundImage={
               collection.image ? `url("${collection.image.url}")` : undefined
            }
            backgroundSize="cover"
            borderRadius={{
               base: 0,
               sm: 'xl',
            }}
            overflow="hidden"
         >
            <Flex
               grow={1}
               bgColor="blackAlpha.800"
               align="center"
               justify="center"
               py={20}
            >
               <VStack>
                  <Heading color="white" size="xl" fontFamily="Archivo Black">
                     {collection.title}
                  </Heading>
                  <HStack>
                     <CategoryInput />
                     <ManufacturerSelect />
                     <SearchInput maxW={300} />
                  </HStack>
               </VStack>
            </Flex>
         </Box>
         <ContentView collection={collection} />
      </VStack>
   );
});

interface ContentViewProps {
   collection: Collection;
}

function ContentView({ collection }: ContentViewProps) {
   const isFiltered = useIsFiltered();
   return (
      <>
         <Collapse in={isFiltered} animateOpacity>
            <SearchView />
         </Collapse>
         {!isFiltered && <CategoryView categories={collection.children} />}
      </>
   );
}

const SearchView = React.memo(() => {
   const [productViewType, setProductViewType] = React.useState(
      ProductViewType.List
   );
   return (
      <VStack mb={4} align="stretch" spacing={4}>
         <CollectionToolbar
            productViewType={productViewType}
            onProductViewTypeChange={setProductViewType}
         />
         <HStack align="flex-start" spacing={{ base: 0, sm: 4 }}>
            <Card
               p={6}
               width="250px"
               display={{ base: 'none', sm: 'block' }}
               position="sticky"
               top="4"
               h="calc(100vh - var(--chakra-space-4) * 2)"
               overflow="scroll"
            >
               <CollectionFilters />
            </Card>
            <Card
               flex={1}
               alignItems="center"
               borderRadius={{ base: 'none', sm: 'lg' }}
            >
               <CollectionProducts viewType={productViewType} />
               <CollectionPagination />
            </Card>
         </HStack>
      </VStack>
   );
});

interface CategoryViewProps {
   categories: Collection[];
}

const CategoryView = React.memo(({ categories }: CategoryViewProps) => {
   return (
      <SimpleGrid columns={4} spacing={6}>
         {categories.map((category) => {
            return (
               <LinkBox
                  key={category.handle}
                  bg="white"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="sm"
                  _hover={{
                     boxShadow: 'md',
                  }}
                  transition="all 300ms"
               >
                  <Flex direction="column">
                     {category.image && (
                        <Image
                           objectFit="cover"
                           h="180px"
                           src={category.image.url}
                           alt={category.image.alt}
                           display={{
                              base: 'none',
                              md: 'block',
                           }}
                        />
                     )}
                     <Center py={4}>
                        <NextLink
                           href={`/collections/${category.handle}`}
                           passHref
                        >
                           <LinkOverlay>
                              <Heading as="h2" size="sm">
                                 {category.title}
                              </Heading>
                           </LinkOverlay>
                        </NextLink>
                     </Center>
                  </Flex>
               </LinkBox>
            );
         })}
      </SimpleGrid>
   );
});

const manufacturerFacetName = 'named_tags.Device Brand';

function ManufacturerSelect() {
   const { isLoaded, values } = useFacetValues(manufacturerFacetName);
   const { selectedValueIds, set } = useFacetFilterList(manufacturerFacetName, {
      filterType: 'or',
   });

   const handleChange = React.useCallback<
      React.ChangeEventHandler<HTMLSelectElement>
   >(
      (event) => {
         set(event.currentTarget.value);
      },
      [set]
   );

   return (
      <Select
         bg="white"
         placeholder="Choose Manufacturer"
         fontWeight="bold"
         value={selectedValueIds[0] || ''}
         onChange={handleChange}
      >
         {isLoaded &&
            values.map((valueItem) => {
               return (
                  <option key={valueItem.id} value={valueItem.id}>
                     {valueItem.value}
                  </option>
               );
            })}
      </Select>
   );
}
