import {
   Box,
   Divider,
   Menu,
   MenuList,
   SimpleGrid,
   Stack,
} from '@chakra-ui/react';
import {
   CountryCode,
   FacebookLogo,
   FlagIcon,
   Footer as FooterContainer,
   FooterLink,
   FooterMenuItem,
   FooterMenuLink,
   FooterMenuList,
   FooterPartnerLink,
   Globe,
   InstagramLogo,
   RepairOrgLogo,
   StoreCurrency,
   StoreFlagBackdrop,
   StoreMenuButton,
   StoreMenuItem,
   StoreName,
   TwitterLogo,
   YoutubeLogo,
} from '@ifixit/react-components';
import { GlobalSettings } from '@models/global-settings';
import { MenuItemType } from '@models/menu';
import { Store, StoreListItem } from '@models/store';
import Image from 'next/image';
import * as React from 'react';
import { NewsletterForm } from './NewsletterForm';
import noImageFixie from '@assets/images/no-image-fixie.jpeg';

export interface FooterProps {
   stores: StoreListItem[];
   currentStore: Store;
   globalSettings: GlobalSettings;
}

export function Footer({ stores, currentStore, globalSettings }: FooterProps) {
   const { footer, socialMediaAccounts } = currentStore;
   const { menu1, menu2, partners, bottomMenu } = footer;
   const { newsletterForm } = globalSettings;
   return (
      <FooterContainer>
         <NewsletterForm
            title={newsletterForm.title}
            description={newsletterForm.subtitle}
            subscribeLabel={newsletterForm.callToActionButtonTitle}
            emailPlaceholder={newsletterForm.inputPlaceholder}
         />
         <SimpleGrid
            columns={{
               base: 1,
               sm: 3,
               lg: 4,
            }}
            spacing="4"
            px={{
               base: 5,
               sm: 10,
            }}
            py="10"
            autoFlow="row"
         >
            <FooterMenuList>
               {menu1?.items.map((item, index) => {
                  if (item.type === 'link') {
                     return (
                        <FooterMenuItem key={index}>
                           <FooterMenuLink href={item.url}>
                              {item.name}
                           </FooterMenuLink>
                        </FooterMenuItem>
                     );
                  }
               })}
            </FooterMenuList>
            <FooterMenuList>
               {menu2?.items.map((item, index) => {
                  if (item.type === 'link') {
                     return (
                        <FooterMenuItem key={index}>
                           <FooterMenuLink href={item.url}>
                              {item.name}
                           </FooterMenuLink>
                        </FooterMenuItem>
                     );
                  }
               })}
            </FooterMenuList>
            <FooterMenuList>
               {socialMediaAccounts.facebook && (
                  <FooterMenuItem>
                     <FooterMenuLink
                        href={socialMediaAccounts.facebook}
                        icon={FacebookLogo}
                     >
                        Facebook
                     </FooterMenuLink>
                  </FooterMenuItem>
               )}
               {socialMediaAccounts.twitter && (
                  <FooterMenuItem>
                     <FooterMenuLink
                        href={socialMediaAccounts.twitter}
                        icon={TwitterLogo}
                     >
                        Twitter
                     </FooterMenuLink>
                  </FooterMenuItem>
               )}
               {socialMediaAccounts.instagram && (
                  <FooterMenuItem>
                     <FooterMenuLink
                        href={socialMediaAccounts.instagram}
                        icon={InstagramLogo}
                     >
                        Instagram
                     </FooterMenuLink>
                  </FooterMenuItem>
               )}
               {socialMediaAccounts.youtube && (
                  <FooterMenuItem>
                     <FooterMenuLink
                        href={socialMediaAccounts.youtube}
                        icon={YoutubeLogo}
                     >
                        Youtube
                     </FooterMenuLink>
                  </FooterMenuItem>
               )}
               {socialMediaAccounts.repairOrg && (
                  <FooterMenuItem>
                     <FooterMenuLink
                        href={socialMediaAccounts.repairOrg}
                        icon={RepairOrgLogo}
                     >
                        Repair.org
                     </FooterMenuLink>
                  </FooterMenuItem>
               )}
            </FooterMenuList>
            {partners && (
               <Box
                  gridColumnEnd={{
                     sm: 'span 3',
                     lg: 'auto',
                  }}
               >
                  <SimpleGrid columns={3} spacing="4">
                     {partners.items.map((partner) => {
                        if (partner.type === MenuItemType.ImageLink) {
                           return (
                              <FooterPartnerLink
                                 key={partner.name}
                                 href={partner.url}
                                 position="relative"
                                 p="0"
                              >
                                 {partner.image?.url ? (
                                    <Image
                                       layout="fill"
                                       objectFit="contain"
                                       src={partner.image.url}
                                       alt={
                                          partner.image?.alternativeText ??
                                          undefined
                                       }
                                    />
                                 ) : (
                                    <Image
                                       layout="fill"
                                       objectFit="contain"
                                       src={noImageFixie}
                                    />
                                 )}
                              </FooterPartnerLink>
                           );
                        }
                     })}
                  </SimpleGrid>
               </Box>
            )}
         </SimpleGrid>
         <Divider borderColor="gray.700" />
         <SimpleGrid
            columns={{
               base: 1,
               lg: 2,
            }}
            py="6"
            px={{
               base: 5,
               sm: 10,
            }}
            spacing={{
               base: 10,
            }}
         >
            <Stack
               direction={{
                  base: 'row',
               }}
               spacing={{
                  base: 2,
                  sm: 12,
               }}
               justify={{
                  base: 'space-between',
                  sm: 'center',
                  lg: 'flex-start',
               }}
            >
               {stores.length > 0 && (
                  <Menu isLazy lazyBehavior="keepMounted">
                     <StoreMenuButton
                        icon={
                           <StoreFlagBackdrop>
                              <FlagIcon code={CountryCode.US} />
                           </StoreFlagBackdrop>
                        }
                     >
                        Region
                     </StoreMenuButton>
                     <MenuList>
                        {stores.map((store) => {
                           return (
                              <StoreMenuItem
                                 key={store.code}
                                 as="a"
                                 href={store.url}
                              >
                                 <FlagIcon
                                    code={store.code.toUpperCase() as any}
                                 />
                                 <StoreName>{store.name}</StoreName>
                                 <StoreCurrency>{store.currency}</StoreCurrency>
                              </StoreMenuItem>
                           );
                        })}
                     </MenuList>
                  </Menu>
               )}
               <FooterLink href="https://www.ifixit.com/Translate" icon={Globe}>
                  Help translate
               </FooterLink>
            </Stack>
            <Stack
               justify={{
                  base: 'flex-start',
                  sm: 'center',
                  lg: 'flex-end',
               }}
               direction={{
                  base: 'column',
                  sm: 'row',
               }}
               spacing={{
                  base: 2,
                  sm: 4,
               }}
            >
               {bottomMenu?.items.map((item, index) => {
                  if (item.type === 'link') {
                     return (
                        <React.Fragment key={index}>
                           {index !== 0 && (
                              <Divider
                                 opacity={{
                                    base: 1,
                                    sm: 1,
                                 }}
                                 orientation="vertical"
                                 borderColor="gray.700"
                              />
                           )}
                           <FooterLink href={item.url}>{item.name}</FooterLink>
                        </React.Fragment>
                     );
                  }
               })}
            </Stack>
         </SimpleGrid>
      </FooterContainer>
   );
}
