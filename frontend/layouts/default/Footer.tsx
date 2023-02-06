import { trackInMatomoAndGA } from '@ifixit/analytics';
import { memo } from 'react';
import { Menu, MenuList, HStack } from '@chakra-ui/react';
import {
   FacebookLogo,
   Flag,
   FlagCountryCode,
   Language,
   InstagramLogo,
   RepairOrgLogo,
   TwitterLogo,
   TiktokLogo,
   YoutubeLogo,
} from '@ifixit/icons';
import { MenuItemType } from '@models/menu';
import { ResponsiveImage } from '@ifixit/ui';
import noImageFixie from '@assets/images/no-image-fixie.jpeg';
import { GlobalSettings } from '@models/global-settings';
import { Store, StoreListItem } from '@models/store';
import { NewsletterForm } from './Newsletter';
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
} from '@ifixit/footer';

interface SocialMediaAccounts {
   twitter: string | null;
   tiktok: string | null;
   facebook: string | null;
   instagram: string | null;
   youtube: string | null;
   repairOrg: string | null;
}

interface FooterProps {
   stores: StoreListItem[];
   menu1: Store['footer']['menu1'];
   menu2: Store['footer']['menu2'];
   partners: Store['footer']['partners'];
   bottomMenu: Store['footer']['bottomMenu'];
   socialMediaAccounts: Store['socialMediaAccounts'];
   globalSettings: GlobalSettings;
}

const SocialMediaSection = memo(function SocialMediaSection({
   accounts,
}: {
   accounts: SocialMediaAccounts;
}) {
   if (!accounts) {
      return null;
   }
   return (
      <HStack spacing={4} justify={{ base: 'space-between', sm: 'center' }}>
         {accounts.tiktok && (
            <FooterLink aria-label="TikTok" href={accounts.tiktok} icon={TiktokLogo} />
         )}
         {accounts.facebook && (
            <FooterLink aria-label="Facebook" href={accounts.facebook} icon={FacebookLogo} />
         )}
         {accounts.twitter && (
            <FooterLink aria-label="Twitter" href={accounts.twitter} icon={TwitterLogo} />
         )}
         {accounts.instagram && (
            <FooterLink aria-label="Instagram" href={accounts.instagram} icon={InstagramLogo} />
         )}
         {accounts.youtube && (
            <FooterLink aria-label="YouTube" href={accounts.youtube} icon={YoutubeLogo} />
         )}
         {accounts.repairOrg && (
            <FooterLink
               aria-label="The Repair Association"
               href={accounts.repairOrg}
               icon={RepairOrgLogo}
            />
         )}
      </HStack>
   );
});

export function CartFooter({
   stores,
   menu1,
   menu2,
   partners,
   bottomMenu,
   socialMediaAccounts,
   globalSettings,
}: FooterProps) {
   const { newsletterForm } = globalSettings;
   return (
      <EventTracker value={{ trackClick: trackInMatomoAndGA }}>
         <Footer>
            <FooterNavigationSection>
               <FooterNavigationList>
                  {menu1?.items.map((item, index) => {
                     if (item.type === 'link') {
                        return (
                           <FooterNavigationItem key={index}>
                              <FooterNavigationLink href={item.url}>
                                 {item.name}
                              </FooterNavigationLink>
                           </FooterNavigationItem>
                        );
                     }
                  })}
               </FooterNavigationList>
               <FooterNavigationList>
                  {menu2?.items.map((item, index) => {
                     if (item.type === 'link') {
                        return (
                           <FooterNavigationItem key={index}>
                              <FooterNavigationLink href={item.url}>
                                 {item.name}
                              </FooterNavigationLink>
                           </FooterNavigationItem>
                        );
                     }
                  })}
               </FooterNavigationList>
               <NewsletterForm
                  title={newsletterForm.title}
                  description={newsletterForm.subtitle}
                  subscribeLabel={newsletterForm.callToActionButtonTitle}
                  emailPlaceholder={newsletterForm.inputPlaceholder}
               />
            </FooterNavigationSection>

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
