import { VStack } from '@chakra-ui/react';
import {
   computeProductListAlgoliaFilterPreset,
   updateProductListWithItemTypeOverrides,
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
   return (
      <>
         <SecondaryNavigation productList={productList} />
         {ProductListViewContent({ productList })}
      </>
   );
}

export function ProductListViewContent({ productList }: ProductListViewProps) {
   // This temporary hack allows to correctly populate the itemType facet during SSR
   // see: https://github.com/algolia/instantsearch/issues/5571
   const _ = useMenu({ attribute: 'facet_tags.Item Type' });
   const filters = computeProductListAlgoliaFilterPreset(productList);

   const itemType = useDevicePartsItemType(productList);
   const pagination = usePagination();
   const page = pagination.currentRefinement + 1;
   const productListModified = updateProductListWithItemTypeOverrides(
      productList,
      page,
      itemType
   );

   const originalTitle = productList.title;
   return (
      <Wrapper py={{ base: 4, md: 6 }}>
         <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
            <Configure filters={filters} hitsPerPage={24} />
            <MetaTags productList={productListModified} />
            {productList.heroImage ? (
               <HeroWithBackgroundSection productList={productListModified} />
            ) : (
               <HeroSection productList={productListModified} />
            )}
            {productList.children.length > 0 && (
               <ProductListChildrenSection productList={productListModified} />
            )}
            <FilterableProductsSection productList={productListModified} />
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
                     const tags = [originalTitle].concat(
                        section.tags?.split(',').map((tag) => tag.trim()) || []
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
   );
}
