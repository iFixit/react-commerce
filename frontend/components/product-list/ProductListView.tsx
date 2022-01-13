import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from '@config/env';
import { AlgoliaProvider, SearchContext } from '@lib/algolia';
import { GlobalSettings } from '@models/global-settings';
import {
   ProductList,
   ProductListSectionType,
   ProductSearchHit,
} from '@models/product-list';
import { MetaTags } from './MetaTags';
import { PageLayout } from './PageLayout';
import {
   BannerSection,
   FeaturedProductListSection,
   FilterableProductsSection,
   HeroSection,
   NewsletterSection,
   ProductListChildrenSection,
   ProductListSetSection,
   RelatedPostsSection,
} from './sections';

export interface ProductListViewProps {
   productList: ProductList;
   searchContext: SearchContext<ProductSearchHit>;
   globalSettings: GlobalSettings;
}

export function ProductListView({
   productList,
   searchContext,
   globalSettings,
}: ProductListViewProps) {
   const { newsletterForm } = globalSettings;
   return (
      <PageLayout>
         <AlgoliaProvider
            key={productList.handle}
            appId={ALGOLIA_APP_ID}
            apiKey={ALGOLIA_API_KEY}
            initialIndexName={searchContext.params.indexName}
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
                              algoliaIndexName={searchContext.params.indexName}
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
