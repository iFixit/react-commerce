import { Flex, VStack } from '@chakra-ui/react';
import { PageContentWrapper, SecondaryNavbar } from '@components/common';
import { ALGOLIA_APP_ID } from '@config/env';
import { ProductList, ProductListSectionType } from '@models/product-list';
import type { SearchClient } from 'algoliasearch/lite';
import algoliasearch from 'algoliasearch/lite';
import { history } from 'instantsearch.js/es/lib/routers';
import * as React from 'react';
import {
   InstantSearch,
   InstantSearchServerState,
   InstantSearchSSRProvider,
} from 'react-instantsearch-hooks-web';
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
   url: string;
   serverState?: Partial<InstantSearchServerState>;
   indexName: string;
}

export function ProductListView({
   productList,
   url,
   serverState,
   indexName,
}: ProductListViewProps) {
   const algoliaClientRef = React.useRef<SearchClient>();
   algoliaClientRef.current =
      algoliaClientRef.current ??
      algoliasearch(ALGOLIA_APP_ID, productList.algolia.apiKey);

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
               <InstantSearchSSRProvider
                  {...serverState}
                  key={productList.handle}
               >
                  <InstantSearch
                     searchClient={algoliaClientRef.current}
                     indexName={indexName}
                     routing={{
                        stateMapping: {
                           stateToRoute(uiState) {
                              const indexUiState = uiState[indexName];
                              const routeObject: any = {
                                 q: indexUiState.query,
                                 p: indexUiState.page,
                              };
                              routeObject.filter = indexUiState.refinementList;
                              routeObject.range = indexUiState.range;
                              return routeObject;
                           },
                           routeToState(routeState: any) {
                              return {
                                 [indexName]: {
                                    query: routeState.q,
                                    page: routeState.p,
                                    refinementList: routeState.filter,
                                    range: routeState.range,
                                 },
                              };
                           },
                        },
                        router: history({
                           getLocation() {
                              if (typeof window === 'undefined') {
                                 return new URL(url) as unknown as Location;
                              }

                              return window.location;
                           },
                        }),
                     }}
                  >
                     <MetaTags productList={productList} />
                     <HeroSection productList={productList} />
                     {productList.children.length > 0 && (
                        <ProductListChildrenSection productList={productList} />
                     )}
                     <FilterableProductsSection
                        wikiInfo={productList.wikiInfo}
                     />
                     {productList.sections.map((section, index) => {
                        switch (section.type) {
                           case ProductListSectionType.Banner: {
                              return (
                                 <BannerSection
                                    key={index}
                                    title={section.title}
                                    description={section.description}
                                    callToActionLabel={
                                       section.callToActionLabel
                                    }
                                    url={section.url}
                                 />
                              );
                           }
                           case ProductListSectionType.RelatedPosts: {
                              const tags = [productList.title].concat(
                                 section.tags
                                    ?.split(',')
                                    .map((tag) => tag.trim()) || []
                              );
                              return (
                                 <RelatedPostsSection key={index} tags={tags} />
                              );
                           }
                           case ProductListSectionType.FeaturedProductList: {
                              const { productList } = section;
                              if (productList) {
                                 return (
                                    <FeaturedProductListSection
                                       key={index}
                                       productList={productList}
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
                  </InstantSearch>
               </InstantSearchSSRProvider>
            </VStack>
         </PageContentWrapper>
      </>
   );
}
