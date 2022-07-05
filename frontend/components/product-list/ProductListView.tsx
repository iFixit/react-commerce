import { Flex, VStack } from '@chakra-ui/react';
import { PageContentWrapper, SecondaryNavbar } from '@components/common';
import { computeProductListAlgoliaFilterPreset } from '@helpers/product-list-helpers';
import { ProductList, ProductListSectionType } from '@models/product-list';
import { Configure, Index } from 'react-instantsearch-hooks-web';
import { MetaTags } from './MetaTags';
import { ProductListBreadcrumb } from './ProductListBreadcrumb';
import { ProductListDeviceNavigation } from './ProductListDeviceNavigation';
import {
   BannerSection,
   FeaturedProductListSection,
   FilterableProductsSection,
   HeroSection,
   ProductListChildrenSection,
   ProductListSetSection,
   RelatedPostsSection,
} from './sections';

export interface ProductListViewProps {
   productList: ProductList;
   indexName: string;
}

export function ProductListView({
   productList,
   indexName,
}: ProductListViewProps) {
   const filters = computeProductListAlgoliaFilterPreset(productList);

   return (
      <>
         <SecondaryNavbar>
            <PageContentWrapper h="full">
               <Flex
                  h="full"
                  w="full"
                  boxSizing="border-box"
                  justify="space-between"
                  px={{ base: 3, sm: 0 }}
               >
                  <ProductListBreadcrumb productList={productList} />
                  <ProductListDeviceNavigation productList={productList} />
               </Flex>
            </PageContentWrapper>
         </SecondaryNavbar>
         <PageContentWrapper py="10">
            <VStack align="stretch" spacing="12">
               <Index indexName={indexName}>
                  <Configure filters={filters} />
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
}
