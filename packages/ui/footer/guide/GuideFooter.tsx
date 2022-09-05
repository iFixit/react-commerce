import { Spacer } from '@chakra-ui/react';
import { Language } from '@ifixit/icons';
import {
   FooterNavigationItem,
   FooterNavigationList,
   FooterNavigationListHeader,
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
import { FooterPartnersSection } from './components/Partners';
import { StoreMenu } from './components/StoreMenu';
import { NewsletterForm } from './components/Newsletter';
import {
   Footer,
   FooterLink,
   FooterDivider,
   FooterBottomLogo,
   FooterProps,
} from './components/Shared';
import {
   getGuideSocialMediaAccounts,
   getGuideFooterMenus,
   getNewsletterForm,
} from './guideData';
import { FooterSocialMediaSection } from './components/SocialMedia';
import { Menu as MenuType } from '@models/menu';

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
               <FooterNavigationListHeader>
                  {menu1?.title}
               </FooterNavigationListHeader>
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
               <FooterNavigationListHeader>
                  {menu2?.title}
               </FooterNavigationListHeader>
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
               <FooterNavigationListHeader>
                  {menu3?.title}
               </FooterNavigationListHeader>
               {menu3?.items.map((item, index) => {
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
               <StoreMenu stores={stores} />
               <FooterTranslateLink />
            </FooterSettings>

            <Spacer />

            <FooterSocialMediaSection accounts={socialMediaAccounts} />
         </FooterSettingsSection>

         <FooterDivider />

         <FooterBottomSection partners={partners} />

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

const FooterTranslateLink = () => {
   return (
      <FooterLink href="https://www.ifixit.com/Translate" icon={Language}>
         Help translate
      </FooterLink>
   );
};

const FooterBottomSection = ({ partners }: { partners: MenuType | null }) => {
   if (partners) {
      return <FooterPartnersSection partners={partners} />;
   }

   return <FooterBottomLogo />;
};
