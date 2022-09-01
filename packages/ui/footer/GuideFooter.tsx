import { Menu, MenuList } from '@chakra-ui/react';
import {
   FacebookLogo,
   Flag,
   FlagCountryCode,
   Globe,
   InstagramLogo,
   RepairOrgLogo,
   TwitterLogo,
   YoutubeLogo,
} from '@ifixit/icons';
import { MenuItemType } from '@models/menu';
import { IfixitImage } from '@components/ifixit-image';
import noImageFixie from '@assets/images/no-image-fixie.jpeg';
import {
   FooterNavigationItem,
   FooterNavigationList,
   FooterNavigationLink,
   FooterNavigationSection,
} from './components/Navigation';
import { FooterSettings, FooterSettingsSection } from './components/Settings';
import {
   FooterCopyright,
   FooterLegalLink,
   FooterLegalLinkList,
   FooterLegalSection,
} from './components/Legal';
import { FooterPartners, FooterPartnerLink } from './components/Partners';
import { StoreMenuButton, StoreMenuItem } from './components/StoreMenu';
import { NewsletterForm } from './components/Newsletter';
import {
   Footer,
   FooterLink,
   FooterDivider,
   FooterProps,
} from './components/Shared';
import {
   getGuideSocialMediaAccounts,
   getGuideFooterMenus,
   getNewsletterForm,
} from './guideData';

export function GuideFooter({
   stores,
   currentStore,
   globalSettings,
}: FooterProps) {
   // For each of these variables, we need to check if we have a currentStore (Cart page)
   // If we don't have a currentStore, we are on a guide page and should use default values
   const socialMediaAccounts = currentStore?.socialMediaAccounts
      ? currentStore.socialMediaAccounts
      : getGuideSocialMediaAccounts();
   const footer = currentStore?.footer ? currentStore.footer : null;
   const { menu1, menu2, menu3, partners, bottomMenu } = footer
      ? footer
      : getGuideFooterMenus();
   const newsletterForm = globalSettings?.newsletterForm
      ? globalSettings.newsletterForm
      : getNewsletterForm();

   return (
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
            <FooterNavigationList>
               {socialMediaAccounts.facebook && (
                  <FooterNavigationItem>
                     <FooterNavigationLink
                        href={socialMediaAccounts.facebook}
                        icon={FacebookLogo}
                     >
                        Facebook
                     </FooterNavigationLink>
                  </FooterNavigationItem>
               )}
               {socialMediaAccounts.twitter && (
                  <FooterNavigationItem>
                     <FooterNavigationLink
                        href={socialMediaAccounts.twitter}
                        icon={TwitterLogo}
                     >
                        Twitter
                     </FooterNavigationLink>
                  </FooterNavigationItem>
               )}
               {socialMediaAccounts.instagram && (
                  <FooterNavigationItem>
                     <FooterNavigationLink
                        href={socialMediaAccounts.instagram}
                        icon={InstagramLogo}
                     >
                        Instagram
                     </FooterNavigationLink>
                  </FooterNavigationItem>
               )}
               {socialMediaAccounts.youtube && (
                  <FooterNavigationItem>
                     <FooterNavigationLink
                        href={socialMediaAccounts.youtube}
                        icon={YoutubeLogo}
                     >
                        Youtube
                     </FooterNavigationLink>
                  </FooterNavigationItem>
               )}
               {socialMediaAccounts.repairOrg && (
                  <FooterNavigationItem>
                     <FooterNavigationLink
                        href={socialMediaAccounts.repairOrg}
                        icon={RepairOrgLogo}
                     >
                        Repair.org
                     </FooterNavigationLink>
                  </FooterNavigationItem>
               )}
            </FooterNavigationList>
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
                                 <IfixitImage
                                    layout="fill"
                                    objectFit="contain"
                                    src={partner.image.url}
                                    alt={
                                       partner.image?.alternativeText ||
                                       `${partner.name} logo`
                                    }
                                 />
                              ) : (
                                 <IfixitImage
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
         </FooterNavigationSection>

         <FooterDivider />

         <FooterSettingsSection>
            <FooterSettings>
               {stores.length > 0 && (
                  <Menu isLazy lazyBehavior="keepMounted">
                     <StoreMenuButton icon={<Flag code={FlagCountryCode.US} />}>
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
               <FooterLink href="https://www.ifixit.com/Translate" icon={Globe}>
                  Help translate
               </FooterLink>
            </FooterSettings>
            <NewsletterForm
               title={newsletterForm.title}
               description={newsletterForm.subtitle}
               subscribeLabel={newsletterForm.callToActionButtonTitle}
               emailPlaceholder={newsletterForm.inputPlaceholder}
            />
         </FooterSettingsSection>

         <FooterDivider />

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
   );
}
