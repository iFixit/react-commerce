import { trackInMatomoAndGA } from '@ifixit/analytics';
import { Menu, MenuList, HStack } from '@chakra-ui/react';
import {
   Flag,
   FlagCountryCode,
   Language,
} from '@ifixit/icons';
import { MenuItemType } from '@models/menu';
import { ResponsiveImage } from '@ifixit/ui';
import noImageFixie from '@assets/images/no-image-fixie.jpeg';
import { GlobalSettings } from '@models/global-settings';
import { Store, StoreListItem, getSupportUrlFromStoreCode } from '@models/store';
import { NewsletterComponent } from './Newsletter';
import { SocialMediaSection } from '@ifixit/footer/components/SocialMedia';
import {
   FooterNavigationItem,
   FooterNavigationList,
   FooterNavigationLink,
   FooterNavigationSection,
   FooterCopyright,
   FooterLegalLink,
   FooterLegalLinkList,
   FooterLegalSection,
   FooterSettings,
   FooterSettingsSection,
   FooterPartners,
   FooterPartnerLink,
   StoreMenuButton,
   StoreMenuItem,
   Footer,
   FooterLink,
   FooterDivider,
   EventTracker,
   NavigationSection,
   getGuideFooterMenus,
} from '@ifixit/footer';
import { CountryCode } from '@lib/shopify-storefront-sdk';

interface FooterProps {
   stores: StoreListItem[];
   menu1: Store['footer']['menu1'];
   menu2: Store['footer']['menu2'];
   partners: Store['footer']['partners'];
   bottomMenu: Store['footer']['bottomMenu'];
   socialMediaAccounts: Store['socialMediaAccounts'];
   globalSettings: GlobalSettings;
}

export function CartFooter({
   stores,
   partners,
   bottomMenu,
   socialMediaAccounts,
   globalSettings,
}: FooterProps) {
   const { newsletterForm } = globalSettings;
   const { menu1, menu2, menu3 } = getGuideFooterMenus(getSupportUrlFromStoreCode(CountryCode.Us));
   return (
      <EventTracker value={{ trackClick: trackInMatomoAndGA }}>
         <Footer>
            <NavigationSection
               menu1={menu1}
               menu2={menu2}
               menu3={menu3}
               newsletterForm={newsletterForm}
            />

            <FooterDivider />

            <FooterSettingsSection>
               <FooterSettings>
                  {stores.length > 0 && (
                     <Menu isLazy lazyBehavior="keepMounted">
                        <StoreMenuButton
                           icon={<Flag code={FlagCountryCode.US} />}
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
                                    icon={
                                       <Flag
                                          code={store.code.toUpperCase() as any}
                                       />
                                    }
                                    name={store.name}
                                    currency={store.currency}
                                 />
                              );
                           })}
                        </MenuList>
                     </Menu>
                  )}
                  <FooterLink
                     href="https://www.ifixit.com/Translate"
                     icon={Language}
                     eventCategory="Translate"
                     eventAction='Translate - Btn "Help Translate iFixit" - Footer - Click'
                  >
                     Help translate
                  </FooterLink>
               </FooterSettings>
               <SocialMediaSection accounts={socialMediaAccounts} />
            </FooterSettingsSection>

            <FooterDivider />

            {partners && (
               <FooterPartners>
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
                                 <ResponsiveImage
                                    layout="fill"
                                    objectFit="contain"
                                    src={partner.image.url}
                                    alt={
                                       partner.image?.alternativeText ||
                                       `${partner.name} logo`
                                    }
                                 />
                              ) : (
                                 <ResponsiveImage
                                    layout="fill"
                                    objectFit="contain"
                                    src={noImageFixie}
                                 />
                              )}
                           </FooterPartnerLink>
                        );
                     }
                  })}
               </FooterPartners>
            )}

            <FooterLegalSection>
               <FooterCopyright />
               <FooterLegalLinkList>
                  {bottomMenu?.items.map((item, index) => {
                     if (item.type === 'link') {
                        return (
                           <FooterLegalLink key={index} href={item.url}>
                              {item.name}
                           </FooterLegalLink>
                        );
                     }
                  })}
               </FooterLegalLinkList>
            </FooterLegalSection>
         </Footer>
      </EventTracker>
   );
}
