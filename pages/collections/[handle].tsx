import { VStack } from '@chakra-ui/react';
import { Layout } from '@components/Layout';
import { STRAPI_ORIGIN } from '@config/env';
import {
   BannerSection,
   FeaturedCollectionSection,
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
import { CollectionData, fetchCollectionPageData, LayoutData } from '@lib/api';
import { assertNever } from '@lib/utils';
import { GetServerSideProps } from 'next';
import * as React from 'react';

interface CollectionPageProps {
   collection: CollectionData;
   layout: LayoutData;
}

const ALGOLIA_DEFAULT_INDEX_NAME = 'shopify_ifixit_test_products';

export default function CollectionPage({ collection }: CollectionPageProps) {
   const hasDescription =
      collection.description != null && collection.description.length > 0;

   return (
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
                     <HeroBreadcrumbItem>{collection.title}</HeroBreadcrumbItem>
                  </HeroBreadcrumb>
               )}
               {!hasDescription && collection.image != null ? (
                  <HeroBackgroundImage src={collection.image.url}>
                     <HeroTitle color="white">{collection.title}</HeroTitle>
                  </HeroBackgroundImage>
               ) : (
                  <HeroTitle>{collection.title}</HeroTitle>
               )}
               {hasDescription && (
                  <HeroDescription>{collection.description}</HeroDescription>
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
         <FilterableProductsSection
            collectionHandle={collection.handle}
            initialSearchState={collection.searchState}
            algoliaIndexName={ALGOLIA_DEFAULT_INDEX_NAME}
         />
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
                     section.tags?.split(',').map((tag) => tag.trim()) || []
                  );
                  return <RelatedPostsSection key={index} tags={tags} />;
               }
               case 'ComponentCollectionNewsletterForm': {
                  return (
                     <NewsletterSection
                        key={index}
                        title={section.title}
                        description={section.description}
                        emailPlaceholder={section.inputPlaceholder || undefined}
                        subscribeLabel={section.callToActionLabel}
                     />
                  );
               }
               case 'ComponentCollectionFeaturedCollection': {
                  const { featuredCollection } = section;
                  if (featuredCollection) {
                     return (
                        <FeaturedCollectionSection
                           key={index}
                           handle={featuredCollection.handle}
                           algoliaIndexName={ALGOLIA_DEFAULT_INDEX_NAME}
                           title={featuredCollection.title}
                           description={featuredCollection.description}
                           imageSrc={
                              featuredCollection.image
                                 ? `${STRAPI_ORIGIN}${featuredCollection.image.url}`
                                 : undefined
                           }
                           imageAlt={
                              featuredCollection.image?.alternativeText ||
                              undefined
                           }
                        />
                     );
                  }
                  return null;
               }
               default: {
                  try {
                     return assertNever(section);
                  } catch (error) {
                     // Avoid breaking production when working on a new section type
                     return null;
                  }
               }
            }
         })}
      </Page>
   );
}

CollectionPage.getLayout = function getLayout(
   page: React.ReactElement,
   pageProps: CollectionPageProps
) {
   return (
      <Layout
         title={`iFixit | ${pageProps.collection.title}`}
         footer={pageProps.layout.footer}
      >
         {page}
      </Layout>
   );
};

export const getServerSideProps: GetServerSideProps<CollectionPageProps> = async (
   context
) => {
   // The data is considered fresh for 10 seconds, and can be served even if stale for up to 10 minutes
   context.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=600'
   );

   const { handle } = context.params || {};
   if (typeof handle !== 'string') {
      return {
         notFound: true,
      };
   }

   const pageData = await fetchCollectionPageData({
      collectionHandle: handle,
      storeCode: 'us',
      algoliaIndexName: ALGOLIA_DEFAULT_INDEX_NAME,
      urlQuery: context.query,
   });

   if (pageData == null || pageData.collection == null) {
      return {
         notFound: true,
      };
   }

   return {
      props: {
         collection: pageData.collection,
         layout: pageData.layout,
      },
   };
};
