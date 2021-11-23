import {
   Box,
   BoxProps,
   chakra,
   Divider,
   Flex,
   FlexProps,
   forwardRef,
   HStack,
   VStack,
} from '@chakra-ui/react';
import { LayoutData } from '@lib/api';
import NextLink from 'next/link';
import * as React from 'react';
import { Wordmark } from './Wordmark';

export interface HeaderProps {
   data: LayoutData['header'];
}

export function Header({ data }: HeaderProps) {
   console.log('Header data', data);
   return (
      <Flex bg="trueGray.900" color="white" height="68px">
         <Flex alignItems="center" pl={6}>
            <NextLink href="/" passHref>
               <chakra.a cursor="pointer">
                  <Wordmark />
               </chakra.a>
            </NextLink>
            <Box as="nav" h="full" ml="6">
               <MenuBar h="full" position="relative">
                  {data.menu?.items.map((item, index) => {
                     switch (item.type) {
                        case 'submenu': {
                           return (
                              <MenuItem
                                 key={index}
                                 _hover={{
                                    bg: 'trueGray.800',
                                    '& > *': {
                                       display: 'flex',
                                    },
                                 }}
                              >
                                 <MenuButton
                                    align="center"
                                    px="6"
                                    cursor="pointer"
                                    tabIndex={0}
                                 >
                                    <span>{item.name}</span>
                                 </MenuButton>
                                 <Menu
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
                                                _hover={{
                                                   bg: 'blue.500',
                                                   '& .divider': {
                                                      borderColor: 'white',
                                                   },
                                                   '& p': {
                                                      color: 'white',
                                                   },
                                                }}
                                             >
                                                <NextLink
                                                   href={subitem.url}
                                                   passHref
                                                >
                                                   <MenuLink
                                                      p="6"
                                                      flexGrow={1}
                                                      direction="column"
                                                      tabIndex={-1}
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
                                                            fontSize="14px"
                                                            color="trueGray.400"
                                                            dangerouslySetInnerHTML={{
                                                               __html:
                                                                  subitem.descriptionHtml,
                                                            }}
                                                         />
                                                      )}
                                                   </MenuLink>
                                                </NextLink>
                                             </MenuItem>
                                          );
                                       }
                                    )}
                                 </Menu>
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
         </Flex>
      </Flex>
   );
}

const MenuBar = forwardRef<FlexProps, 'ul'>((props, ref) => {
   return <Flex ref={ref} as="ul" role="menubar" {...props} />;
});

const Menu = forwardRef<FlexProps, 'ul'>((props, ref) => {
   return <Flex ref={ref} as="ul" role="menu" {...props} />;
});

const MenuItem = forwardRef<FlexProps, 'li'>((props, ref) => {
   return <Flex ref={ref} as="li" role="none" {...props} />;
});

const MenuButton = forwardRef<FlexProps, 'button'>((props, ref) => {
   return (
      <Flex ref={ref} as="ul" role="menuitem" aria-haspopup="true" {...props} />
   );
});

const MenuLink = forwardRef<FlexProps, 'a'>((props, ref) => {
   return <Flex ref={ref} as="a" role="menuitem" {...props} />;
});
