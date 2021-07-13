import { NewsletterSection } from '@components/NewsletterSection';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { Collection } from '@features/collection';
import { FilterableProductView, Page } from '@features/collection/components';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { AlgoliaProvider } from '@lib/algolia';
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

   return (
      <DefaultLayout title={`iFixit | ${collection.title}`}>
         <AlgoliaProvider
            key={collectionHandle}
            appId={ALGOLIA_APP_ID}
            apiKey={ALGOLIA_API_KEY}
            initialIndexName="shopify_ifixit_test_products"
            initialRawFilters={`collections:${collectionHandle}`}
         >
            <Page>
               <CollectionHeader collection={collection} />
               {collection.children.length > 0 && (
                  <CollectionSubcategories collection={collection} />
               )}
               <FilterableProductView />
               <CollectionBanner />
               <NewsletterSection />
            </Page>
         </AlgoliaProvider>
      </DefaultLayout>
   );
}
