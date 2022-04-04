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
   BoxProps,
   Button,
   ButtonProps,
   Divider,
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerOverlay,
   DrawerProps,
   Flex,
   FlexProps,
   forwardRef,
   HStack,
   Icon,
   IconButton,
   IconButtonProps,
   IconProps,
   useDisclosure,
   useMergeRefs,
} from '@chakra-ui/react';
import { useIsMounted } from '@lib/hooks';
import { Menu } from '@models/menu';
import NextLink from 'next/link';
import * as React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { RiSearchLine } from 'react-icons/ri';
import { CartDrawer } from './cart/CartDrawer';
import { Navigation } from './Navigation';
import { SearchForm, SearchInput } from './SearchBar';
import { UserMenu } from './User';
import { Wordmark } from './Wordmark';

export interface HeaderProps {
   menu?: Menu | null;
}

export function Header({ menu }: HeaderProps) {
   const mobileSearchInputRef = React.useRef<HTMLInputElement>(null);

   return (
      <HeaderContainer>
         <HeaderHiddenBar>
            <SearchForm mr="1">
               <SearchInput ref={mobileSearchInputRef} />
            </SearchForm>
            <HeaderCloseHiddenBarButton>Cancel</HeaderCloseHiddenBarButton>
         </HeaderHiddenBar>
         <HeaderBar>
            <HeaderNavigationToggleButton aria-label="Open navigation menu" />
            <NextLink href="/" passHref>
               <WordmarkLink aria-label="Go to homepage" pr="4">
                  <Wordmark />
               </WordmarkLink>
            </NextLink>
            {menu && (
               <NavigationMenu>
                  {menu.items.map((item, index) => {
                     switch (item.type) {
                        case 'submenu': {
                           if (item.submenu === null) {
                              return null;
                           }
                           return (
                              <NavigationMenuItem key={index}>
                                 <NavigationMenuButton>
                                    {item.name}
                                 </NavigationMenuButton>
                                 <NavigationSubmenu>
                                    {item.submenu.items.map(
                                       (subitem, subIndex) => {
                                          if (subitem.type !== 'link') {
                                             return null;
                                          }
                                          return (
                                             <NavigationSubmenuItem
                                                key={subIndex}
                                             >
                                                <NextLink
                                                   href={subitem.url}
                                                   passHref
                                                >
                                                   <NavigationSubmenuLink
                                                      disclosureIcon={
                                                         <Icon
                                                            boxSize="6"
                                                            transform="translateY(-50%)"
                                                            as={
                                                               HiArrowNarrowRight
                                                            }
                                                         />
                                                      }
                                                   >
                                                      <NavigationSubmenuName>
                                                         {subitem.name}
                                                      </NavigationSubmenuName>
                                                      <NavigationSubmenuDivider />
                                                      {subitem.description && (
                                                         <NavigationSubmenuDescription>
                                                            {
                                                               subitem.description
                                                            }
                                                         </NavigationSubmenuDescription>
                                                      )}
                                                   </NavigationSubmenuLink>
                                                </NextLink>
                                             </NavigationSubmenuItem>
                                          );
                                       }
                                    )}
                                 </NavigationSubmenu>
                              </NavigationMenuItem>
                           );
                        }
                        default: {
                           return null;
                        }
                     }
                  })}
               </NavigationMenu>
            )}

            <SearchForm
               mx="8"
               display={{
                  base: 'none',
                  md: 'block',
               }}
            >
               <SearchInput />
            </SearchForm>
            <Box
               display={{
                  base: 'block',
                  md: 'none',
               }}
               flexGrow={1}
            />
            <HStack align="center">
               <HeaderOpenHiddenBarButton
                  aria-label="Search database"
                  icon={<HeaderNavItemIcon as={RiSearchLine} mt="3px" />}
                  onClick={() => {
                     mobileSearchInputRef.current?.focus();
                  }}
               />
               <HStack
                  alignItems="center"
                  spacing={{
                     base: 4,
                     md: 8,
                  }}
               >
                  <CartDrawer />
                  <UserMenu />
               </HStack>
            </HStack>
         </HeaderBar>
         {menu && (
            <NavigationDrawer>
               <DrawerCloseButton />
               <NextLink href="/" passHref>
                  <WordmarkLink aria-label="Go to homepage" mb="8">
                     <Wordmark />
                  </WordmarkLink>
               </NextLink>
               <NavigationAccordion>
                  {menu.items.map((item, index) => {
                     switch (item.type) {
                        case 'submenu': {
                           if (item.submenu === null) {
                              return null;
                           }
                           return (
                              <NavigationAccordionItem key={index}>
                                 <NavigationAccordionButton>
                                    {item.name}
                                 </NavigationAccordionButton>
                                 <NavigationAccordionPanel>
                                    {item.submenu.items.map(
                                       (subitem, subIndex) => {
                                          if (subitem.type !== 'link') {
                                             return null;
                                          }
                                          return (
                                             <NavigationAccordionSubItem
                                                key={subIndex}
                                             >
                                                <NextLink
                                                   href={subitem.url}
                                                   passHref
                                                >
                                                   <NavigationAccordionLink>
                                                      {subitem.name}
                                                   </NavigationAccordionLink>
                                                </NextLink>
                                             </NavigationAccordionSubItem>
                                          );
                                       }
                                    )}
                                 </NavigationAccordionPanel>
                              </NavigationAccordionItem>
                           );
                        }
                        default: {
                           return null;
                        }
                     }
                  })}
               </NavigationAccordion>
            </NavigationDrawer>
         )}
      </HeaderContainer>
   );
}

