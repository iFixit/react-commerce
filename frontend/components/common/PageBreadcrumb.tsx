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
import { faChevronRight, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextLink from 'next/link';

export type PageBreadcrumbProps = BreadcrumbProps & {
   items: TBreadcrumbItem[];
};

export type TBreadcrumbItem = {
   label: string;
   url: string;
};

export function PageBreadcrumb({ items, ...otherProps }: PageBreadcrumbProps) {
   const theme = useTheme();
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
            <Flex
               display={{
                  base: 'none',
                  md: 'initial',
               }}
            >
               <FontAwesomeIcon
                  icon={faChevronRight}
                  color={theme.colors.gray[400]}
                  style={{
                     height: '10px',
                     display: 'flex',
                     marginTop: '4px',
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
                     icon={
                        <FontAwesomeIcon
                           icon={faEllipsis}
                           color={theme.colors.gray[400]}
                           style={{
                              height: '16px',
                           }}
                        />
                     }
                     variant="solid"
                     bg="gray.200"
                     size="xs"
                     ml={{ base: 3, sm: 1 }}
                     mr="1"
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
            px="1"
         >
            <Text
               color="black"
               fontWeight="medium"
               whiteSpace="nowrap"
               isTruncated
            >
               {currentItem.label}
            </Text>
         </BreadcrumbItem>
      </Breadcrumb>
   );
}
