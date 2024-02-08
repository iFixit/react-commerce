import { Flex } from '@chakra-ui/react';
import { PageEditMenu } from '@components/admin';
import { SecondaryNavbar } from '@components/common';
import { getAdminLinks } from '@helpers/product-list-helpers';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { BreadCrumbs } from '@ifixit/breadcrumbs';
import { Wrapper } from '@ifixit/ui';
import { ProductList, ProductListType } from '@models/product-list';
import { useMemo } from 'react';
import { useProductListBreadcrumbs } from './hooks/useProductListBreadcrumbs';
import { ProductListDeviceNavigation } from './ProductListDeviceNavigation';

interface SecondaryNavigationProps {
   productList: ProductList;
}

export function SecondaryNavigation({ productList }: SecondaryNavigationProps) {
   const isAdminUser = useAuthenticatedUser().data?.isAdmin ?? false;
   const hasDeviceNavigation = productList.type === ProductListType.DeviceParts;
   const breadcrumbs = useProductListBreadcrumbs(productList);

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
               base: hasDeviceNavigation || isAdminUser ? 'initial' : 'none',
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
                  <BreadCrumbs
                     display={{
                        base: 'none',
                        sm: 'flex',
                     }}
                     breadCrumbs={breadcrumbs}
                     fontSize="sm"
                     paddingInlineEnd="16px"
                  />
                  <Flex
                     h="full"
                     w={{ base: 'full', sm: 'min-content' }}
                     boxSizing="border-box"
                     justify="space-between"
                     direction={{
                        base: hasDeviceNavigation ? 'row' : 'row-reverse',
                        sm: 'row',
                     }}
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
                  <BreadCrumbs
                     breadCrumbs={breadcrumbs}
                     fontSize="sm"
                     paddingInlineEnd="16px"
                  />
               </Flex>
            </Wrapper>
         </SecondaryNavbar>
      </>
   );
}
