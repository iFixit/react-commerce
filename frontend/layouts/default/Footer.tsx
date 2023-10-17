import noImageFixie from '@assets/images/no-image-fixie.jpeg';
import { Menu, MenuList } from '@chakra-ui/react';
import { trackInPiwikAndGA } from '@ifixit/analytics';
import {
   Footer,
   FooterCopyright,
   FooterDivider,
   FooterLegalLink,
   FooterLegalLinkList,
   FooterLegalSection,
   FooterLink,
   FooterPartnerLink,
   FooterPartners,
   FooterSettings,
   FooterSettingsSection,
   NavigationSection,
   StoreMenuButton,
   StoreMenuItem,
} from '@ifixit/footer';
import { SocialMediaSection } from '@ifixit/footer/components/SocialMedia';
import { Flag, FlagCountryCode, Language } from '@ifixit/icons';
import type { MenuItem } from '@ifixit/menu';
import { MenuItemType } from '@ifixit/menu';
import { EventTracker } from '@ifixit/tracking-hooks';
import { ResponsiveImage } from '@ifixit/ui';
import type { GlobalSettings } from '@models/global-settings';
import type { Store, StoreListItem } from '@models/store';

interface FooterProps {
   stores: StoreListItem[];
   partners: Store['footer']['partners'];
   bottomMenu: Store['footer']['bottomMenu'];
   socialMediaAccounts: Store['socialMediaAccounts'];
   menu1: Store['footer']['menu1'];
   menu2: Store['footer']['menu2'];
   menu3: Store['footer']['menu3'];
   globalSettings: GlobalSettings;
}

export function CartFooter({
   stores,
   partners,
   bottomMenu,
   socialMediaAccounts,
   menu1,
   menu2,
   menu3,
   globalSettings,
}: FooterProps) {
   const { newsletterForm } = globalSettings;
   return (
      <EventTracker value={{ trackClick: trackInPiwikAndGA }}>
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
                           color="white"
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
                  {partners.items.map((partner: MenuItem) => {
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
                                    fill
                                    style={{
                                       objectFit: 'contain',
                                       filter: 'grayscale(100%)',
                                    }}
                                    src={partner.image.url}
                                    alt={
                                       partner.image?.alternativeText ||
                                       `${partner.name} logo`
                                    }
                                 />
                              ) : (
                                 <ResponsiveImage
                                    fill
                                    alt="no-image"
                                    src={noImageFixie}
                                    style={{
                                       objectFit: 'contain',
                                       filter: 'grayscale(100%)',
                                    }}
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
