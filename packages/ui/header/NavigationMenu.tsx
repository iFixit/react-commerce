import {
   Box,
   BoxProps,
   Divider,
   Flex,
   FlexProps,
   forwardRef,
} from '@chakra-ui/react';
import * as React from 'react';

export const NavigationMenu = forwardRef<BoxProps, 'nav'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Box
            ref={ref}
            as="nav"
            h="full"
            ml="6"
            display={{ base: 'none', lg: 'block' }}
            {...otherProps}
         >
            <Flex as="ul" role="menubar" h="full" position="relative">
               {children}
            </Flex>
         </Box>
      );
   }
);

export const NavigationMenuItem = forwardRef<FlexProps, 'li'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Flex
            ref={ref}
            as="li"
            role="none"
            transition="background-color 300ms"
            _hover={{
               bg: 'gray.800',
               '& > :not(style)': {
                  display: 'flex',
               },
            }}
            {...otherProps}
         >
            {children}
         </Flex>
      );
   }
);

export const NavigationMenuButton = forwardRef<FlexProps, 'button'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Flex
            ref={ref}
            as="button"
            role="menuitem"
            aria-haspopup="true"
            align="center"
            px="6"
            cursor="pointer"
            tabIndex={0}
            fontSize="sm"
            fontWeight="semibold"
            borderRadius="md"
            border="0"
            color="white"
            _focus={{
               boxShadow: 'outline',
               outline: 'none',
            }}
            {...otherProps}
         >
            <span>{children}</span>
         </Flex>
      );
   }
);

export const NavigationSubmenu = forwardRef<FlexProps, 'ul'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Flex
            ref={ref}
            as="ul"
            role="menu"
            position="absolute"
            zIndex="headerNavigation"
            left="0"
            bottom="0"
            transform="translateY(100%)"
            display="none"
            bg="gray.800"
            margin="0"
            {...otherProps}
         >
            {children}
         </Flex>
      );
   }
);

export const NavigationSubmenuItem = forwardRef<FlexProps, 'li'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Flex
            ref={ref}
            as="li"
            role="none"
            flexGrow={1}
            w="222px"
            transition="background-color 300ms"
            _hover={{
               bg: 'blue.500',
               '& .divider': {
                  borderColor: 'white',
               },
               '& p': {
                  color: 'white',
               },
               '& .disclosure': {
                  opacity: '1',
                  bg: 'blue.500',
                  transform: 'translateY(100%)',
               },
            }}
            {...otherProps}
         >
            {children}
         </Flex>
      );
   }
);

export const NavigationSubmenuLink = forwardRef<
   FlexProps & {
      disclosureIcon?: React.ReactNode;
   },
   'a'
>(({ children, disclosureIcon, ...otherProps }, ref) => {
   return (
      <Flex
         ref={ref}
         as="a"
         role="menuitem"
         flexGrow={1}
         direction="column"
         tabIndex={-1}
         position="relative"
         {...otherProps}
      >
         <Flex direction="column" p="6">
            {children}
         </Flex>
         {disclosureIcon && (
            <Flex
               className="disclosure"
               position="absolute"
               height="6"
               w="full"
               bottom="0"
               transform="translateY(0)"
               transition="background 300ms, transform 300ms"
               bg="gray.800"
               opacity="0"
               justifyContent="center"
            >
               {disclosureIcon}
            </Flex>
         )}
      </Flex>
   );
});

export const NavigationSubmenuName = forwardRef<BoxProps, 'span'>(
   (props, ref) => {
      return <Box ref={ref} as="span" fontWeight="semibold" {...props} />;
   }
);

type NavigationSubmenuDescriptionProps = Omit<BoxProps, 'children'> & {
   children: string;
};

export const NavigationSubmenuDescription = forwardRef<
   NavigationSubmenuDescriptionProps,
   'p'
>(({ children, ...otherProps }, ref) => {
   return (
      <Box
         ref={ref}
         as="p"
         fontWeight="medium"
         fontSize="sm"
         color="gray.400"
         dangerouslySetInnerHTML={{
            __html: children,
         }}
         {...otherProps}
      />
   );
});

export const NavigationSubmenuDivider = forwardRef<BoxProps, 'span'>(
   (props, ref) => {
      return (
         <Divider
            ref={ref}
            className="divider"
            borderBottomWidth="4px"
            borderRadius="2px"
            my="4"
            borderColor="gray.600"
            {...props}
         />
      );
   }
);
