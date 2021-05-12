import { HStack, VStack } from '@chakra-ui/react';
import { Card } from '@components/Card';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { Collection } from '@features/collection';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { AlgoliaProvider, Filter } from '@libs/algolia';
import React from 'react';
import { CollectionBanner } from './CollectionBanner';
import { CollectionFilters } from './CollectionFilters';
import { CollectionHeader } from './CollectionHeader';
import { CollectionPagination } from './CollectionPagination';
import { CollectionProducts } from './CollectionProducts';
import { CollectionSubcategories } from './CollectionSubcategories';
import { CollectionToolbar } from './CollectionToolbar';

export type DefaultCollectionViewProps = {
   collection: Collection;
};

export function DefaultCollectionView({
   collection,
}: DefaultCollectionViewProps) {
   const collectionHandle = collection.handle;

   const virtualFilter = React.useMemo((): Filter => {
      return {
         type: 'basic',
         facet: 'collections',
         value: collectionHandle,
      };
   }, [collectionHandle]);

   return (
      <DefaultLayout title={`iFixit | ${collection.title}`}>
         <AlgoliaProvider
            appId={ALGOLIA_APP_ID}
            apiKey={ALGOLIA_API_KEY}
            virtualFilter={virtualFilter}
            defaultIndexName="shopify_ifixit_test_products"
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
                  <CollectionToolbar />
                  <HStack align="flex-start" spacing={{ base: 0, sm: 4 }}>
                     <Card
                        p={6}
                        width="250px"
                        display={{ base: 'none', sm: 'block' }}
                     >
                        <CollectionFilters />
                     </Card>
                     <Card
                        flex={1}
                        alignItems="center"
                        borderRadius={{ base: 'none', sm: 'lg' }}
                     >
                        <CollectionProducts />
                        <CollectionPagination />
                     </Card>
                  </HStack>
               </VStack>
               <CollectionBanner />
            </VStack>
         </AlgoliaProvider>
      </DefaultLayout>
   );
}
