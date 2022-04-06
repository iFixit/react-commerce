import {
   Avatar,
   forwardRef,
   Icon,
   IconProps,
   Link,
   Menu,
   MenuButton,
   MenuButtonProps,
   MenuDivider,
   MenuGroup,
   MenuItem,
   MenuItemProps,
   MenuList,
   MenuProps,
   Portal,
   StackProps,
   Text,
   VStack,
   LinkProps,
} from '@chakra-ui/react';
import { DEFAULT_ANIMATION_DURATION_MS } from '@config/constants';
import { IFIXIT_ORIGIN } from '@config/env';
import { usePreloadImage } from '@lib/hooks';
import { useAuthenticatedUser } from '@models/user';
import * as React from 'react';

export function HeaderUserMenu() {
   const user = useAuthenticatedUser();

   if (user.data == null) {
      return <NoUserLink href={`${IFIXIT_ORIGIN}/login`} />;
   }

   return (
      <UserMenu user={user.data}>
         <UserMenuButton aria-label="Open user menu" />
         <Portal>
            <MenuList>
               <UserMenuHeading />
               <MenuDivider />
               <MenuGroup>
                  <UserMenuLink
                     href={`${IFIXIT_ORIGIN}/User/Notifications/${user.data.id}/${user.data.username}`}
                  >
                     Notifications
                  </UserMenuLink>
                  <UserMenuLink
                     href={`${IFIXIT_ORIGIN}/User/${user.data.id}/${user.data.username}`}
                  >
                     View Profile
                  </UserMenuLink>
                  <UserMenuLink fontSize="sm">Orders</UserMenuLink>
               </MenuGroup>
               <MenuDivider />
               <MenuGroup>
                  <UserMenuLink href={`${IFIXIT_ORIGIN}/Guide/logout`}>
                     Log Out
                  </UserMenuLink>
               </MenuGroup>
            </MenuList>
         </Portal>
      </UserMenu>
   );
}

type UserMenuContext = {
   user: User;
};

type User = {
   username: string;
   handle: string;
   thumbnail: string | null;
};

const UserMenuContext = React.createContext<UserMenuContext | null>(null);

const useMenuContext = () => {
   const context = React.useContext(UserMenuContext);
   if (context == null) {
      throw new Error('useMenuContext must be used within a UserMenu');
   }
   return context;
};

export type UserMenuProps = MenuProps & {
   user: User;
   fallback?: React.ReactNode;
};

export const UserMenu = ({ user, fallback, ...otherProps }: UserMenuProps) => {
   const value = React.useMemo((): UserMenuContext => {
      return { user };
   }, [user]);

   return (
      <UserMenuContext.Provider value={value}>
         <Menu {...otherProps} />
      </UserMenuContext.Provider>
   );
};

export const UserMenuButton = forwardRef<
   Omit<MenuButtonProps, 'children'>,
   'button'
>((props, ref) => {
   return (
      <MenuButton
         ref={ref}
         borderRadius="full"
         _focus={{
            boxShadow: 'outline',
            outline: 'none',
         }}
         {...props}
      >
         <UserAvatar />
      </MenuButton>
   );
});

export const UserMenuHeading = forwardRef<Omit<StackProps, 'children'>, 'div'>(
   (props, ref) => {
      const { user } = useMenuContext();
      return (
         <VStack
            ref={ref}
            align="flex-start"
            px="0.8rem"
            py="0.4rem"
            {...props}
         >
            <Text color="gray.900" fontWeight="semibold">
               {user?.username}
            </Text>
            <Text color="gray.700">@{user?.handle}</Text>
         </VStack>
      );
   }
);

export const UserMenuLink = forwardRef<MenuItemProps, 'a'>((props, ref) => {
   return <MenuItem ref={ref} as="a" fontSize="sm" {...props} />;
});

export const NoUserLink = forwardRef<Omit<LinkProps, 'children'>, 'a'>(
   (props, ref) => {
      return (
         <Link
            ref={ref}
            borderRadius="full"
            display="flex"
            alignItems="center"
            {...props}
         >
            <NoUserIcon
               transition="color 300ms"
               _hover={{
                  color: 'brand.300',
               }}
            />
         </Link>
      );
   }
);

function UserAvatar() {
   const { user } = useMenuContext();
   const image = usePreloadImage();

   React.useEffect(() => {
      if (user?.thumbnail) {
         image.preload(user.thumbnail);
      }
   }, [user?.thumbnail, image.preload]);

   return (
      <Avatar
         name={
            user?.thumbnail == null || image.isLoaded
               ? user?.username
               : undefined
         }
         src={user?.thumbnail ?? undefined}
         icon={
            <NoUserIcon
               transition={`color ${DEFAULT_ANIMATION_DURATION_MS}`}
               _hover={{
                  color: 'brand.300',
               }}
            />
         }
         bg={user?.thumbnail == null ? undefined : 'transparent'}
         size="sm"
      />
   );
}

function NoUserIcon({ color = 'white', ...otherProps }: IconProps) {
   return (
      <Icon
         viewBox="0 0 33 33"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         w="33px"
         h="33px"
         color={color}
         {...otherProps}
      >
         <path
            d="M16.2571 32.5C25.0936 32.5 32.2571 25.3366 32.2571 16.5C32.2571 7.66344 25.0936 0.5 16.2571 0.5C7.42052 0.5 0.25708 7.66344 0.25708 16.5C0.25708 25.3366 7.42052 32.5 16.2571 32.5Z"
            fill="currentColor"
            fillOpacity="0.14"
         />
         <path
            d="M24 25V23C24 21.9391 23.5786 20.9217 22.8284 20.1716C22.0783 19.4214 21.0609 19 20 19H12C10.9391 19 9.92172 19.4214 9.17157 20.1716C8.42143 20.9217 8 21.9391 8 23V25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
         <path
            d="M16 15C18.2091 15 20 13.2091 20 11C20 8.79086 18.2091 7 16 7C13.7909 7 12 8.79086 12 11C12 13.2091 13.7909 15 16 15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </Icon>
   );
}
