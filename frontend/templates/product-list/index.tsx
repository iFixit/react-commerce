import { VStack } from '@chakra-ui/react';
import { computeProductListAlgoliaFilterPreset } from '@helpers/product-list-helpers';
import { PageContentWrapper } from '@ifixit/ui';
import { DefaultLayout } from '@layouts/default';
import { ProductListSectionType } from '@models/product-list';
import { Configure, Index } from 'react-instantsearch-hooks-web';
import { ProductListTemplateProps } from './hooks/useProductListTemplateProps';
import { MetaTags } from './MetaTags';
import { SecondaryNavigation } from './SecondaryNavigation';
import {
   BannerSection,
   FeaturedProductListSection,
   FilterableProductsSection,
   HeroSection,
   ProductListChildrenSection,
   ProductListSetSection,
   RelatedPostsSection,
} from './sections';

const ProductListTemplate: NextPageWithLayout<ProductListTemplateProps> = ({
   productList,
   indexName,
}) => {
   const filters = computeProductListAlgoliaFilterPreset(productList);

   return (
      <>
         <SecondaryNavigation productList={productList} />
         <PageContentWrapper py="10">
            <VStack align="stretch" spacing="12">
               <Index indexName={indexName}>
                  <Configure filters={filters} hitsPerPage={18} />
                  <MetaTags productList={productList} />
                  <HeroSection productList={productList} />
                  {productList.children.length > 0 && (
                     <ProductListChildrenSection productList={productList} />
                  )}
                  <FilterableProductsSection productList={productList} />
               </Index>
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
                           section.tags?.split(',').map((tag) => tag.trim()) ||
                              []
                        );
                        return <RelatedPostsSection key={index} tags={tags} />;
                     }
                     case ProductListSectionType.FeaturedProductList: {
                        const { productList } = section;
                        if (productList) {
                           return (
                              <FeaturedProductListSection
                                 key={index}
                                 productList={productList}
                                 index={index}
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
            </VStack>
         </PageContentWrapper>
      </>
   );
};

ProductListTemplate.getLayout = function getLayout(page, pageProps) {
   return <DefaultLayout {...pageProps.layoutProps}>{page}</DefaultLayout>;
};

export default ProductListTemplate;
