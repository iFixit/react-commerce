import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbProps,
   Icon,
   IconButton,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Text,
} from '@chakra-ui/react';
import { ProductList } from '@models/product-list';
import NextLink from 'next/link';
import * as React from 'react';
import { HiChevronRight, HiDotsHorizontal } from 'react-icons/hi';

export type ProductListBreadcrumbProps = BreadcrumbProps & {
   productList: ProductList;
};

export function ProductListBreadcrumb({
   productList,
   ...otherProps
}: ProductListBreadcrumbProps) {
   const reverseAncestorList = React.useMemo(() => {
      return [...productList.ancestors].reverse();
   }, [productList.ancestors]);

   return (
      <Breadcrumb
         spacing={1}
         separator={<Icon as={HiChevronRight} color="gray.300" />}
         fontSize="sm"
         display="flex"
         flexWrap="nowrap"
         flexShrink={1}
         minW="0"
         maxW="full"
         overflow="hidden"
         sx={{
            '& > *': {
               display: 'flex',
            },
         }}
         {...otherProps}
      >
         {productList.ancestors.map((ancestor) => (
            <BreadcrumbItem
               key={ancestor.handle}
               display={{
                  base: 'none',
                  lg: 'inline-flex',
               }}
            >
               <NextLink href={`/store/${ancestor.handle}`} passHref>
                  <BreadcrumbLink color="gray.400" whiteSpace="nowrap">
                     {ancestor.title}
                  </BreadcrumbLink>
               </NextLink>
            </BreadcrumbItem>
         ))}
         {reverseAncestorList.length > 0 && (
            <BreadcrumbItem
               display={{
                  base: 'inline-flex',
                  lg: 'none',
               }}
            >
               <Menu>
                  <MenuButton
                     as={IconButton}
                     aria-label="Options"
                     icon={<Icon as={HiDotsHorizontal} color="gray.400" />}
                     variant="solid"
                     bg="gray.200"
                     size="xs"
                  />
                  <MenuList>
                     {reverseAncestorList.map((ancestor) => (
                        <NextLink
                           key={ancestor.handle}
                           href={`/store/${ancestor.handle}`}
                           passHref
                        >
                           <MenuItem as="a">{ancestor.title}</MenuItem>
                        </NextLink>
                     ))}
                  </MenuList>
               </Menu>
            </BreadcrumbItem>
         )}
         <BreadcrumbItem isCurrentPage>
            <Text
               color="black"
               fontWeight="bold"
               whiteSpace="nowrap"
               isTruncated
            >
               {productList.title}
            </Text>
         </BreadcrumbItem>
      </Breadcrumb>
   );
}
