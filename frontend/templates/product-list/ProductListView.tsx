import { VStack } from '@chakra-ui/react';
import { computeProductListAlgoliaFilterPreset } from '@helpers/product-list-helpers';
import { Wrapper } from '@ifixit/ui';
import { ProductList, ProductListSectionType } from '@models/product-list';
import { Configure, useMenu } from 'react-instantsearch-hooks-web';
import { MetaTags } from './MetaTags';
import { SecondaryNavigation } from './SecondaryNavigation';
import {
   BannerSection,
   FilterableProductsSection,
   HeroSection,
   ProductListChildrenSection,
   ProductListSetSection,
   RelatedPostsSection,
} from './sections';
import { HeroWithBackgroundSection } from './sections/HeroWithBackgroundSection';

export interface ProductListViewProps {
   productList: ProductList;
   indexName: string;
}

export function ProductListView({
   productList,
   indexName,
}: ProductListViewProps) {
   // This temporary hack allows to correctly populate the itemType facet during SSR
   // see: https://github.com/algolia/instantsearch/issues/5571
   const _ = useMenu({ attribute: 'facet_tags.Item Type' });
   const filters = computeProductListAlgoliaFilterPreset(productList);

   return (
      <>
         <SecondaryNavigation productList={productList} />
         <Wrapper py={{ base: 4, md: 6 }}>
            <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
               <Configure filters={filters} hitsPerPage={24} />
               <MetaTags productList={productList} />
               {productList.heroImage ? (
                  <HeroWithBackgroundSection productList={productList} />
               ) : (
                  <HeroSection productList={productList} />
               )}
               {productList.children.length > 0 && (
                  <ProductListChildrenSection productList={productList} />
               )}
               <FilterableProductsSection productList={productList} />
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
         </Wrapper>
      </>
   );
}
