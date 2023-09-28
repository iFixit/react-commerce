import {
   Avatar,
   forwardRef,
   Link,
   LinkProps,
   Menu,
   MenuButton,
   MenuButtonProps,
   MenuItem,
   MenuItemProps,
   MenuProps,
   StackProps,
   Text,
   VStack,
} from '@chakra-ui/react';
import { faUser } from '@fortawesome/pro-solid-svg-icons';
import * as React from 'react';
import { usePreloadImage } from '../hooks';
import { FaIcon } from '@ifixit/icons';

type UserMenuContext = {
   user: User;
};

type User = {
   username: string;
   handle: string | null;
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
};

export const UserMenu = ({ user, ...otherProps }: UserMenuProps) => {
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
            {user?.handle && <Text color="gray.700">@{user?.handle}</Text>}
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
            justifyContent="center"
            {...props}
            h={8}
            w={8}
            _hover={{ opacity: '0.7' }}
            transition="0.3s"
            aria-label="Login"
         >
            <FaIcon icon={faUser} h="5" color="white" />
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
         icon={<FaIcon icon={faUser} h="4" color="gray.300" />}
         bg={user?.thumbnail == null ? undefined : 'transparent'}
         size="sm"
      />
   );
}
