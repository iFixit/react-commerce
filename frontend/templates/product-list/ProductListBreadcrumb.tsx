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
} from '@chakra-ui/react';
import { faChevronRight, faEllipsis } from '@fortawesome/pro-solid-svg-icons';
import { productListPath } from '@helpers/path-helpers';
import { FaIcon } from '@ifixit/icons';
import { ProductList } from '@models/product-list';
import NextLink from 'next/link';
import { useProductListAncestors } from './hooks/useProductListAncestors';
import type { ProductListAncestor } from '@models/product-list';

export type ProductListBreadcrumbProps = BreadcrumbProps & {
   productList: ProductList;
};

const MAX_VISIBLE_ITEMS = 3;

export function ProductListBreadcrumb({
   productList,
   ...otherProps
}: ProductListBreadcrumbProps) {
   const { currentItemTitle, ancestors } = useProductListAncestors(productList);

   const visibleAncestors = ancestors.slice(-MAX_VISIBLE_ITEMS);
   const desktopCollapsedProductLists = ancestors
      .slice(0, -MAX_VISIBLE_ITEMS)
      .reverse();
   const mobileCollapsedProductLists = ancestors.slice(0, -1).reverse();

   return (
      <Breadcrumb
         spacing={1}
         separator={<BreadcrumbIcon />}
         py="3"
         sx={{
            '& > :not(style)': {
               display: 'flex',
               flexWrap: 'nowrap',
            },
         }}
         {...otherProps}
      >
         {mobileCollapsedProductLists.length > 0 && (
            <BreadcrumbItem
               display={{
                  base: 'inline-flex',
                  lg: 'none',
               }}
            >
               <BreadcrumbMenu
                  items={mobileCollapsedProductLists}
                  data-testid="breadcrumb-menu-mobile"
               />
            </BreadcrumbItem>
         )}
         {desktopCollapsedProductLists.length > 0 && (
            <BreadcrumbItem
               display={{
                  base: 'none',
                  lg: 'inline-flex',
               }}
            >
               <BreadcrumbMenu
                  items={desktopCollapsedProductLists}
                  data-testid="breadcrumb-menu-desktop"
               />
            </BreadcrumbItem>
         )}
         {visibleAncestors.map((ancestor, index) => {
            return (
               <BreadcrumbItem
                  key={ancestor.handle}
                  borderRadius="md"
                  display={{
                     base: 'none',
                     lg: 'inline-flex',
                  }}
               >
                  <NextLink href={productListPath(ancestor)} passHref>
                     <BreadcrumbLink
                        data-testid="breadcrumb-ancestor-link-desktop"
                        color="gray.500"
                        whiteSpace="nowrap"
                        borderRadius="sm"
                        px="1"
                        maxW="300px"
                        noOfLines={1}
                        display="inline-block"
                        fontSize="sm"
                     >
                        {ancestor.title}
                     </BreadcrumbLink>
                  </NextLink>
               </BreadcrumbItem>
            );
         })}
         <BreadcrumbItem
            borderRadius="md"
            isLastChild
            isCurrentPage
            overflow="hidden"
         >
            <BreadcrumbLink
               color="black"
               fontWeight="medium"
               fontSize="sm"
               noOfLines={1}
               display="inline-block"
               whiteSpace="nowrap"
               borderRadius="sm"
               cursor="auto"
               px="1"
               _hover={{
                  textDecoration: 'none',
               }}
               data-testid="breadcrumb-last-child-link"
            >
               {currentItemTitle}
            </BreadcrumbLink>
         </BreadcrumbItem>
      </Breadcrumb>
   );
}

type BreadcrumbMenuProps = {
   items: ProductListAncestor[];
};

function BreadcrumbMenu({ items, ...otherProps }: BreadcrumbMenuProps) {
   return (
      <Menu>
         <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FaIcon icon={faEllipsis} h="3" color="gray.500" />}
            variant="solid"
            bg="gray.300"
            size="xs"
            px="1.5"
            {...otherProps}
         />
         <MenuList zIndex="dropdown">
            {items.map((ancestor, index) => (
               <NextLink key={index} href={productListPath(ancestor)} passHref>
                  <MenuItem fontSize="sm" as="a">
                     {ancestor.title}
                  </MenuItem>
               </NextLink>
            ))}
         </MenuList>
      </Menu>
   );
}

function BreadcrumbIcon() {
   return (
      <Flex>
         <FaIcon
            icon={faChevronRight}
            h="2.5"
            display="flex"
            color="gray.400"
            mt="1px"
         />
      </Flex>
   );
}
