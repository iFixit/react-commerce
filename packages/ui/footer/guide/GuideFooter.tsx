import { FooterNavigationSection } from './components/Navigation';
import { FooterSettingsSection } from './components/Settings';
import { FooterLegalSection } from './components/Legal';
import { FooterPartnersSection } from './components/Partners';
import {
   Footer,
   FooterDivider,
   FooterBottomLogo,
   FooterProps,
} from './components/Shared';
import {
   getGuideSocialMediaAccounts,
   getGuideFooterMenus,
   getNewsletterForm,
} from './guideData';
import { Menu } from '@models/menu';

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
         <FooterNavigationSection
            menu1={menu1}
            menu2={menu2}
            menu3={menu3}
            newsletterForm={newsletterForm}
         />

         <FooterDivider />

         <FooterSettingsSection
            stores={stores}
            accounts={socialMediaAccounts}
         />

         <FooterDivider />

         <FooterBottomSection partners={partners} />

         <FooterLegalSection bottomMenu={bottomMenu} />
      </Footer>
   );
}

const FooterBottomSection = ({ partners }: { partners: Menu | null }) => {
   if (partners) {
      return <FooterPartnersSection partners={partners} />;
   }

   return <FooterBottomLogo />;
};
