import { Flex } from '@chakra-ui/react';
import { SecondaryNavbar } from '@components/common';
import { PageContentWrapper } from '@ifixit/ui';
import { ProductList, ProductListType } from '@models/product-list';
import { ProductListBreadcrumb } from './ProductListBreadcrumb';
import { ProductListDeviceNavigation } from './ProductListDeviceNavigation';

interface SecondaryNavigationProps {
   productList: ProductList;
}

export function SecondaryNavigation({ productList }: SecondaryNavigationProps) {
   const isToolsProductList =
      productList.type === ProductListType.AllTools ||
      productList.type === ProductListType.ToolsCategory;
   const hasDeviceNavigation =
      productList.type !== ProductListType.AllParts && !isToolsProductList;
   return (
      <>
         <SecondaryNavbar
            display={{
               base: hasDeviceNavigation ? 'initial' : 'none',
               sm: 'initial',
            }}
         >
            <PageContentWrapper h="full">
               <Flex
                  h="full"
                  w="full"
                  boxSizing="border-box"
                  justify="space-between"
               >
                  <ProductListBreadcrumb
                     display={{
                        base: 'none',
                        sm: 'flex',
                     }}
                     productList={productList}
                  />
                  <ProductListDeviceNavigation productList={productList} />
               </Flex>
            </PageContentWrapper>
         </SecondaryNavbar>
         {/* Mobile only breadcrumbs */}
         <SecondaryNavbar display={{ sm: 'none' }}>
            <PageContentWrapper h="full">
               <Flex h="full" w="full" boxSizing="border-box">
                  <ProductListBreadcrumb productList={productList} />
               </Flex>
            </PageContentWrapper>
         </SecondaryNavbar>
      </>
   );
}
