import { HStack, VStack } from '@chakra-ui/react';
import { Card } from '@components/Card';
import { NewsletterSection } from '@components/NewsletterSection';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { Collection } from '@features/collection';
import {
   CollectionFilters,
   CollectionPagination,
   CollectionProducts,
   CollectionToolbar,
   ProductViewType,
} from '@features/collection/components';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { AlgoliaProvider, SearchState } from '@lib/algolia';
import * as React from 'react';
import { CollectionBanner } from './CollectionBanner';
import { CollectionHeader } from './CollectionHeader';
import { CollectionSubcategories } from './CollectionSubcategories';

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

   return (
      <DefaultLayout title={`iFixit | ${collection.title}`}>
         <AlgoliaProvider
            key={collectionHandle}
            appId={ALGOLIA_APP_ID}
            apiKey={ALGOLIA_API_KEY}
            initialIndexName="shopify_ifixit_test_products"
            initialRawFilters={`collections:${collectionHandle}`}
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
                        <CollectionProducts viewType={productViewType} />
                        <CollectionPagination />
                     </Card>
                  </HStack>
               </VStack>
               <CollectionBanner />
               <NewsletterSection />
            </VStack>
         </AlgoliaProvider>
      </DefaultLayout>
   );
}
