'use client';

import {
   DrawerCloseButton,
   MenuDivider,
   MenuGroup,
   MenuList,
   Portal,
} from '@chakra-ui/react';
import { SmartLink } from '@components/ui/SmartLink';
import {
   faArrowRight,
   faMagnifyingGlass,
} from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { FaIcon } from '@ifixit/icons';
import type { Menu } from '@ifixit/menu';
import {
   CartDrawer,
   HeaderBar,
   Header as HeaderBase,
   HeaderCloseHiddenBarButton,
   HeaderHiddenBar,
   HeaderNavigationToggleButton,
   HeaderOpenHiddenBarButton,
   HeaderPrimaryNavigation,
   HeaderSearchForm,
   HeaderSecondaryNavigation,
   NavigationAccordion,
   NavigationAccordionButton,
   NavigationAccordionItem,
   NavigationAccordionLink,
   NavigationAccordionPanel,
   NavigationAccordionSubItem,
   NavigationDrawer,
   NavigationMenu,
   NavigationMenuButton,
   NavigationMenuItem,
   NavigationSubmenu,
   NavigationSubmenuDescription,
   NavigationSubmenuDivider,
   NavigationSubmenuItem,
   NavigationSubmenuLink,
   NavigationSubmenuName,
   NoUserLink,
   SearchInput,
   UserMenu,
   UserMenuButton,
   UserMenuHeading,
   UserMenuLink,
   Wordmark,
   WordmarkLink,
   useHeaderContext,
} from '@ifixit/ui';
import { usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react';

export interface HeaderProps {
   menu: Menu | null;
}

export function Header({ menu }: React.PropsWithChildren<HeaderProps>) {
   const mobileSearchInputRef = React.useRef<HTMLInputElement>(null);

   return (
      <HeaderBase>
         <HeaderHiddenBar>
            <HeaderSearchForm.Mobile>
               <SearchInput ref={mobileSearchInputRef} />
            </HeaderSearchForm.Mobile>
            <HeaderCloseHiddenBarButton>Cancel</HeaderCloseHiddenBarButton>
         </HeaderHiddenBar>
         <HeaderBar>
            <HeaderPrimaryNavigation>
               <HeaderNavigationToggleButton aria-label="Open navigation menu" />
               <WordmarkLink href="/" aria-label="Go to homepage" pr="4">
                  <Wordmark />
               </WordmarkLink>
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
                                                   <SmartLink
                                                      as={NavigationSubmenuLink}
                                                      href={subitem.url}
                                                      behaviour={
                                                         subitem.url ===
                                                         '/Store'
                                                            ? 'reload'
                                                            : 'auto'
                                                      }
                                                      disclosureIcon={
                                                         <FaIcon
                                                            icon={faArrowRight}
                                                            h="5"
                                                            transform="translateY(-50%)"
                                                            color="white"
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
                                                   </SmartLink>
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
            </HeaderPrimaryNavigation>
            <HeaderSearchForm.Desktop>
               <SearchInput />
            </HeaderSearchForm.Desktop>
            <HeaderSecondaryNavigation>
               <HeaderOpenHiddenBarButton
                  aria-label="Search database"
                  _hover={{ opacity: '0.7' }}
                  transition="0.3s"
                  _active={{
                     bg: 'gray.900',
                  }}
                  icon={
                     <FaIcon icon={faMagnifyingGlass} h="22px" color="white" />
                  }
                  onClick={() => {
                     mobileSearchInputRef.current?.focus();
                  }}
               />
               <CartDrawer />
               <HeaderUserMenu />
            </HeaderSecondaryNavigation>
         </HeaderBar>
         {menu && <LayoutNavigationDrawer menu={menu} />}
      </HeaderBase>
   );
}

interface LayoutNavigationDrawerProps {
   menu: Menu;
}

function LayoutNavigationDrawer({ menu }: LayoutNavigationDrawerProps) {
   const headerContext = useHeaderContext();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   React.useEffect(() => {
      headerContext.navigation.close();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pathname, searchParams]);

   return (
      <NavigationDrawer>
         <DrawerCloseButton />
         <WordmarkLink href="/" aria-label="Go to homepage" mb="8">
            <Wordmark />
         </WordmarkLink>
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
                              {item.submenu.items.map((subitem, subIndex) => {
                                 if (subitem.type !== 'link') {
                                    return null;
                                 }
                                 return (
                                    <NavigationAccordionSubItem key={subIndex}>
                                       <SmartLink
                                          as={NavigationAccordionLink}
                                          href={subitem.url}
                                       >
                                          {subitem.name}
                                       </SmartLink>
                                    </NavigationAccordionSubItem>
                                 );
                              })}
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
   );
}

function HeaderUserMenu() {
   const user = useAuthenticatedUser();
   const appContext = useAppContext();

   if (user.data == null) {
      return <NoUserLink href={`${appContext.ifixitOrigin}/Login`} />;
   }

   return (
      <UserMenu user={user.data}>
         <UserMenuButton aria-label="Open user menu" />
         <Portal>
            <MenuList>
               <UserMenuHeading />
               <MenuDivider />
               <MenuGroup>
                  <UserMenuLink
                     href={`${appContext.ifixitOrigin}/User/Notifications/${user.data.id}/${user.data.username}`}
                  >
                     Notifications
                  </UserMenuLink>
                  <UserMenuLink
                     href={`${appContext.ifixitOrigin}/User/${user.data.id}/${user.data.username}`}
                  >
                     View Profile
                  </UserMenuLink>
                  {user.data.teams.length > 0 && (
                     <UserMenuLink href={`${appContext.ifixitOrigin}/Team`}>
                        My Team
                     </UserMenuLink>
                  )}
                  <UserMenuLink href={`${appContext.ifixitOrigin}/User/Orders`}>
                     Orders
                  </UserMenuLink>
                  {user.data.links.manage && (
                     <UserMenuLink
                        href={`${appContext.ifixitOrigin}${user.data.links.manage}`}
                     >
                        Manage
                     </UserMenuLink>
                  )}
               </MenuGroup>
               <MenuDivider />
               <MenuGroup>
                  <UserMenuLink
                     href={`${appContext.ifixitOrigin}/Guide/logout`}
                  >
                     Log Out
                  </UserMenuLink>
               </MenuGroup>
            </MenuList>
         </Portal>
      </UserMenu>
   );
}
