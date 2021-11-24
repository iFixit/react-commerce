import { Box, chakra, Divider, Flex, Icon } from '@chakra-ui/react';
import { LayoutData } from '@lib/api';
import NextLink from 'next/link';
import * as React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { MenuBar, MenuItem, MenuLink, Submenu, SubmenuButton } from './MenuBar';
import { Wordmark } from './Wordmark';

export interface HeaderProps {
   data: LayoutData['header'];
}

const ANIMATION_DURATION = '300ms';

export function Header({ data }: HeaderProps) {
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
                                                            as={
                                                               HiArrowNarrowRight
                                                            }
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
         </Flex>
      </Flex>
   );
}
