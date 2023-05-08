import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbProps,
   Flex,
   forwardRef,
   IconButton,
   Menu,
   MenuButton,
   MenuItem,
   MenuItemProps,
   MenuList,
   Text,
} from '@chakra-ui/react';
import { SmartLink } from '@components/ui/SmartLink';
import { faChevronRight, faEllipsis } from '@fortawesome/pro-solid-svg-icons';
import { productListPath } from '@helpers/path-helpers';
import { FaIcon } from '@ifixit/icons';
import { ProductList } from '@models/product-list';
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
               <SmartLink
                  as={BreadcrumbLink}
                  href={productListPath(ancestor)}
                  color="gray.500"
                  whiteSpace="nowrap"
                  borderRadius="sm"
                  px="1"
               >
                  {ancestor.title}
               </SmartLink>
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
                        <SmartLink
                           key={ancestor.handle}
                           as={MenuItemLink}
                           href={productListPath(ancestor)}
                        >
                           {ancestor.title}
                        </SmartLink>
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

const MenuItemLink = forwardRef<MenuItemProps, 'a'>((props, ref) => (
   <MenuItem as="a" ref={ref} {...props} />
));
