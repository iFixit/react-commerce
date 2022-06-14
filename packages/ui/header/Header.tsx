import {
   Box,
   BoxProps,
   Button,
   ButtonProps,
   Flex,
   FlexProps,
   forwardRef,
   HStack,
   Icon,
   IconButton,
   IconButtonProps,
   IconProps,
   StackProps,
   useDisclosure,
} from '@chakra-ui/react';
import * as React from 'react';
import { Context, HeaderContext, useHeaderContext } from './context';

export const Header = forwardRef<FlexProps, 'header'>((props, ref) => {
   const hiddenBar = useDisclosure();
   const navigation = useDisclosure();
   const navigationToggleButtonRef = React.useRef<HTMLButtonElement>(null);

   const context = React.useMemo((): Context => {
      return {
         hiddenBar: {
            isOpen: hiddenBar.isOpen,
            open: hiddenBar.onOpen,
            close: hiddenBar.onClose,
         },
         navigation: {
            isOpen: navigation.isOpen,
            toggleButtonRef: navigationToggleButtonRef,
            toggle: navigation.onOpen,
            close: navigation.onClose,
         },
      };
   }, [hiddenBar, navigation]);

   return (
      <HeaderContext.Provider value={context}>
         <Flex
            ref={ref}
            as="header"
            bg="black"
            color="white"
            height="header"
            overflow={{
               base: 'hidden',
               md: 'visible',
            }}
            direction="column"
            pl={{
               base: '0',
               lg: '3',
            }}
            pr={{
               base: '3',
               lg: '3',
            }}
            {...props}
         />
      </HeaderContext.Provider>
   );
});

export const HeaderBar = forwardRef<FlexProps, 'div'>((props, ref) => {
   const context = useHeaderContext();
   return (
      <Flex
         ref={ref}
         alignItems="center"
         h="full"
         flexShrink={0}
         w="full"
         maxW={{
            base: '1400px',
         }}
         mx="auto"
         transition="all 300ms"
         opacity={context.hiddenBar.isOpen ? 0 : 1}
         justify="space-between"
         transform={{
            base: context.hiddenBar.isOpen
               ? 'translateY(0)'
               : 'translateY(-100%)',
            md: 'initial',
         }}
         {...props}
      />
   );
});

export const HeaderPrimaryNavigation = forwardRef<FlexProps, 'div'>(
   (props, ref) => {
      return <Flex ref={ref} align="center" h="full" {...props} />;
   }
);

export const HeaderSecondaryNavigation = forwardRef<StackProps, 'div'>(
   (props, ref) => {
      return (
         <HStack
            ref={ref}
            align="center"
            spacing={{
               base: 4,
               md: 8,
            }}
            {...props}
         />
      );
   }
);

export const HeaderHiddenBar = forwardRef<FlexProps, 'div'>((props, ref) => {
   const context = useHeaderContext();
   return (
      <Flex
         ref={ref}
         h="full"
         flexShrink={0}
         transition="all 300ms"
         transform={
            context.hiddenBar.isOpen ? 'translateY(0)' : 'translateY(-100%)'
         }
         opacity={context.hiddenBar.isOpen ? 1 : 0}
         display={{
            base: 'flex',
            md: 'none',
         }}
         align="center"
         pl="6"
         {...props}
      />
   );
});

export const WordmarkLink = forwardRef<BoxProps, 'a'>((props, ref) => {
   return (
      <Box
         ref={ref}
         as="a"
         display="inline-block"
         cursor="pointer"
         borderRadius="md"
         _focus={{
            boxShadow: 'outline',
            outline: 'none',
         }}
         {...props}
      />
   );
});

export const HeaderOpenHiddenBarButton = forwardRef<IconButtonProps, 'button'>(
   ({ onClick, ...otherProps }, ref) => {
      const context = useHeaderContext();
      return (
         <IconButton
            ref={ref}
            variant="ghost"
            mr="-1"
            display={{
               base: 'block',
               md: 'none',
            }}
            _hover={{
               bg: 'gray.800',
            }}
            _active={{
               bg: 'gray.800',
            }}
            onClick={(event) => {
               context.hiddenBar.open();
               onClick?.(event);
            }}
            {...otherProps}
         />
      );
   }
);

export const HeaderNavItemIcon = forwardRef<IconProps, 'svg'>((props, ref) => {
   return <Icon ref={ref} color="white" boxSize="6" {...props} />;
});

export const HeaderCloseHiddenBarButton = forwardRef<ButtonProps, 'button'>(
   (props, ref) => {
      const context = useHeaderContext();
      return (
         <Button
            ref={ref}
            variant="ghost"
            _hover={{
               bg: 'gray.800',
            }}
            _active={{
               bg: 'gray.800',
            }}
            mb="-1px"
            fontSize="sm"
            fontWeight="normal"
            onClick={context.hiddenBar.close}
            {...props}
         />
      );
   }
);
