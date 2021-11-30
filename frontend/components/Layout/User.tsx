import {
   Divider,
   Flex,
   forwardRef,
   Link,
   LinkProps,
   Menu,
   MenuButton,
   MenuDivider,
   MenuGroup,
   MenuItem,
   MenuList,
   VStack,
   Text,
   Avatar,
} from '@chakra-ui/react';
import { IFIXIT_API_ORIGIN } from '@config/env';
import { useAuthenticatedUser } from '@lib/api';
import * as React from 'react';

export function UserMenu() {
   const { user, isLoading } = useAuthenticatedUser();

   if (isLoading) {
      return null;
   }

   if (user) {
      return (
         <Flex>
            <Menu>
               <MenuButton
                  aria-label="Open user menu"
                  borderRadius="full"
                  _focus={{
                     boxShadow: 'outline',
                     outline: 'none',
                  }}
               >
                  <Avatar
                     name={user.username}
                     src={user.thumbnail || undefined}
                     size="sm"
                  />
               </MenuButton>
               <MenuList color="black">
                  <VStack align="flex-start" px="0.8rem" py="0.4rem">
                     <Text color="trueGray.900" fontWeight="semibold">
                        {user.username}
                     </Text>
                     <Text color="trueGray.700">@{user.handle}</Text>
                  </VStack>
                  <MenuDivider />
                  <MenuGroup>
                     <MenuItem
                        as="a"
                        href={`${IFIXIT_API_ORIGIN}/User/Notifications/${user.id}/${user.username}`}
                        fontSize="sm"
                     >
                        Notifications
                     </MenuItem>
                     <MenuItem
                        as="a"
                        fontSize="sm"
                        href={`${IFIXIT_API_ORIGIN}/User/${user.id}/${user.username}`}
                     >
                        View Profile
                     </MenuItem>
                     <MenuItem
                        as="a"
                        fontSize="sm"
                        href={`${IFIXIT_API_ORIGIN}/User/Orders`}
                     >
                        Orders
                     </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                     <MenuItem
                        as="a"
                        fontSize="sm"
                        href={`${IFIXIT_API_ORIGIN}/Guide/logout`}
                     >
                        Log Out
                     </MenuItem>
                  </MenuGroup>
               </MenuList>
            </Menu>
         </Flex>
      );
   }

   return (
      <Flex fontSize="sm" fontWeight="normal" lineHeight="full" align="center">
         <NavLink href={`${IFIXIT_API_ORIGIN}/Login/register`}>Join</NavLink>
         <Divider orientation="vertical" borderColor="trueGray.700" h="6" />
         <NavLink href={`${IFIXIT_API_ORIGIN}/login`}>Log In</NavLink>
      </Flex>
   );
}

export const NavLink = forwardRef<LinkProps, 'a'>((props, ref) => {
   return (
      <Link
         ref={ref}
         href="#"
         px="4"
         py="2"
         h="10"
         transition="color 300ms"
         mb="-2px"
         _hover={{
            textDecoration: 'none',
            color: 'brand.300',
         }}
         {...props}
      />
   );
});
