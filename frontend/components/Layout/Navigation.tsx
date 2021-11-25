import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
   Box,
   BoxProps,
   Button,
   Divider,
   Drawer,
   DrawerBody,
   DrawerCloseButton,
   DrawerContent,
   DrawerHeader,
   DrawerOverlay,
   Flex,
   FlexProps,
   forwardRef,
   Icon,
   useDisclosure,
} from '@chakra-ui/react';
import { LayoutData } from '@lib/api';
import NextLink from 'next/link';
import * as React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';

type NavigationMenu = NonNullable<LayoutData['header']['menu']>;

export interface NavigationProps {
   menu: NavigationMenu;
}

const ANIMATION_DURATION = '300ms';

const DesktopNavigation = forwardRef<BoxProps & NavigationProps, 'nav'>(
   ({ menu, ...boxProps }, ref) => {
      return (
         <Box ref={ref} as="nav" h="full" ml="6" {...boxProps}>
            <MenuBar h="full" position="relative">
               {menu.items.map((item, index) => {
                  switch (item.type) {
                     case 'submenu': {
                        return (
                           <MenuItem
                              key={index}
                              transition="background-color 300ms"
                              _hover={{
                                 bg: 'trueGray.800',
                                 '& > *': {
                                    display: 'flex',
                                 },
                              }}
                           >
                              <SubmenuButton
                                 align="center"
                                 px="6"
                                 cursor="pointer"
                                 tabIndex={0}
                                 fontSize="sm"
                                 fontWeight="bold"
                              >
                                 <span>{item.name}</span>
                              </SubmenuButton>
                              <Submenu
                                 position="absolute"
                                 zIndex={1000}
                                 left="0"
                                 bottom="0"
                                 transform="translateY(100%)"
                                 display="none"
                                 bg="trueGray.800"
                              >
                                 {item.submenu.items.map(
                                    (subitem, subIndex) => {
                                       if (subitem.type !== 'link') {
                                          return null;
                                       }
                                       return (
                                          <MenuItem
                                             key={subIndex}
                                             flexGrow={1}
                                             w="222px"
                                             transition={`background-color ${ANIMATION_DURATION}`}
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
                                                   transform:
                                                      'translateY(100%)',
                                                },
                                             }}
                                          >
                                             <NextLink
                                                href={subitem.url}
                                                passHref
                                             >
                                                <MenuLink
                                                   flexGrow={1}
                                                   direction="column"
                                                   tabIndex={-1}
                                                   position="relative"
                                                >
                                                   <Flex
                                                      direction="column"
                                                      p="6"
                                                   >
                                                      <Box
                                                         as="span"
                                                         fontWeight="bold"
                                                      >
                                                         {subitem.name}
                                                      </Box>
                                                      <Divider
                                                         className="divider"
                                                         borderBottomWidth="4px"
                                                         borderRadius="2px"
                                                         my="4"
                                                         borderColor="trueGray.600"
                                                      />
                                                      {subitem.descriptionHtml && (
                                                         <Box
                                                            as="p"
                                                            fontSize="sm"
                                                            color="trueGray.400"
                                                            dangerouslySetInnerHTML={{
                                                               __html:
                                                                  subitem.descriptionHtml,
                                                            }}
                                                         />
                                                      )}
                                                   </Flex>
                                                   <Flex
                                                      className="disclosure"
                                                      position="absolute"
                                                      height="6"
                                                      w="full"
                                                      bottom="0"
                                                      transform="translateY(0)"
                                                      transition={`background ${ANIMATION_DURATION}, transform ${ANIMATION_DURATION}`}
                                                      bg="trueGray.800"
                                                      opacity="0"
                                                      justifyContent="center"
                                                   >
                                                      <Icon
                                                         boxSize="6"
                                                         transform="translateY(-50%)"
                                                         as={HiArrowNarrowRight}
                                                      />
                                                   </Flex>
                                                </MenuLink>
                                             </NextLink>
                                          </MenuItem>
                                       );
                                    }
                                 )}
                              </Submenu>
                           </MenuItem>
                        );
                     }
                     default: {
                        return null;
                     }
                  }
               })}
            </MenuBar>
         </Box>
      );
   }
);

