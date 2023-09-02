import {
   Accordion,
   AccordionButton,
   AccordionButtonProps,
   AccordionIcon,
   AccordionItem,
   AccordionItemProps,
   AccordionPanel,
   AccordionPanelProps,
   AccordionProps,
   Box,
   Drawer,
   DrawerBody,
   DrawerContent,
   DrawerOverlay,
   DrawerProps,
   Flex,
   FlexProps,
   forwardRef,
   Icon,
   IconButton,
   IconButtonProps,
   useMergeRefs,
} from '@chakra-ui/react';
import { useIsMountedState } from '../hooks';
import { useHeaderContext } from './context';

export const NavigationDrawer = ({
   children,
   ...otherProps
}: Omit<DrawerProps, 'isOpen' | 'onClose' | 'finalFocusRef'>) => {
   const context = useHeaderContext();
   const isMounted = useIsMountedState();
   if (!isMounted) {
      return null;
   }
   return (
      <Drawer
         isOpen={context.navigation.isOpen}
         placement="left"
         onClose={context.navigation.close}
         size="md"
         finalFocusRef={context.navigation.toggleButtonRef}
         {...otherProps}
      >
         <DrawerOverlay />
         <DrawerContent bg="gray.900">
            <DrawerBody color="white" px="6" py="8">
               {children}
            </DrawerBody>
         </DrawerContent>
      </Drawer>
   );
};

export const HeaderNavigationToggleButton = forwardRef<
   IconButtonProps,
   'button'
>(({ onClick, ...otherProps }, ref) => {
   const context = useHeaderContext();
   const refs = useMergeRefs(context.navigation.toggleButtonRef, ref);
   return (
      <IconButton
         ref={refs}
         variant="ghost"
         mx="1"
         _hover={{
            bg: 'gray.800',
         }}
         _active={{
            bg: 'gray.800',
         }}
         display={{
            base: 'block',
            lg: 'none',
         }}
         icon={
            <Icon
               width="24px"
               height="24px"
               viewBox="0 0 24 24"
               color="#D2DADF"
            >
               <path
                  className="top"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 6C3 5.44772 3.40294 5 3.9 5H20.1C20.5971 5 21 5.44772 21 6C21 6.55228 20.5971 7 20.1 7H3.9C3.40294 7 3 6.55228 3 6Z"
                  fill="currentColor"
               ></path>
               <path
                  className="middle"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 12C3 11.4477 3.40294 11 3.9 11H20.1C20.5971 11 21 11.4477 21 12C21 12.5523 20.5971 13 20.1 13H3.9C3.40294 13 3 12.5523 3 12Z"
                  fill="currentColor"
               ></path>
               <path
                  className="bottom"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 18C3 17.4477 3.40294 17 3.9 17H20.1C20.5971 17 21 17.4477 21 18C21 18.5523 20.5971 19 20.1 19H3.9C3.40294 19 3 18.5523 3 18Z"
                  fill="currentColor"
               ></path>
            </Icon>
         }
         onClick={(event) => {
            context.navigation.toggle();
            onClick?.(event);
         }}
         {...otherProps}
      />
   );
});

export const NavigationAccordion = forwardRef<AccordionProps, 'div'>(
   (props, ref) => {
      return <Accordion ref={ref} allowToggle {...props} />;
   }
);

export const NavigationAccordionItem = forwardRef<AccordionItemProps, 'div'>(
   (props, ref) => {
      return (
         <AccordionItem
            ref={ref}
            borderTopWidth="0"
            borderColor="gray.800"
            borderBottomWidth="1px"
            {...props}
         />
      );
   }
);

export const NavigationAccordionButton = forwardRef<
   AccordionButtonProps,
   'div'
>(({ children, ...otherProps }, ref) => {
   return (
      <AccordionButton
         ref={ref}
         borderRadius="md"
         _expanded={{
            bg: 'brand.400',
         }}
         fontSize="md"
         fontWeight="medium"
         display="flex"
         justifyContent="space-between"
         {...otherProps}
      >
         <Box as="h2">{children}</Box>
         <AccordionIcon />
      </AccordionButton>
   );
});

export const NavigationAccordionPanel = forwardRef<AccordionPanelProps, 'div'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <AccordionPanel ref={ref} pb="4" {...otherProps}>
            <Flex as="ul" role="menu" direction="column">
               {children}
            </Flex>
         </AccordionPanel>
      );
   }
);

export const NavigationAccordionSubItem = forwardRef<FlexProps, 'li'>(
   (props, ref) => {
      return (
         <Flex ref={ref} as="li" role="none" h="10" align="center" {...props} />
      );
   }
);

export const NavigationAccordionLink = forwardRef<FlexProps, 'a'>(
   (props, ref) => {
      return (
         <Flex
            ref={ref}
            as="a"
            role="menuitem"
            tabIndex={-1}
            position="relative"
            w="full"
            pl="4"
            fontSize="md"
            _before={{
               content: '""',
               ml: '-4',
               bg: 'gray.700',
               position: 'absolute',
               h: '100%',
               w: '4px',
               borderRadius: 'full',
               transition: `background-color 300ms`,
            }}
            _hover={{
               _before: {
                  bg: 'brand.400',
               },
            }}
            {...props}
         />
      );
   }
);
