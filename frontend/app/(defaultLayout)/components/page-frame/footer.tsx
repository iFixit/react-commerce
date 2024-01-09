import noImageFixie from '@assets/images/no-image-fixie.jpeg';
import { trackInPiwik } from '@ifixit/analytics/piwik/track-event';
import {
   Footer as FooterBase,
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
} from '@ifixit/footer';
import { SocialMediaSection } from '@ifixit/footer/components/SocialMedia';
import { Language } from '@ifixit/icons';
import { MenuItemType } from '@ifixit/menu';
import { EventTracker } from '@ifixit/tracking-hooks';
import { ResponsiveImage } from '@ifixit/ui';
import type { NewsletterFormConfig } from '@models/global-settings';
import type { Store } from '@models/store';

interface FooterProps {
   regionMenu: React.ReactNode;
   partners: Store['footer']['partners'];
   bottomMenu: Store['footer']['bottomMenu'];
   socialMediaAccounts: Store['socialMediaAccounts'];
   menu1: Store['footer']['menu1'];
   menu2: Store['footer']['menu2'];
   menu3: Store['footer']['menu3'];
   newsletterFormConfig: NewsletterFormConfig;
}

export function Footer({
   regionMenu,
   partners,
   bottomMenu,
   socialMediaAccounts,
   menu1,
   menu2,
   menu3,
   newsletterFormConfig,
}: FooterProps) {
   return (
      <EventTracker value={{ trackClick: trackInPiwik }}>
         <FooterBase>
            <NavigationSection
               menu1={menu1}
               menu2={menu2}
               menu3={menu3}
               newsletterForm={newsletterFormConfig}
            />

            <FooterDivider />

            <FooterSettingsSection>
               <FooterSettings>
                  {regionMenu}
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
         </FooterBase>
      </EventTracker>
   );
}
