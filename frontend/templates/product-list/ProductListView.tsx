import { VStack } from '@chakra-ui/react';
import {
   computeProductListAlgoliaFilterPreset,
   calculateProductListOverrides,
} from '@helpers/product-list-helpers';
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
import { useDevicePartsItemType } from '@templates/product-list/hooks/useDevicePartsItemType';
import { usePagination } from 'react-instantsearch-hooks-web';

export interface ProductListViewProps {
   productList: ProductList;
}

export function ProductListView({ productList }: ProductListViewProps) {
   // This temporary hack allows to correctly populate the itemType facet during SSR
   // see: https://github.com/algolia/instantsearch/issues/5571
   const _ = useMenu({ attribute: 'facet_tags.Item Type' });
   const filters = computeProductListAlgoliaFilterPreset(productList);

   const itemType = useDevicePartsItemType(productList);
   const pagination = usePagination();
   const page = pagination.currentRefinement + 1;
   const productListWithOverrides = calculateProductListOverrides(
      productList,
      page,
      itemType
   );

   return (
      <>
         <SecondaryNavigation productList={productListWithOverrides} />
         <Wrapper py={{ base: 4, md: 6 }}>
            <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
               <Configure filters={filters} hitsPerPage={24} />
               <MetaTags productList={productListWithOverrides} />
               {productListWithOverrides.heroImage ? (
                  <HeroWithBackgroundSection
                     productList={productListWithOverrides}
                  />
               ) : (
                  <HeroSection productList={productListWithOverrides} />
               )}
               {productListWithOverrides.children.length > 0 && (
                  <ProductListChildrenSection
                     productList={productListWithOverrides}
                  />
               )}
               <FilterableProductsSection
                  productList={productListWithOverrides}
               />
               {productListWithOverrides.sections.map((section, index) => {
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
                        const tags = [productListWithOverrides.title].concat(
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
