'use client';

import { BannersSection } from '@components/sections/BannersSection';
import { FAQsSection } from '@components/sections/FAQsSection';
import { LifetimeWarrantySection } from '@components/sections/LifetimeWarrantySection';
import { QuoteGallerySection } from '@components/sections/QuoteGallerySection';
import { SplitWithImageContentSection } from '@components/sections/SplitWithImageSection';
import type { ProductList } from '@models/product-list';
import { FilterableProductsSection } from '@templates/product-list/sections/index';
import { PressQuotesSection } from '@templates/page/sections/PressQuotesSection';
import { useAvailableItemTypes } from './hooks/useAvailableItemTypes';
import {
   HeroSection,
   ProductListChildrenSection,
   RelatedPostsSection,
} from './sections';

export interface ProductListViewProps {
   productList: ProductList;
}

export function ProductListView({ productList }: ProductListViewProps) {
   // useMenu({ attribute: 'facet_tags.Item Type' });

   // const filters = computeProductListAlgoliaFilterPreset(productList);
   // const optionalFilters =
   //    computeProductListAlgoliaOptionalFilters(productList);
   // const { currentProductList } = useCurrentProductList();
   const availableItemTypes = useAvailableItemTypes();

   // if (algoliaSSR) {
   //    return (
   //       <>
   //          <Configure
   //             filters={filters}
   //             optionalFilters={optionalFilters}
   //             hitsPerPage={HITS_PER_PAGE}
   //             facetingAfterDistinct
   //          />
   //          <FilterableProductsSection
   //             productList={currentProductList}
   //             algoliaSSR={algoliaSSR}
   //          />
   //       </>
   //    );
   // }

   return (
      <>
         {/* <Configure
            filters={filters}
            optionalFilters={optionalFilters}
            hitsPerPage={HITS_PER_PAGE}
            facetingAfterDistinct
         /> */}
         {/* <MetaTags productList={currentProductList} /> */}
         {/* <SecondaryNavigation productList={productList} /> */}
         <div>
            {productList.sections.map((section) => {
               switch (section.type) {
                  case 'Hero': {
                     return (
                        <HeroSection
                           key={section.id}
                           title={productList.h1 ?? productList.title}
                           tagline={productList.tagline}
                           description={productList.description}
                           backgroundImage={productList.heroImage}
                           brandLogo={productList.brandLogo}
                        />
                     );
                  }
                  case 'ProductsListChildren': {
                     if (productList.children.length === 0) return null;
                     return (
                        <ProductListChildrenSection
                           key={section.id}
                           productList={productList}
                        />
                     );
                  }
                  case 'FilterableProducts': {
                     return (
                        <FilterableProductsSection
                           key={section.id}
                           productList={productList}
                        />
                     );
                  }
                  case 'LifetimeWarranty': {
                     return (
                        <LifetimeWarrantySection
                           key={section.id}
                           variant="banner"
                           title={section.title}
                           description={section.description}
                           callToAction={section.callToAction}
                        />
                     );
                  }
                  case 'RelatedPosts': {
                     const tags = [productList.title].concat(
                        section.tags?.split(',').map((tag) => tag.trim()) || []
                     );
                     return (
                        <RelatedPostsSection key={section.id} tags={tags} />
                     );
                  }
                  // case 'FeaturedProductLists': {
                  //    const { title, productLists } = section;
                  //    if (productLists.length > 0) {
                  //       return (
                  //          <FeaturedProductListsSection
                  //             key={section.id}
                  //             title={title}
                  //             productLists={productLists}
                  //          />
                  //       );
                  //    }
                  //    return null;
                  // }
                  case 'Banners': {
                     return (
                        <BannersSection
                           key={section.id}
                           id={section.id}
                           banners={section.banners}
                        />
                     );
                  }
                  case 'SplitWithImage': {
                     return (
                        <SplitWithImageContentSection
                           key={section.id}
                           id={section.id}
                           title={section.title}
                           description={section.description}
                           image={section.image}
                           imagePosition={section.imagePosition}
                           callToAction={section.callToAction}
                        />
                     );
                  }
                  case 'QuoteGallery': {
                     return (
                        <QuoteGallerySection
                           key={section.id}
                           id={section.id}
                           title={section.title}
                           description={section.description}
                           quotes={section.quotes}
                        />
                     );
                  }
                  case 'PressQuotes': {
                     return (
                        <PressQuotesSection
                           key={section.id}
                           title={section.title}
                           description={section.description}
                           callToAction={section.callToAction}
                           quotes={section.quotes}
                        />
                     );
                  }
                  case 'FAQs': {
                     return (
                        <FAQsSection
                           key={section.id}
                           id={section.id}
                           title={section.title}
                           description={section.description}
                           faqs={section.faqs}
                           relevantItemTypes={availableItemTypes}
                        />
                     );
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
         </div>
      </>
   );
}
