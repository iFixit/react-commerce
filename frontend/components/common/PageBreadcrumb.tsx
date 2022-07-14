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
import NextLink from 'next/link';
import * as React from 'react';
import { HiChevronRight, HiDotsHorizontal } from 'react-icons/hi';

export type PageBreadcrumbProps = BreadcrumbProps & {
   items: TBreadcrumbItem[];
};

export type TBreadcrumbItem = {
   label: string;
   url: string;
};

export function PageBreadcrumb({ items, ...otherProps }: PageBreadcrumbProps) {
   const ancestors = items.slice(0, -1);
   const reverseAncestorList = [...ancestors].reverse();
   const currentItem = items[items.length - 1];

   if (items.length === 0) {
      return null;
   }

   return (
      <Breadcrumb
         spacing={1}
         separator={
            <Icon
               as={HiChevronRight}
               display={{
                  base: 'none',
                  md: 'initial',
               }}
               color="gray.300"
               mt="1"
            />
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
         {ancestors.map((ancestor, index) => (
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
                  >
                     {ancestor.label}
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
                     ml="1"
                  />
                  <MenuList>
                     {reverseAncestorList.map((ancestor, index) => (
                        <NextLink key={index} href={ancestor.url} passHref>
                           <MenuItem as="a">{ancestor.label}</MenuItem>
                        </NextLink>
                     ))}
                  </MenuList>
               </Menu>
            </BreadcrumbItem>
         )}
         <BreadcrumbItem
            isCurrentPage
            display={{
               base: 'none',
               md: 'flex',
            }}
         >
            <Text
               color="black"
               fontWeight="bold"
               whiteSpace="nowrap"
               isTruncated
            >
               {currentItem.label}
            </Text>
         </BreadcrumbItem>
      </Breadcrumb>
   );
}
