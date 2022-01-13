import { Layout } from '@components/Layout';
import {
   BannerSection,
   FeaturedProductListSection,
   ProductListSetSection,
   FilterableProductsSection,
   HeroSection,
   MetaTags,
   NewsletterSection,
   PageLayout,
   RelatedPostsSection,
   ProductListChildrenSection,
} from '@components/ProductList';
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { AlgoliaProvider, SearchContext } from '@lib/algolia';
import { getGlobalSettings, GlobalSettings } from '@models/global-settings';
import {
   createProductListSearchContext,
   getProductListByHandle,
   ProductSearchHit,
   ProductList,
   ProductListSectionType,
} from '@models/product-list';
import {
   getStoreByCode,
   getStoreList,
   Store,
   StoreListItem,
} from '@models/store';
import { GetServerSideProps } from 'next';
import * as React from 'react';

interface ProductListPageProps {
   productList: ProductList;
   searchContext: SearchContext<ProductSearchHit>;
   globalSettings: GlobalSettings;
   stores: StoreListItem[];
   currentStore: Store;
}

const ALGOLIA_DEFAULT_INDEX_NAME = 'shopify_ifixit_test_products';

export default function ProductListPage({
   productList,
   searchContext,
   globalSettings,
}: ProductListPageProps) {
   const { newsletterForm } = globalSettings;
   return (
      <PageLayout>
         <AlgoliaProvider
            key={productList.handle}
            appId={ALGOLIA_APP_ID}
            apiKey={ALGOLIA_API_KEY}
            initialIndexName={ALGOLIA_DEFAULT_INDEX_NAME}
            initialContext={searchContext}
         >
            <MetaTags productList={productList} />
            <HeroSection productList={productList} />
            {productList.children.length > 0 && (
               <ProductListChildrenSection
                  heading={productList.title}
                  productListChildren={productList.children}
               />
            )}
            <FilterableProductsSection />
            {productList.sections.map((section, index) => {
               switch (section.type) {
                  case ProductListSectionType.Banner: {
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
                  case ProductListSectionType.RelatedPosts: {
                     const tags = [productList.title].concat(
                        section.tags?.split(',').map((tag) => tag.trim()) || []
                     );
                     return <RelatedPostsSection key={index} tags={tags} />;
                  }
                  case ProductListSectionType.FeaturedProductList: {
                     const { productList } = section;
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
                                    ? `${productList.image.url}`
                                    : undefined
                              }
                              imageAlt={
                                 productList.image?.alternativeText || undefined
                              }
                           />
                        );
                     }
                     return null;
                  }
                  case ProductListSectionType.ProductListSet: {
                     const { title, productLists } = section;
                     if (productLists.length > 0) {
                        return (
                           <ProductListSetSection
                              key={index}
                              title={title}
                              productLists={productLists}
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
      </PageLayout>
   );
}

ProductListPage.getLayout = function getLayout(
   page: React.ReactElement,
   pageProps: ProductListPageProps
) {
   return (
      <Layout
         title={`iFixit | ${pageProps.productList.title}`}
         currentStore={pageProps.currentStore}
         stores={pageProps.stores}
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

   const [
      globalSettings,
      stores,
      currentStore,
      productList,
   ] = await Promise.all([
      getGlobalSettings(),
      getStoreList(),
      getStoreByCode('us'),
      getProductListByHandle(handle),
   ]);

   if (productList == null) {
      return {
         notFound: true,
      };
   }

   const searchContext = await createProductListSearchContext({
      algoliaIndexName: ALGOLIA_DEFAULT_INDEX_NAME,
      productListHandle: handle,
      urlQuery: context.query,
      filters: productList.filters || undefined,
   });

   if (searchContext == null) {
      return {
         notFound: true,
      };
   }

   return {
      props: {
         globalSettings,
         currentStore,
         stores,
         productList,
         searchContext,
      },
   };
};
