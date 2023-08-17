'use client';

import {
   Alert,
   AlertIcon,
   AlertTitle,
   Box,
   DrawerCloseButton,
   Flex,
   Icon,
   MenuDivider,
   MenuGroup,
   MenuList,
   Portal,
} from '@chakra-ui/react';
import { GoogleAnalytics, Matomo } from '@components/analytics';
import { SmartLink } from '@components/ui/SmartLink';
import {
   faArrowRight,
   faMagnifyingGlass,
} from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { FaIcon } from '@ifixit/icons';
import { Wordmark20th } from '@assets/svg/files';
import type { Menu } from '@ifixit/menu';
import { ShopifyStorefrontProvider } from '@ifixit/shopify-storefront-client';
import {
   CartDrawer,
   Header,
   HeaderBar,
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
   useHeaderContext,
   UserMenu,
   UserMenuButton,
   UserMenuHeading,
   UserMenuLink,
   WordmarkLink,
} from '@ifixit/ui';
import * as React from 'react';
import { CartFooter } from './Footer';
import { LayoutErrorBoundary } from './LayoutErrorBoundary';
import type { DefaultLayoutProps } from './server';
import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const DefaultLayoutComponent = function ({
   stores,
   currentStore,
   shopifyCredentials,
   globalSettings,
   children,
}: React.PropsWithChildren<DefaultLayoutProps>) {
   const { menu } = currentStore.header;
   const mobileSearchInputRef = React.useRef<HTMLInputElement>(null);
   const { adminMessage } = useAppContext();
   const isAdminUser = useAuthenticatedUser().data?.isAdmin ?? false;

   return (
      <LayoutErrorBoundary>
         <ShopifyStorefrontProvider
            shopDomain={shopifyCredentials.storefrontDomain}
            storefrontAccessToken={shopifyCredentials.storefrontAccessToken}
            apiVersion="2020-01"
         >
            <Box>
               <Flex direction="column" minH="100vh">
                  <Header>
                     <HeaderHiddenBar>
                        <HeaderSearchForm.Mobile>
                           <SearchInput ref={mobileSearchInputRef} />
                        </HeaderSearchForm.Mobile>
                        <HeaderCloseHiddenBarButton>
                           Cancel
                        </HeaderCloseHiddenBarButton>
                     </HeaderHiddenBar>
                     <HeaderBar>
                        <HeaderPrimaryNavigation>
                           <HeaderNavigationToggleButton aria-label="Open navigation menu" />
                           <WordmarkLink
                              href="/"
                              aria-label="Go to homepage"
                              pr="4"
                              title="iFixit turns 20"
                              padding={0}
                           >
                              <Icon
                                 as={Wordmark20th}
                                 width="auto"
                                 height="100%"
                              />
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
                                                         if (
                                                            subitem.type !==
                                                            'link'
                                                         ) {
                                                            return null;
                                                         }
                                                         return (
                                                            <NavigationSubmenuItem
                                                               key={subIndex}
                                                            >
                                                               <SmartLink
                                                                  as={
                                                                     NavigationSubmenuLink
                                                                  }
                                                                  href={
                                                                     subitem.url
                                                                  }
                                                                  behaviour={
                                                                     subitem.url ===
                                                                     '/Store'
                                                                        ? 'reload'
                                                                        : 'auto'
                                                                  }
                                                                  disclosureIcon={
                                                                     <FaIcon
                                                                        icon={
                                                                           faArrowRight
                                                                        }
                                                                        h="5"
                                                                        transform="translateY(-50%)"
                                                                        color="white"
                                                                     />
                                                                  }
                                                               >
                                                                  <NavigationSubmenuName>
                                                                     {
                                                                        subitem.name
                                                                     }
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
                                 <FaIcon
                                    icon={faMagnifyingGlass}
                                    h="22px"
                                    color="white"
                                 />
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
                  </Header>
                  {isAdminUser && adminMessage && (
                     <Alert status="error">
                        <AlertIcon />
                        <AlertTitle>{adminMessage}</AlertTitle>
                     </Alert>
                  )}
                  {children}
                  <CartFooter
                     partners={currentStore.footer.partners}
                     bottomMenu={currentStore.footer.bottomMenu}
                     socialMediaAccounts={currentStore.socialMediaAccounts}
                     menu1={currentStore.footer.menu1}
                     menu2={currentStore.footer.menu2}
                     menu3={currentStore.footer.menu3}
                     stores={stores}
                     globalSettings={globalSettings}
                  />
               </Flex>
            </Box>
            <Suspense>
               <Matomo />
               <GoogleAnalytics />
            </Suspense>
         </ShopifyStorefrontProvider>
      </LayoutErrorBoundary>
   );
};

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
         <WordmarkLink
            href="/"
            aria-label="Go to homepage"
            mb="8"
            title="iFixit turns 20"
            padding={0}
         >
            <Icon as={Wordmark20th} width="auto" height="100%" />
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
      return <NoUserLink href={`${appContext.ifixitOrigin}/login`} />;
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

export const DefaultLayout = DefaultLayoutComponent;
