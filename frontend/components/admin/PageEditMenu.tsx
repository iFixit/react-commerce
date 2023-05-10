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
import {
   faPenToSquare,
   IconDefinition,
} from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';

export type PageEditMenuLink = {
   icon: IconDefinition;
   label: string;
   url: string;
};

type PageEditMenuProps = BoxProps & {
   links: PageEditMenuLink[];
};

export function PageEditMenu({ links, ...props }: PageEditMenuProps) {
   if (!links.length) return null;
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

type PageEditMenuLinkProps = {
   link: PageEditMenuLink;
};

function MenuLink({ link }: PageEditMenuLinkProps) {
   const { icon, label, url } = link;
   return (
      <MenuItem
         href={url}
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
   );
}
