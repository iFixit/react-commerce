import { Flex } from '@chakra-ui/react';
import { PageEditMenu } from '@components/admin';
import { SecondaryNavbar } from '@components/common';
import { getAdminLinks } from '@helpers/product-list-helpers';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { Wrapper } from '@ifixit/ui';
import { ProductList, ProductListType } from '@models/product-list';
import { useMemo } from 'react';
import { useProductListAncestors } from './hooks/useProductListAncestors';
import { BreadCrumbs, BreadcrumbItem } from '@ifixit/breadcrumbs';
import { productListPath } from '@helpers/path-helpers';
import { ProductListDeviceNavigation } from './ProductListDeviceNavigation';

interface SecondaryNavigationProps {
   productList: ProductList;
}

export function SecondaryNavigation({ productList }: SecondaryNavigationProps) {
   const isAdminUser = useAuthenticatedUser().data?.isAdmin ?? false;
   const hasDeviceNavigation = productList.type === ProductListType.DeviceParts;
   const { currentItemTitle, ancestors } = useProductListAncestors(productList);
   const breadCrumbs: BreadcrumbItem[] = ancestors.map((ancestor) => ({
      label: ancestor.title,
      url: productListPath(ancestor),
   }));
   breadCrumbs.push({
      label: currentItemTitle,
      url: undefined,
   });

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
                     breadCrumbs={breadCrumbs}
                     fontSize="sm"
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
                  <BreadCrumbs breadCrumbs={breadCrumbs} fontSize="sm" />
               </Flex>
            </Wrapper>
         </SecondaryNavbar>
      </>
   );
}
