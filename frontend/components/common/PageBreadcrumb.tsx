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
} from '@chakra-ui/react';
import { SmartLink } from '@components/ui/SmartLink';
import { faChevronRight, faEllipsis } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';

export type PageBreadcrumbProps = BreadcrumbProps & {
   items: TBreadcrumbItem[];
};

export type TBreadcrumbItem = {
   label: string;
   url: string;
};

const MAX_VISIBLE_ITEMS = 3;

export function PageBreadcrumb({ items, ...otherProps }: PageBreadcrumbProps) {
   const visibleAncestors = items.slice(-MAX_VISIBLE_ITEMS).slice(0, -1);
   const desktopCollapsedItems = items.slice(0, -MAX_VISIBLE_ITEMS).reverse();
   const mobileCollapsedItems = items.slice(0, -1).reverse();

   if (items.length === 0) {
      return null;
   }

   const currentItem = items[items.length - 1];

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
         {mobileCollapsedItems.length > 0 && (
            <BreadcrumbItem
               display={{
                  base: 'inline-flex',
                  lg: 'none',
               }}
            >
               <BreadcrumbMenu
                  items={mobileCollapsedItems}
                  data-testid="breadcrumb-menu-mobile"
               />
            </BreadcrumbItem>
         )}
         {desktopCollapsedItems.length > 0 && (
            <BreadcrumbItem
               display={{
                  base: 'none',
                  lg: 'inline-flex',
               }}
            >
               <BreadcrumbMenu
                  items={desktopCollapsedItems}
                  data-testid="breadcrumb-menu-desktop"
               />
            </BreadcrumbItem>
         )}
         {visibleAncestors.map((ancestor, index) => {
            return (
               <BreadcrumbItem
                  key={index}
                  borderRadius="md"
                  display={{
                     base: 'none',
                     lg: 'inline-flex',
                  }}
               >
                  <SmartLink
                     href={ancestor.url}
                     as={BreadcrumbLink}
                     behaviour={ancestor.url === '/Store' ? 'reload' : 'auto'}
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
                     {ancestor.label}
                  </SmartLink>
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
               {currentItem.label}
            </BreadcrumbLink>
         </BreadcrumbItem>
      </Breadcrumb>
   );
}

type BreadcrumbMenuProps = {
   items: TBreadcrumbItem[];
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
               <SmartLink
                  key={index}
                  as={MenuItemLink}
                  href={ancestor.url}
                  behaviour={ancestor.url === '/Store' ? 'reload' : 'auto'}
                  fontSize="sm"
               >
                  {ancestor.label}
               </SmartLink>
            ))}
         </MenuList>
      </Menu>
   );
}

const MenuItemLink = forwardRef<MenuItemProps, 'a'>((props, ref) => (
   <MenuItem as="a" ref={ref} {...props} />
));

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
