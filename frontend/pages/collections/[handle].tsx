import { Layout } from '@components/Layout';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID, STRAPI_ORIGIN } from '@config/env';
import {
   BannerSection,
   FeaturedProductListSection,
   FeaturedSubcollectionsSection,
   FilterableProductsSection,
   HeroSection,
   MetaTags,
   NewsletterSection,
   Page,
   RelatedPostsSection,
   SubcategoriesSection,
} from '@features/productList';
import { AlgoliaProvider } from '@lib/algolia';
import {
   CollectionData,
   fetchCollectionPageData,
   LayoutData,
   ProductListGlobal,
} from '@lib/api';
import { GetServerSideProps } from 'next';
import * as React from 'react';

interface ProductListPageProps {
   collection: CollectionData;
   global: ProductListGlobal;
   layout: LayoutData;
}

const ALGOLIA_DEFAULT_INDEX_NAME = 'shopify_ifixit_test_products';

export default function ProductListPage({
   collection,
   global,
}: ProductListPageProps) {
   const { newsletterForm } = global;
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
                  case 'ComponentProductListBanner': {
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
                  case 'ComponentProductListRelatedPosts': {
                     const tags = [collection.title].concat(
                        section.tags?.split(',').map((tag) => tag.trim()) || []
                     );
                     return <RelatedPostsSection key={index} tags={tags} />;
                  }
                  case 'ComponentProductListFeaturedProductList': {
                     const { productList } = section;
                     console.log(productList.image?.url);
                     if (productList) {
                        return (
                           <FeaturedProductListSection
                              key={index}
                              handle={productList.handle}
                              algoliaIndexName={ALGOLIA_DEFAULT_INDEX_NAME}
                              title={productList.title}
                              description={productList.description}
                              imageSrc={
                                 productList.image
                                    ? // ? `${STRAPI_ORIGIN}${productList.image.url}`
                                      `${productList.image.url}`
                                    : undefined
                              }
                              imageAlt={productList.image?.alt || undefined}
                           />
                        );
                     }
                     return null;
                  }
                  case 'ComponentProductListLinkedProductListSet': {
                     const { title, productLists } = section;
                     if (productLists.length > 0) {
                        return (
                           <FeaturedSubcollectionsSection
                              key={index}
                              title={title}
                              collections={productLists}
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
            {newsletterForm && (
               <NewsletterSection
                  title={newsletterForm.title}
                  description={newsletterForm.subtitle}
                  emailPlaceholder={
                     newsletterForm.inputPlaceholder || undefined
                  }
                  subscribeLabel={newsletterForm.callToActionButtonTitle}
               />
            )}
         </AlgoliaProvider>
      </Page>
   );
}

ProductListPage.getLayout = function getLayout(
   page: React.ReactElement,
   pageProps: ProductListPageProps
) {
   return (
      <Layout
         title={`iFixit | ${pageProps.collection.title}`}
         header={pageProps.layout.header}
         footer={pageProps.layout.footer}
      >
         {page}
      </Layout>
   );
};

export const getServerSideProps: GetServerSideProps<ProductListPageProps> = async (
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
         global: pageData.global,
         layout: pageData.layout,
      },
   };
};
