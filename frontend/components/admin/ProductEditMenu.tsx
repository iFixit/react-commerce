import {
   Box,
   BoxProps,
   Button,
   Link,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
} from '@chakra-ui/react';
import { FaIcon } from '@ifixit/icons';
import { faPenToSquare } from '@fortawesome/pro-solid-svg-icons';
import NextLink from 'next/link';
import { ProductEditMenuLink } from '@helpers/product-helpers';

type ProductEditMenuProps = BoxProps & {
   links: ProductEditMenuLink[];
};

export function ProductEditMenu({ links, ...props }: ProductEditMenuProps) {
   return (
      <Box px="4" borderLeftWidth="thin" borderColor="gray.200" {...props}>
         <Menu>
            <MenuButton
               as={Button}
               aria-label="Edit"
               leftIcon={<FaIcon icon={faPenToSquare} h="4" color="blue.500" />}
               variant="unstyled"
               size="lg"
               color="blue.500"
               fontSize="sm"
               display="inline-flex"
               alignItems="center"
            >
               Edit
            </MenuButton>
            <MenuList zIndex="dropdown" w="min-content">
               {links.map((link, index) => (
                  <MenuLink key={index} link={link} />
               ))}
            </MenuList>
         </Menu>
      </Box>
   );
}

type ProductEditMenuLinkProps = {
   link: ProductEditMenuLink;
};

function MenuLink({ link }: ProductEditMenuLinkProps) {
   const { icon, label, url } = link;
   return (
      <NextLink href={url} passHref legacyBehavior>
         <MenuItem
            fontSize="sm"
            as={Link}
            isExternal
            icon={<FaIcon icon={icon} h="4" color="gray.500" />}
            display="inline-flex"
            alignItems="center"
            _hover={{
               textDecor: 'none',
            }}
         >
            {label}
         </MenuItem>
      </NextLink>
   );
}
