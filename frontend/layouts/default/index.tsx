import {
   Box,
   DrawerCloseButton,
   Flex,
   MenuDivider,
   MenuGroup,
   MenuList,
   Portal,
} from '@chakra-ui/react';
import { GoogleAnalytics, Matomo } from '@components/analytics';
import {
   faArrowRight,
   faMagnifyingGlass,
} from '@fortawesome/pro-solid-svg-icons';
import { useAppContext } from '@ifixit/app';
import { useAuthenticatedUser } from '@ifixit/auth-sdk';
import { FaIcon } from '@ifixit/icons';
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
   Wordmark,
   WordmarkLink,
} from '@ifixit/ui';
import { Menu } from '@models/menu';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import type { DefaultLayoutProps } from './server';
import { CartFooter } from './Footer';

export function DefaultLayout({
   stores,
   currentStore,
   shopifyCredentials,
   globalSettings,
   children,
}: React.PropsWithChildren<DefaultLayoutProps>) {
   const { menu } = currentStore.header;
   const mobileSearchInputRef = React.useRef<HTMLInputElement>(null);

   return (
      <ShopifyStorefrontProvider
         shopDomain={shopifyCredentials.storefrontDomain}
         storefrontAccessToken={shopifyCredentials.storefrontAccessToken}
         apiVersion="2020-01"
      >
         <Box>
            <Head>
               <title>iFixit</title>
               <link
                  rel="apple-touch-icon"
                  sizes="57x57"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-57x57.png"
               />
               <link
                  rel="apple-touch-icon"
                  sizes="60x60"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-60x60.png"
               />
               <link
                  rel="apple-touch-icon"
                  sizes="72x72"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-72x72.png"
               />
               <link
                  rel="apple-touch-icon"
                  sizes="76x76"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-76x76.png"
               />
               <link
                  rel="apple-touch-icon"
                  sizes="114x114"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-114x114.png"
               />
               <link
                  rel="apple-touch-icon"
                  sizes="120x120"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-120x120.png"
               />
               <link
                  rel="apple-touch-icon"
                  sizes="144x144"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-144x144.png"
               />
               <link
                  rel="apple-touch-icon"
                  sizes="152x152"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-152x152.png"
               />
               <link
                  rel="apple-touch-icon"
                  sizes="180x180"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/apple-touch-icon-180x180.png"
               />
               <link
                  rel="icon"
                  type="image/png"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/favicon-32x32.png"
                  sizes="32x32"
               />
               <link
                  rel="icon"
                  type="image/png"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/android-chrome-192x192.png"
                  sizes="192x192"
               />
               <link
                  rel="icon"
                  type="image/png"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/favicon-96x96.png"
                  sizes="96x96"
               />
               <link
                  rel="icon"
                  type="image/png"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/favicon-16x16.png"
                  sizes="16x16"
               />
               <link
                  rel="manifest"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/manifest.json"
               />
               <link
                  rel="mask-icon"
                  href="https://assets.cdn.ifixit.com/static/icons/ifixit/safari-pinned-tab.svg"
                  color="#5bbad5"
               />
            </Head>
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
                                                               href={
                                                                  subitem.url
                                                               }
                                                               passHref
                                                            >
                                                               <NavigationSubmenuLink
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
               {children}
               <CartFooter
                  menu1={currentStore.footer.menu1}
                  menu2={currentStore.footer.menu2}
                  partners={currentStore.footer.partners}
                  bottomMenu={currentStore.footer.bottomMenu}
                  socialMediaAccounts={currentStore.socialMediaAccounts}
                  stores={stores}
                  globalSettings={globalSettings}
               />
            </Flex>
         </Box>
         <Matomo />
         <GoogleAnalytics />
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
