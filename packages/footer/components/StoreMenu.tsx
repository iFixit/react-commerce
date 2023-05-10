import * as React from 'react';
import {
   Box,
   BoxProps,
   Flex,
   forwardRef,
   HStack,
   MenuButton,
   MenuButtonProps,
   MenuItem,
   MenuItemProps,
   Text,
} from '@chakra-ui/react';
import { useTrackedOnClick } from '@ifixit/tracking-hooks';

type StoreMenuButtonProps = MenuButtonProps & {
   icon?: React.ReactNode;
};

export const StoreMenuButton = forwardRef<StoreMenuButtonProps, 'button'>(
   ({ children, icon, ...otherProps }, ref) => {
      return (
         <MenuButton
            ref={ref}
            fontSize="sm"
            color="gray.300"
            _hover={{ color: 'white' }}
            {...otherProps}
         >
            <HStack alignItems="center">
               <Text color="inherit" fontSize="sm" lineHeight="1em">
                  {children}
               </Text>
               <StoreFlagBackdrop>{icon}</StoreFlagBackdrop>
            </HStack>
         </MenuButton>
      );
   }
);

const StoreFlagBackdrop = (props: BoxProps) => {
   return <Box p="1.5" borderRadius="base" bg="gray.800" {...props} />;
};

type StoreMenuItemProps = Omit<MenuItemProps, 'children'> & {
   icon: React.ReactNode;
   name: string;
   currency: string;
};

export const StoreMenuItem = forwardRef<StoreMenuItemProps, 'div'>(
   ({ icon, name, currency, ...otherProps }, ref) => {
      const trackedOnClick = useTrackedOnClick({
         clickName: name,
         isStoreLink: true,
         ...otherProps,
      });
      return (
         <MenuItem
            ref={ref}
            fontSize="sm"
            color="black"
            onClick={trackedOnClick}
            {...otherProps}
         >
            <Flex w="full" align="center">
               {icon}
               <Text ref={ref} ml="3" mt="-1px" flexGrow={1}>
                  {name}
               </Text>
               <Text ref={ref} ml="2" mt="-1px" color="gray.500">
                  {currency}
               </Text>
            </Flex>
         </MenuItem>
      );
   }
);
