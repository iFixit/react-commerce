import { ShopifyStorefrontProvider } from '@lib/shopify-storefront-client';
import {
   Box,
   DrawerCloseButton,
   Flex,
   Icon,
   MenuDivider,
   MenuGroup,
   MenuList,
   Portal,
} from '@chakra-ui/react';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import {
   Header,
   HeaderBar,
   HeaderCloseHiddenBarButton,
   HeaderHiddenBar,
   HeaderNavigationToggleButton,
   HeaderNavItemIcon,
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
   useAppContext,
   useHeaderContext,
   UserMenu,
   UserMenuButton,
   UserMenuHeading,
   UserMenuLink,
   Wordmark,
   WordmarkLink,
} from '@ifixit/ui';
import { GlobalSettings } from '@models/global-settings';
import { Menu } from '@models/menu';
import { Store, StoreListItem } from '@models/store';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { RiSearchLine } from 'react-icons/ri';
import { LayoutFooter } from './Footer';

export interface LayoutProps {
   title: string;
   stores: StoreListItem[];
   currentStore: Store;
   globalSettings: GlobalSettings;
}

export function Layout({
   title,
   stores,
   currentStore,
   globalSettings,
   children,
}: React.PropsWithChildren<LayoutProps>) {
   const { menu } = currentStore.header;
   const mobileSearchInputRef = React.useRef<HTMLInputElement>(null);

   return (
      <ShopifyStorefrontProvider
         shopDomain={currentStore.shopify.storefrontDomain}
         storefrontAccessToken={currentStore.shopify.storefrontAccessToken}
         apiVersion="2020-01"
      >
      <Box>
         <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Flex direction="column">
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
                                                   if (
                                                      subitem.type !== 'link'
                                                   ) {
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
                  </HeaderPrimaryNavigation>
                  <HeaderSearchForm.Desktop>
                     <SearchInput />
                  </HeaderSearchForm.Desktop>
                  <HeaderSecondaryNavigation>
                     <HeaderOpenHiddenBarButton
                        aria-label="Search database"
                        icon={<HeaderNavItemIcon as={RiSearchLine} mt="3px" />}
                        onClick={() => {
                           mobileSearchInputRef.current?.focus();
                        }}
                     />
                     <HeaderUserMenu />
                  </HeaderSecondaryNavigation>
               </HeaderBar>
               {menu && <LayoutNavigationDrawer menu={menu} />}
            </Header>
            {children}
            <LayoutFooter
               currentStore={currentStore}
               stores={stores}
               globalSettings={globalSettings}
            />
         </Flex>
      </Box>
      </ShopifyStorefrontProvider>
   );
}

interface LayoutNavigationDrawerProps {
   menu: Menu;
}

function LayoutNavigationDrawer({ menu }: LayoutNavigationDrawerProps) {
   const headerContext = useHeaderContext();
   const router = useRouter();

   React.useEffect(() => {
      headerContext.navigation.close();
   }, [router.asPath]);

   return (
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
                              {item.submenu.items.map((subitem, subIndex) => {
                                 if (subitem.type !== 'link') {
                                    return null;
                                 }
                                 return (
                                    <NavigationAccordionSubItem key={subIndex}>
                                       <NextLink href={subitem.url} passHref>
                                          <NavigationAccordionLink>
                                             {subitem.name}
                                          </NavigationAccordionLink>
                                       </NextLink>
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
                  <UserMenuLink href={`${appContext.ifixitOrigin}/User/Orders`}>
                     Orders
                  </UserMenuLink>
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