type HeaderContext = {
   hiddenBar: {
      isOpen: boolean;
      open: () => void;
      close: () => void;
   };
   navigation: {
      isOpen: boolean;
      toggleButtonRef: React.RefObject<HTMLButtonElement>;
      toggle: () => void;
      close: () => void;
   };
};

const HeaderContext = React.createContext<HeaderContext | null>(null);

const useHeaderContext = () => {
   const context = React.useContext(HeaderContext);
   if (!context) {
      throw new Error('useHeaderContext must be used within a Header');
   }
   return context;
};

export const HeaderContainer = forwardRef<FlexProps, 'header'>((props, ref) => {
   const hiddenBar = useDisclosure();
   const navigation = useDisclosure();
   const navigationToggleButtonRef = React.useRef<HTMLButtonElement>(null);

   const context = React.useMemo((): HeaderContext => {
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
            bg="gray.900"
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
         flexShrink="0"
         w="full"
         maxW={{
            base: '1400px',
         }}
         mx="auto"
         transition="all 300ms"
         opacity={context.hiddenBar.isOpen ? 0 : 1}
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

export const HeaderHiddenBar = forwardRef<FlexProps, 'div'>((props, ref) => {
   const context = useHeaderContext();
   return (
      <Flex
         ref={ref}
         h="full"
         flexShrink="0"
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

export const NavigationMenu = forwardRef<BoxProps, 'nav'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Box
            ref={ref}
            as="nav"
            h="full"
            ml="6"
            display={{ base: 'none', xl: 'block' }}
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
               '& > *': {
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
            fontWeight="bold"
            borderRadius="md"
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
            zIndex={1000}
            left="0"
            bottom="0"
            transform="translateY(100%)"
            display="none"
            bg="gray.800"
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
      return <Box ref={ref} as="span" fontWeight="bold" {...props} />;
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
         fontWeight="bold"
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

export const NavigationDrawer = ({
   children,
   ...otherProps
}: Omit<DrawerProps, 'isOpen' | 'onClose' | 'finalFocusRef'>) => {
   const context = useHeaderContext();
   const isMounted = useIsMounted();
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
            xl: 'none',
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
         fontWeight="semibold"
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
            fontWeight="normal"
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
