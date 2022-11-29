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
import { FaIcon } from '@ifixit/icons';
import { faChevronRight, faEllipsis } from '@fortawesome/pro-solid-svg-icons';
import NextLink from 'next/link';

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
         px={{
            base: 4,
            sm: 0,
         }}
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
               <BreadcrumbMenu items={mobileCollapsedItems} />
            </BreadcrumbItem>
         )}
         {desktopCollapsedItems.length > 0 && (
            <BreadcrumbItem
               display={{
                  base: 'none',
                  lg: 'inline-flex',
               }}
            >
               <BreadcrumbMenu items={desktopCollapsedItems} />
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
                  <NextLink href={ancestor.url} passHref>
                     <BreadcrumbLink
                        color="gray.500"
                        whiteSpace="nowrap"
                        borderRadius="sm"
                        px="1"
                        maxW="300px"
                        isTruncated
                        fontSize="sm"
                     >
                        {ancestor.label}
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
               isTruncated
               borderRadius="sm"
               cursor="auto"
               px="1"
               _hover={{
                  textDecoration: 'none',
               }}
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

function BreadcrumbMenu({ items }: BreadcrumbMenuProps) {
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
         />
         <MenuList zIndex="dropdown">
            {items.map((ancestor, index) => (
               <NextLink key={index} href={ancestor.url} passHref>
                  <MenuItem fontSize="sm" as="a">
                     {ancestor.label}
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
