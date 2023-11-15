import {
   Avatar,
   Box,
   BoxProps,
   Link,
   LinkProps,
   Menu,
   MenuButton,
   MenuButtonProps,
   MenuItem,
   MenuProps,
   Text,
} from '@chakra-ui/react';
import { faUser } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FaIcon } from '@ifixit/icons';
import * as React from 'react';
import { usePreloadImage } from '../hooks';
import { BlueDot } from '../misc';

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

interface UserMenuButtonProps extends MenuButtonProps {
   hasUnreadNotifications?: boolean;
}

export const UserMenuButton = ({
   hasUnreadNotifications,
   ...props
}: UserMenuButtonProps) => {
   return (
      <MenuButton
         position="relative"
         borderRadius="full"
         _focus={{
            boxShadow: 'outline',
            outline: 'none',
         }}
         {...props}
      >
         <UserAvatar />
         {hasUnreadNotifications && (
            <BlueDot position="absolute" top="-2px" right="-2px" />
         )}
      </MenuButton>
   );
};

export const UserMenuHeading = (props: BoxProps) => {
   const { user } = useMenuContext();
   return (
      <Box px="4" py="2" {...props}>
         <Text color="gray.900" fontWeight="medium">
            {user?.username}
         </Text>
         {user?.handle && <Text color="gray.500">@{user?.handle}</Text>}
      </Box>
   );
};

interface UserMenuLinkProps {
   href: string;
   children: React.ReactNode;
}

export const UserMenuLink = ({ href, children }: UserMenuLinkProps) => {
   return (
      <MenuItem as="a" href={href} fontSize="sm" px="4" py="1.5">
         {children}
      </MenuItem>
   );
};

interface MenuItemIconProps {
   icon: FontAwesomeIconProps['icon'];
}

export const MenuItemIcon = ({ icon }: MenuItemIconProps) => {
   return <FaIcon icon={icon} w="4" color="gray.500" mr="1.5" />;
};

export const NoUserLink = (props: LinkProps) => {
   return (
      <Link
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
};

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
