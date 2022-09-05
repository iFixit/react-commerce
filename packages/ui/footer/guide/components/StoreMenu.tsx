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

type StoreMenuButtonProps = MenuButtonProps & {
   icon?: React.ReactNode;
};

export const StoreMenu = ({
   stores,
}: {
   stores: StoreListItem[] | undefined;
}) => {
   if (stores && stores.length > 0) {
      return (
         <Menu isLazy lazyBehavior="keepMounted">
            <StoreMenuButton icon={<Flag code={FlagCountryCode.US} />}>
               Region
            </StoreMenuButton>
            <StoreMenuItems stores={stores} />
         </Menu>
      );
   }
   return null;
};

const StoreMenuItems = ({ stores }: { stores: StoreListItem[] }) => {
   const storeMenuItems = stores.map((store) => {
      return (
         <StoreMenuItem
            key={store.code}
            as="a"
            href={store.url}
            icon={<Flag code={store.code.toUpperCase() as any} />}
            name={store.name}
            currency={store.currency}
         />
      );
   });
   return <MenuList>{storeMenuItems}</MenuList>;
};

export const StoreMenuButton = forwardRef<StoreMenuButtonProps, 'button'>(
   ({ children, icon, ...otherProps }, ref) => {
      return (
         <MenuButton
            ref={ref}
            color="gray.300"
            _hover={{ color: 'white' }}
            {...otherProps}
         >
            <HStack alignItems="center">
               <Text
                  color="inherit"
                  fontSize="sm"
                  lineHeight="1em"
                  fontWeight="semibold"
               >
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
      return (
         <MenuItem ref={ref} fontSize="sm" color="black" {...otherProps}>
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
