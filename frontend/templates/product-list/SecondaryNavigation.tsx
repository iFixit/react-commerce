import { Flex } from '@chakra-ui/react';
import { PageEditMenu } from '@components/admin';
import { SecondaryNavbar } from '@components/common';
import { getAdminLinks } from '@helpers/product-list-helpers';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { Wrapper } from '@ifixit/ui';
import { ProductList, ProductListType } from '@models/product-list';
import { useMemo } from 'react';
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
   const isAdminUser = useAuthenticatedUser().data?.isAdmin ?? false;
   const adminLinks = useMemo(
      () =>
         getAdminLinks({
            productListId: productList.id,
         }),
      [productList.id]
   );
   return (
      <>
         <SecondaryNavbar
            display={{
               base: hasDeviceNavigation ? 'initial' : 'none',
               sm: 'initial',
            }}
         >
            <Wrapper h="full">
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
                  <Flex
                     h="full"
                     w={{ base: 'full', sm: 'min-content' }}
                     boxSizing="border-box"
                     justify="space-between"
                  >
                     <ProductListDeviceNavigation productList={productList} />
                     {isAdminUser && <PageEditMenu links={adminLinks} />}
                  </Flex>
               </Flex>
            </Wrapper>
         </SecondaryNavbar>
         {/* Mobile only breadcrumbs */}
         <SecondaryNavbar display={{ sm: 'none' }}>
            <Wrapper h="full">
               <Flex h="full" w="full" boxSizing="border-box">
                  <ProductListBreadcrumb productList={productList} />
               </Flex>
            </Wrapper>
         </SecondaryNavbar>
      </>
   );
}