const MobileNavigation = ({ menu }: NavigationProps) => {
   const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
   const btnRef = React.useRef<HTMLButtonElement>(null);

   return (
      <>
         <Button
            ref={btnRef}
            colorScheme="teal"
            onClick={onToggle}
            display={{
               base: 'block',
               lg: 'none',
            }}
         >
            Open
         </Button>
         <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="md"
         >
            <DrawerOverlay />
            <DrawerContent bg="trueGray.900" pt="16">
               <DrawerBody color="white" p="6">
                  <Accordion allowToggle>
                     {menu.items.map((item, index) => {
                        switch (item.type) {
                           case 'submenu': {
                              return (
                                 <AccordionItem
                                    key={index}
                                    borderTopWidth="0"
                                    borderColor="trueGray.800"
                                    borderBottomWidth="1px"
                                 >
                                    <h2>
                                       <AccordionButton
                                          borderRadius="md"
                                          _expanded={{
                                             bg: 'brand.400',
                                          }}
                                          fontSize="md"
                                          fontWeight="semibold"
                                       >
                                          <Box flex="1" textAlign="left">
                                             {item.name}
                                          </Box>
                                          <AccordionIcon />
                                       </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                       <Submenu direction="column">
                                          {item.submenu.items.map(
                                             (subitem, subIndex) => {
                                                if (subitem.type !== 'link') {
                                                   return null;
                                                }
                                                return (
                                                   <MenuItem
                                                      key={subIndex}
                                                      h="10"
                                                      align="center"
                                                   >
                                                      <NextLink
                                                         href={subitem.url}
                                                         passHref
                                                      >
                                                         <MenuLink
                                                            tabIndex={-1}
                                                            position="relative"
                                                            w="full"
                                                            pl="4"
                                                            fontSize="md"
                                                            fontWeight="normal"
                                                            _before={{
                                                               content: '""',
                                                               ml: '-4',
                                                               bg:
                                                                  'trueGray.700',
                                                               position:
                                                                  'absolute',
                                                               h: '100%',
                                                               w: '4px',
                                                               borderRadius:
                                                                  'full',
                                                               transition:
                                                                  'background-color 300ms',
                                                            }}
                                                            _hover={{
                                                               _before: {
                                                                  bg:
                                                                     'brand.400',
                                                               },
                                                            }}
                                                         >
                                                            {subitem.name}
                                                         </MenuLink>
                                                      </NextLink>
                                                   </MenuItem>
                                                );
                                             }
                                          )}
                                       </Submenu>
                                    </AccordionPanel>
                                 </AccordionItem>
                              );
                           }
                           default: {
                              return null;
                           }
                        }
                     })}
                  </Accordion>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   );
};
const MenuBar = forwardRef<FlexProps, 'ul'>((props, ref) => {
   return <Flex ref={ref} as="ul" role="menubar" {...props} />;
});

const Submenu = forwardRef<FlexProps, 'ul'>((props, ref) => {
   return <Flex ref={ref} as="ul" role="menu" {...props} />;
});

const MenuItem = forwardRef<FlexProps, 'li'>((props, ref) => {
   return <Flex ref={ref} as="li" role="none" {...props} />;
});

const SubmenuButton = forwardRef<FlexProps, 'button'>((props, ref) => {
   return (
      <Flex ref={ref} as="ul" role="menuitem" aria-haspopup="true" {...props} />
   );
});

const MenuLink = forwardRef<FlexProps, 'a'>((props, ref) => {
   return <Flex ref={ref} as="a" role="menuitem" {...props} />;
});

export const Navigation = {
   Desktop: DesktopNavigation,
   Mobile: MobileNavigation,
};
