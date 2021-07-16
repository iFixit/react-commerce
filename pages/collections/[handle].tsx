import { VStack } from '@chakra-ui/react';
import { NewsletterSection } from '@components/NewsletterSection';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { Collection, loadCollection } from '@features/collection';
import {
   FilterableProductView,
   Hero,
   HeroBackgroundImage,
   HeroBreadcrumb,
   HeroBreadcrumbItem,
   HeroBreadcrumbLink,
   HeroDescription,
   HeroImage,
   HeroTitle,
   Page,
} from '@features/collection/components';
import { CollectionBanner } from '@features/collection/views/DefaultCollectionView/CollectionBanner';
import { CollectionSubcategories } from '@features/collection/views/DefaultCollectionView/CollectionSubcategories';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { AlgoliaProvider } from '@lib/algolia';
import { GetServerSideProps } from 'next';
import * as React from 'react';

type CollectionPageProps = {
   type: 'default' | 'parts';
   collection: Collection;
};

export default function CollectionPage({
   collection,
   type,
}: CollectionPageProps) {
   const collectionHandle = collection.handle;
   const hasDescription =
      collection.description != null && collection.description.length > 0;
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
               <Hero>
                  <VStack flex={1} align="flex-start">
                     <HeroBreadcrumb>
                        {collection.ancestors.map((ancestor) => (
                           <HeroBreadcrumbLink
                              key={ancestor.handle}
                              href={`/collections/${ancestor.handle}`}
                           >
                              {ancestor.title}
                           </HeroBreadcrumbLink>
                        ))}
                        <HeroBreadcrumbItem>
                           {collection.title}
                        </HeroBreadcrumbItem>
                     </HeroBreadcrumb>
                     {!hasDescription && collection.image != null ? (
                        <HeroBackgroundImage src={collection.image.url}>
                           <HeroTitle color="white">
                              {collection.title}
                           </HeroTitle>
                        </HeroBackgroundImage>
                     ) : (
                        <HeroTitle>{collection.title}</HeroTitle>
                     )}
                     {hasDescription && (
                        <HeroDescription>
                           {collection.description}
                        </HeroDescription>
                     )}
                  </VStack>
                  {collection.image && hasDescription && (
                     <HeroImage
                        src={collection.image.url}
                        alt={collection.image.alt}
                     />
                  )}
               </Hero>
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

export const getServerSideProps: GetServerSideProps<CollectionPageProps> = async (
   context
) => {
   const { handle } = context.params || {};
   if (typeof handle !== 'string') {
      return {
         notFound: true,
      };
   }
   const collection = await loadCollection(handle);
   if (collection == null) {
      return {
         notFound: true,
      };
   }
   return {
      props: {
         collection,
         type: handle === 'parts' ? 'parts' : 'default',
      },
   };
};
