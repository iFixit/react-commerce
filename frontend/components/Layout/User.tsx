import { Divider, Flex, forwardRef, Link, LinkProps } from '@chakra-ui/react';
import { IFIXIT_API_ORIGIN } from '@config/env';
import { useAuthenticatedUser, User } from '@lib/api';
import * as React from 'react';

export function UserMenu() {
   const { user } = useAuthenticatedUser();

   React.useEffect(() => {
      console.log('user', user);
   }, [user]);

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
