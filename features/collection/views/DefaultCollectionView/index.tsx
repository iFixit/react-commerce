import { HStack, VStack } from '@chakra-ui/react';
import { Card } from '@components/Card';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { Collection } from '@features/collection';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { AlgoliaProvider, SearchState } from '@libs/algolia';
import * as React from 'react';
import { CollectionFilters } from './CollectionFilters';
import { CollectionHeader } from './CollectionHeader';
import { CollectionPagination } from './CollectionPagination';
import { CollectionProducts } from './CollectionProducts';
import CollectionRelatedNewsStories from './CollectionRelatedNewsStories';
import { CollectionSubcategories } from './CollectionSubcategories';
import { CollectionToolbar } from './CollectionToolbar';
import { ProductViewType } from './types';

export type DefaultCollectionViewProps = {
   collection: Collection;
};

export function DefaultCollectionView({
   collection,
}: DefaultCollectionViewProps) {
   const collectionHandle = collection.handle;
   const [productViewType, setProductViewType] = React.useState(
      ProductViewType.List
   );

   const initialState = React.useMemo((): Partial<SearchState<any>> => {
      return {
         rawFilters: `collections:${collectionHandle}`,
      };
   }, [collectionHandle]);

   return (
      <DefaultLayout title={`iFixit | ${collection.title}`}>
         <AlgoliaProvider
            key={collectionHandle}
            appId={ALGOLIA_APP_ID}
            apiKey={ALGOLIA_API_KEY}
            initialState={initialState}
            indexName="shopify_ifixit_test_products"
         >
            <VStack
               w={{
                  base: 'full',
                  lg: '960px',
                  xl: '1100px',
               }}
               mx="auto"
               my={10}
               spacing={12}
               align="stretch"
               px={{
                  base: 0,
                  sm: 6,
                  lg: 0,
               }}
            >
               <CollectionHeader collection={collection} />
               {collection.children.length > 0 && (
                  <CollectionSubcategories collection={collection} />
               )}
               <VStack mb={4} align="stretch" spacing={4}>
                  <CollectionToolbar
                     productViewType={productViewType}
                     onProductViewTypeChange={setProductViewType}
                  />
                  <HStack align="flex-start" spacing={{ base: 0, md: 4 }}>
                     <Card
                        p={6}
                        width="250px"
                        display={{ base: 'none', md: 'block' }}
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
               <CollectionRelatedNewsStories />
            </VStack>
         </AlgoliaProvider>
      </DefaultLayout>
   );
}
