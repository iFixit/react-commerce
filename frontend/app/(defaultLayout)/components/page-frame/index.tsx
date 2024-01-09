'use client';

import { Box, Flex } from '@chakra-ui/react';
import { AppProviders } from '@components/common/AppProviders';
import { SHOPIFY_STOREFRONT_VERSION } from '@config/env';
import { ShopifyStorefrontProvider } from '@ifixit/shopify-storefront-client';
import type { DefaultLayoutProps } from '@layouts/default/server';
import type { ReactNode } from 'react';
import { AnalyticsScripts } from '../analytics';
import { Footer } from './footer';
import { Header } from './header';

interface PageFrameProps {
   children: ReactNode;
   regionMenu: React.ReactNode;
   layoutData: DefaultLayoutProps;
}

export function PageFrame({
   children,
   regionMenu,
   layoutData,
}: PageFrameProps) {
   const {
      currentStore: { header, footer, socialMediaAccounts },
      shopifyCredentials,
      globalSettings,
   } = layoutData;

   return (
      <AppProviders>
         <ShopifyStorefrontProvider
            shopDomain={shopifyCredentials.storefrontDomain}
            storefrontAccessToken={shopifyCredentials.storefrontAccessToken}
            apiVersion={SHOPIFY_STOREFRONT_VERSION}
         >
            <Box>
               <Flex direction="column" minH="100vh">
                  <Header menu={header.menu} />
                  {children}
                  <Footer
                     partners={footer.partners}
                     bottomMenu={footer.bottomMenu}
                     socialMediaAccounts={socialMediaAccounts}
                     menu1={footer.menu1}
                     menu2={footer.menu2}
                     menu3={footer.menu3}
                     newsletterFormConfig={globalSettings.newsletterForm}
                     regionMenu={regionMenu}
                  />
               </Flex>
            </Box>
         </ShopifyStorefrontProvider>
         <AnalyticsScripts />
      </AppProviders>
   );
}
