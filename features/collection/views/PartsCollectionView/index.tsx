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
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { Collection } from '@features/collection';
import {
   FilterableProductView,
   Page,
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

export function PartsCollectionView({ collection }: PartsCollectionViewProps) {
   return (
      <DefaultLayout title={`iFixit | ${collection.title}`}>
         <AlgoliaProvider
            appId={ALGOLIA_APP_ID}
            apiKey={ALGOLIA_API_KEY}
            initialIndexName="shopify_ifixit_test_products"
            // initialRawFilters={`collections:${props.collection.handle}`}
         >
            <Page>
               <Hero backgroundImageSource={collection.image?.url}>
                  <VStack>
                     <Heading
                        color="white"
                        size="xl"
                        fontFamily="Archivo Black"
                     >
                        {collection.title}
                     </Heading>
                     <HStack>
                        <CategoryInput />
                        <ManufacturerSelect />
                        <SearchInput maxW={300} />
                     </HStack>
                  </VStack>
               </Hero>
               <Main
                  idle={
                     <CategoryGrid>
                        {collection.children.map((category) => {
                           return (
                              <CategoryCard
                                 key={category.handle}
                                 category={category}
                              />
                           );
                        })}
                     </CategoryGrid>
                  }
                  filtered={<FilterableProductView />}
               />
            </Page>
         </AlgoliaProvider>
      </DefaultLayout>
   );
}

interface HeroProps {
   backgroundImageSource?: string;
}

const Hero = React.memo(
   ({
      children,
      backgroundImageSource: imageSrc,
   }: React.PropsWithChildren<HeroProps>) => {
      return (
         <Box
            backgroundImage={imageSrc ? `url("${imageSrc}")` : undefined}
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
               py="20"
            >
               {children}
            </Flex>
         </Box>
      );
   }
);

interface MainProps {
   filtered: JSX.Element;
   idle: JSX.Element;
}

function Main({ filtered, idle }: MainProps) {
   const isFiltered = useIsFiltered();
   return (
      <>
         <Collapse in={isFiltered} animateOpacity>
            {filtered}
         </Collapse>
         {!isFiltered && idle}
      </>
   );
}

const CategoryGrid = ({ children }: React.PropsWithChildren<unknown>) => {
   return (
      <SimpleGrid columns={4} spacing={6}>
         {children}
      </SimpleGrid>
   );
};

interface CategoryCardProps {
   category: Collection;
}

const CategoryCard = React.memo(({ category }: CategoryCardProps) => {
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
               <NextLink href={`/collections/${category.handle}`} passHref>
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
});

const manufacturerFacetName = 'named_tags.Device Brand';

function ManufacturerSelect() {
   const { isLoaded, values } = useFacetValues(manufacturerFacetName);
   const { selectedValueIds, set, clear } = useFacetFilterList(
      manufacturerFacetName,
      {
         filterType: 'or',
      }
   );

   const handleChange = React.useCallback<
      React.ChangeEventHandler<HTMLSelectElement>
   >(
      (event) => {
         const { value } = event.currentTarget;
         if (value == null || value === '') {
            clear();
         } else {
            set(event.currentTarget.value);
         }
      },
      [clear, set]
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
