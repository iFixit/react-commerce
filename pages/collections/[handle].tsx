import { VStack } from '@chakra-ui/react';
import { Footer } from '@components/Footer';
import { SiteLayout } from '@components/layouts/SiteLayout';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import {
   BannerSection,
   FilterableProductsSection,
   HeroBackgroundImage,
   HeroBreadcrumb,
   HeroBreadcrumbItem,
   HeroBreadcrumbLink,
   HeroDescription,
   HeroImage,
   HeroSection,
   HeroTitle,
   NewsletterSection,
   Page,
   RelatedPostsSection,
   SubcategoriesSection,
} from '@features/collection';
import { AlgoliaProvider } from '@lib/algolia';
import { CollectionPageData, fetchCollectionPageData } from '@lib/api';
import { assertNever } from '@lib/utils';
import { GetServerSideProps } from 'next';
import * as React from 'react';

interface CollectionPageProps {
   collection: CollectionPageData['collection'];
   footer: CollectionPageData['footer'];
   socialMediaAccounts: CollectionPageData['socialMediaAccounts'];
   stores: CollectionPageData['stores'];
}

export default function CollectionPage({
   collection,
   footer,
   socialMediaAccounts,
   stores,
}: CollectionPageProps) {
   const collectionHandle = collection.handle;
   const hasDescription =
      collection.description != null && collection.description.length > 0;
   return (
      <SiteLayout
         title={`iFixit | ${collection.title}`}
         footer={
            <Footer
               menu1={footer.menu1}
               menu2={footer.menu2}
               partners={footer.partners}
               bottomMenu={footer.bottomMenu}
               socialMediaAccounts={socialMediaAccounts}
               stores={stores}
            />
         }
      >
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
                  <SubcategoriesSection
                     heading={collection.title}
                     categories={collection.children}
                  />
               )}
               <FilterableProductsSection />
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
                        const tags = [collection.title].concat(
                           section.tags?.split(',').map((tag) => tag.trim()) ||
                              []
                        );
                        return <RelatedPostsSection key={index} tags={tags} />;
                     }
                     case 'ComponentCollectionNewsletterForm': {
                        return (
                           <NewsletterSection
                              key={index}
                              title={section.title}
                              description={section.description}
                              emailPlaceholder={
                                 section.inputPlaceholder || undefined
                              }
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
   const data = await fetchCollectionPageData({
      collectionHandle: handle,
      storeCode: 'us',
   });
   if (data == null || data.collection == null) {
      return {
         notFound: true,
      };
   }
   return {
      props: {
         collection: data.collection,
         footer: data.footer,
         socialMediaAccounts: data.socialMediaAccounts,
         stores: data.stores,
      },
   };
};
