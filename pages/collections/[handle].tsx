import { SimpleGrid, VStack } from '@chakra-ui/react';
import { SiteLayout } from '@components/layouts/SiteLayout';
import { NewsletterSection } from '@components/NewsletterSection';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import {
   Collection,
   FilterableProductSection,
   HeroBackgroundImage,
   HeroBreadcrumb,
   HeroBreadcrumbItem,
   HeroBreadcrumbLink,
   HeroDescription,
   HeroImage,
   HeroSection,
   HeroTitle,
   loadCollection,
   Page,
   RelatedPostsSection,
} from '@features/collection';
import { BannerSection } from '@features/collection/components/sections/BannerSection';
import { PostCard } from '@features/collection/components/sections/RelatedPostsSection/PostCard';
import { SubcategoriesSection } from '@features/collection/components/SubcategoriesSection';
import { AlgoliaProvider } from '@lib/algolia';
import { assertNever } from '@lib/utils';
import { GetServerSideProps } from 'next';
import * as React from 'react';

interface CollectionPageProps {
   collection: Collection;
}

export default function CollectionPage({ collection }: CollectionPageProps) {
   const collectionHandle = collection.handle;
   const hasDescription =
      collection.description != null && collection.description.length > 0;
   return (
      <SiteLayout title={`iFixit | ${collection.title}`}>
         <AlgoliaProvider
            key={collectionHandle}
            appId={ALGOLIA_APP_ID}
            apiKey={ALGOLIA_API_KEY}
            initialIndexName="shopify_ifixit_test_products"
            initialRawFilters={
               collection.filtersPreset
                  ? collection.filtersPreset
                  : `collections:${collectionHandle}`
            }
         >
            <Page>
               <HeroSection>
                  <VStack flex={1} align="flex-start">
                     {collection.ancestors.length > 0 && (
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
                     )}
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
               </HeroSection>
               {collection.children.length > 0 && (
                  <SubcategoriesSection collection={collection} />
               )}
               <FilterableProductSection />
               {collection.sections.map((section, index) => {
                  switch (section.__typename) {
                     case 'ComponentCollectionBanner': {
                        return (
                           <BannerSection
                              key={index}
                              title={section.title}
                              description={section.description}
                              callToActionLabel={section.callToActionLabel}
                              url={section.url}
                           />
                        );
                     }
                     case 'ComponentCollectionRelatedPosts': {
                        return (
                           <RelatedPostsSection
                              key={index}
                              posts={collection.relatedPosts || []}
                           />
                        );
                     }
                     case 'ComponentCollectionNewsletterForm': {
                        return (
                           <NewsletterSection
                              key={index}
                              title={section.title}
                              description={section.description}
                              emailPlaceholder={section.inputPlaceholder}
                              subscribeLabel={section.callToActionLabel}
                           />
                        );
                     }
                     default:
                        return assertNever(section);
                  }
               })}
            </Page>
         </AlgoliaProvider>
      </SiteLayout>
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
