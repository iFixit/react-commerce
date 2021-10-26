import { Layout } from '@components/Layout';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID, STRAPI_ORIGIN } from '@config/env';
import {
   BannerSection,
   FeaturedCollectionSection,
   FeaturedSubcollectionsSection,
   FilterableProductsSection,
   HeroSection,
   MetaTags,
   NewsletterSection,
   Page,
   RelatedPostsSection,
   SubcategoriesSection,
} from '@features/collection';
import { AlgoliaProvider } from '@lib/algolia';
import { CollectionData, fetchCollectionPageData, LayoutData } from '@lib/api';
import { GetServerSideProps } from 'next';
import * as React from 'react';

interface CollectionPageProps {
   collection: CollectionData;
   layout: LayoutData;
}

const ALGOLIA_DEFAULT_INDEX_NAME = 'shopify_ifixit_test_products';

export default function CollectionPage({ collection }: CollectionPageProps) {
   return (
      <Page>
         <AlgoliaProvider
            key={collection.handle}
            appId={ALGOLIA_APP_ID}
            apiKey={ALGOLIA_API_KEY}
            initialIndexName={ALGOLIA_DEFAULT_INDEX_NAME}
            initialContext={collection.searchContext}
         >
            <MetaTags collection={collection} />
            <HeroSection collection={collection} />
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
                           emailPlaceholder={
                              section.inputPlaceholder || undefined
                           }
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
                  case 'ComponentCollectionFeaturedSubcollections': {
                     const { title, collections } = section;
                     if (collections.length > 0) {
                        return (
                           <FeaturedSubcollectionsSection
                              key={index}
                              title={title}
                              collections={collections}
                           />
                        );
                     }
                     return null;
                  }
                  default: {
                     console.warn(
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        `Section ${section.__typename} not implemented`
                     );
                     return null;
                  }
               }
            })}
         </AlgoliaProvider>
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
