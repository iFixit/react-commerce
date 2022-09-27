import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbProps,
   Flex,
   IconButton,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Text,
   useTheme,
} from '@chakra-ui/react';
import { faChevronRight, faEllipsis } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   getProductListPath,
   getProductListTitle,
} from '@helpers/product-list-helpers';
import { ProductList, ProductListType } from '@models/product-list';
import { ProductListAncestor } from '@models/product-list/types';
import NextLink from 'next/link';
import * as React from 'react';
import { useDevicePartsItemType } from './sections/FilterableProductsSection/useDevicePartsItemType';

export type ProductListBreadcrumbProps = BreadcrumbProps & {
   productList: ProductList;
};

export function ProductListBreadcrumb({
   productList,
   ...otherProps
}: ProductListBreadcrumbProps) {
   const theme = useTheme();
   let { ancestors } = productList;
   const itemType = useDevicePartsItemType(productList);

   let currentItemTitle = productList.title;
   if (productList.type === ProductListType.DeviceParts && itemType) {
      ancestors = appendDeviceAncestor(ancestors, productList);
      currentItemTitle = itemType;
   }

   const reverseAncestorList = React.useMemo(() => {
      return [...ancestors].reverse();
   }, [ancestors]);

   return (
      <Breadcrumb
         spacing={1}
         separator={
            <Flex>
               <FontAwesomeIcon
                  icon={faChevronRight}
                  color={theme.colors['gray'][300]}
                  style={{
                     width: '10px',
                     height: '10px',
                     display: 'flex',
                     marginTop: '1px',
                  }}
               />
            </Flex>
         }
         fontSize="sm"
         display="flex"
         flexWrap="nowrap"
         flexShrink={1}
         minW="0"
         maxW="full"
         overflow="hidden"
         pl="1"
         ml="-2"
         sx={{
            '& > *': {
               display: 'flex',
            },
         }}
         {...otherProps}
      >
         {ancestors.map((ancestor) => (
            <BreadcrumbItem
               key={ancestor.handle}
               borderRadius="md"
               display={{
                  base: 'none',
                  lg: 'inline-flex',
               }}
            >
               <NextLink href={ancestor.path} passHref>
                  <BreadcrumbLink
                     color="gray.500"
                     whiteSpace="nowrap"
                     borderRadius="sm"
                     px="1"
                  >
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
                     icon={
                        <FontAwesomeIcon
                           icon={faEllipsis}
                           size="1x"
                           color={theme.colors['gray'][500]}
                        />
                     }
                     variant="solid"
                     bg="gray.300"
                     size="xs"
                     ml="1"
                  />
                  <MenuList>
                     {reverseAncestorList.map((ancestor) => (
                        <NextLink
                           key={ancestor.handle}
                           href={ancestor.path}
                           passHref
                        >
                           <MenuItem as="a">{ancestor.title}</MenuItem>
                        </NextLink>
                     ))}
                  </MenuList>
               </Menu>
            </BreadcrumbItem>
         )}
         <BreadcrumbItem isCurrentPage display="flex">
            <Text color="black" fontWeight="bold" noOfLines={1}>
               {currentItemTitle}
            </Text>
         </BreadcrumbItem>
      </Breadcrumb>
   );
}

function appendDeviceAncestor(
   ancestors: ProductListAncestor[],
   productList: ProductList
) {
   return ancestors.concat({
      title: getProductListTitle({
         title: productList.title,
         type: productList.type,
      }),
      handle: productList.handle,
      path: getProductListPath({
         type: productList.type,
         handle: productList.handle,
         deviceTitle: productList.deviceTitle ?? null,
      }),
   });
}
