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
} from '@chakra-ui/react';
import { faChevronRight, faEllipsis } from '@fortawesome/pro-solid-svg-icons';
import { productListPath } from '@helpers/path-helpers';
import { FaIcon } from '@ifixit/icons';
import { ProductList } from '@models/product-list';
import NextLink from 'next/link';
import { useProductListAncestors } from './hooks/useProductListAncestors';

export type ProductListBreadcrumbProps = BreadcrumbProps & {
   productList: ProductList;
};

export function ProductListBreadcrumb({
   productList,
   ...otherProps
}: ProductListBreadcrumbProps) {
   const { currentItemTitle, ancestors, reverseAncestorList } =
      useProductListAncestors(productList);

   return (
      <Breadcrumb
         spacing={1}
         separator={
            <Flex>
               <FaIcon
                  icon={faChevronRight}
                  h="2.5"
                  display="flex"
                  mt="1"
                  color="gray.400"
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
            '& > :not(style)': {
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
               <NextLink href={productListPath(ancestor)} passHref>
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
                     icon={<FaIcon icon={faEllipsis} h="3" color="gray.500" />}
                     variant="solid"
                     bg="gray.300"
                     size="xs"
                     ml={{ base: 3, sm: 1 }}
                     mr="1"
                  />
                  <MenuList>
                     {reverseAncestorList.map((ancestor) => (
                        <NextLink
                           key={ancestor.handle}
                           href={productListPath(ancestor)}
                           passHref
                        >
                           <MenuItem as="a">{ancestor.title}</MenuItem>
                        </NextLink>
                     ))}
                  </MenuList>
               </Menu>
            </BreadcrumbItem>
         )}
         <BreadcrumbItem isCurrentPage display="flex" px="1">
            <Text color="black" fontWeight="medium" noOfLines={1}>
               {currentItemTitle}
            </Text>
         </BreadcrumbItem>
      </Breadcrumb>
   );
}
