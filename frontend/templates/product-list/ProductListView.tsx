import { VStack } from '@chakra-ui/react';
import {
   calculateProductListOverrides,
   computeProductListAlgoliaFilterPreset,
} from '@helpers/product-list-helpers';
import { Wrapper } from '@ifixit/ui';
import type { ProductList } from '@models/product-list';
import { useDevicePartsItemType } from '@templates/product-list/hooks/useDevicePartsItemType';
import {
   Configure,
   useMenu,
   usePagination,
} from 'react-instantsearch-hooks-web';
import { MetaTags } from './MetaTags';
import { SecondaryNavigation } from './SecondaryNavigation';
import {
   FeaturedProductListsSection,
   FilterableProductsSection,
   HeroSection,
   LifetimeWarrantyBannerSection,
   ProductListChildrenSection,
   RelatedPostsSection,
} from './sections';
import { HeroWithBackgroundSection } from './sections/HeroWithBackgroundSection';

export interface ProductListViewProps {
   productList: ProductList;
   algoliaSSR?: boolean;
}

export function ProductListView({
   productList,
   algoliaSSR,
}: ProductListViewProps) {
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

   if (algoliaSSR) {
      return (
         <>
            <Configure
               filters={filters}
               hitsPerPage={24}
               facetingAfterDistinct={true}
            />
            <FilterableProductsSection
               productList={productListWithOverrides}
               algoliaSSR={algoliaSSR}
            />
         </>
      );
   }

   return (
      <>
         <SecondaryNavigation productList={productListWithOverrides} />
         <Wrapper py={{ base: 4, md: 6 }}>
            <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
               <Configure
                  filters={filters}
                  hitsPerPage={24}
                  facetingAfterDistinct={true}
               />
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
                     case 'LifetimeWarranty': {
                        return (
                           <LifetimeWarrantyBannerSection
                              key={index}
                              title={section.title}
                              description={section.description}
                              callToAction={section.callToAction}
                           />
                        );
                     }
                     case 'RelatedPosts': {
                        const tags = [productListWithOverrides.title].concat(
                           section.tags?.split(',').map((tag) => tag.trim()) ||
                              []
                        );
                        return <RelatedPostsSection key={index} tags={tags} />;
                     }
                     case 'FeaturedProductLists': {
                        const { title, productLists } = section;
                        if (productLists.length > 0) {
                           return (
                              <FeaturedProductListsSection
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
