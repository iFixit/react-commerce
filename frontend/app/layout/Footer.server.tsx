import noImageFixie from '@assets/images/no-image-fixie.jpeg';
import { DEFAULT_STORE_CODE } from '@config/env';
import { classNames } from '@helpers/ui-helpers';
import { SocialMediaAccounts } from '@ifixit/footer';
import { timeAsync } from '@ifixit/helpers';
import {
   FacebookLogo,
   InstagramLogo,
   Language,
   RepairEULogo,
   RepairOrgLogo,
   TiktokLogo,
   TwitterLogo,
   YoutubeLogo,
} from '@ifixit/icons';
import { Menu as MenuType, MenuItem, MenuItemType } from '@ifixit/menu';
import { ResponsiveImage } from '@ifixit/ui/misc/ResponsiveImage';
import { getGlobalSettings } from '@models/global-settings';
import { findStoreByCode, getStoreList } from '@models/store';
import React, { PropsWithChildren } from 'react';
import { StoreSelector } from './Footer.client';

import { NewsletterComponent, NewsletterFormProps } from './Newsletter.client';
import { NewsletterHeader } from './Newsletter.server';

// Retrieve data via async fetch since this is a server component
async function getData() {
   const [globalSettings, stores, { shopify, ...currentStore }] =
      await timeAsync('layoutProps', () =>
         Promise.all([
            getGlobalSettings(),
            getStoreList(),
            findStoreByCode(DEFAULT_STORE_CODE),
         ])
      );
   return { globalSettings, stores, currentStore };
}

export async function Footer() {
   const { globalSettings, stores, currentStore } = await getData();
   const { newsletterForm } = globalSettings;
   const {
      socialMediaAccounts,
      footer: { menu1, menu2, menu3, partners, bottomMenu },
   } = currentStore;

   return (
      // TODO: insert matomo tracking
      <FooterContainer>
         <NavigationSection
            menu1={menu1}
            menu2={menu2}
            menu3={menu3}
            newsletterForm={newsletterForm}
         />

         <FooterDivider />
         <FooterSettingsSection>
            <FooterSettings>
               <StoreSelector stores={stores} />
               <FooterLink
                  href="https://www.ifixit.com/Translate"
                  Icon={Language}
                  // TODO: unused since no tracking present
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
               {partners.items.map((partner: any) => {
                  if (partner.type === MenuItemType.ImageLink) {
                     return (
                        <FooterPartnerLink
                           key={partner.name}
                           href={partner.url}
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
      </FooterContainer>
   );
}

function FooterContainer({ children }: PropsWithChildren<{}>) {
   return (
      <footer className="bg-[#11161a] py-12">
         <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            {children}
         </div>
      </footer>
   );
}

export type NavigationSectionProps = {
   menu1: MenuType | null;
   menu2: MenuType | null;
   menu3: MenuType | null;
   newsletterForm: NewsletterFormProps;
};

function NavigationSection({
   menu1,
   menu2,
   menu3,
   newsletterForm,
}: NavigationSectionProps) {
   return (
      <div className="flex pb-10 flex-col md:flex-row flex-wrap justify-between">
         <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 p-0 grid-flow-row">
            <FooterNavigationList>
               <NavigationColumn menu={menu1 as MenuType} />
            </FooterNavigationList>
            <FooterNavigationList>
               <NavigationColumn menu={menu2 as MenuType} />
            </FooterNavigationList>
            <FooterNavigationList>
               <NavigationColumn menu={menu3 as MenuType} />
            </FooterNavigationList>
         </div>
         <NewsletterComponent
            newsletterForm={newsletterForm}
            NewsletterHeader={
               <NewsletterHeader
                  title={newsletterForm.title}
                  subtitle={newsletterForm.subtitle}
               />
            }
         />
      </div>
   );
}

function FooterNavigationList({ children }: PropsWithChildren<{}>) {
   return <ul className="pb-4 sm:pb-0 m-0 pl-0">{children}</ul>;
}

function NavigationColumn({ menu }: { menu: MenuType | null }) {
   if (!menu) {
      return null;
   }

   const listItems = menu.items.map((item: MenuItem, index: number) => {
      if (item.type !== 'link') {
         return null;
      }

      return (
         <li key={index} className="py-1 my-1 text-sm text-gray-300">
            <a
               className="text-sm font-normal m-0 p-0 text-gray-300 visited:text-gray-300 hover:text-white hover:no-underline visited:hover:text-white cursor-pointer transition-all duration-300 leading-[21px]"
               href={item.url}
            >
               {item.name}
            </a>
         </li>
      );
   });

   return (
      <>
         <div className="text-sm font-semibold text-white mb-3 mt-0 leading-[21px]">
            {menu.title}
         </div>

         {listItems}
      </>
   );
}

function FooterDivider() {
   return <hr className="border-gray-700" />;
}

function FooterSettingsSection({ children }: PropsWithChildren<{}>) {
   return (
      <div className="py-6 xl:py-5 flex flex-col md:flex-row gap-10 xl:gap-0 justify-between items-center">
         {children}
      </div>
   );
}

function FooterSettings({ children }: PropsWithChildren<{}>) {
   return <div className="flex flex-row gap-6 sm:gap-12">{children}</div>;
}

type FooterLinkProps = {
   href: string;
   Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
   color?: 'white' | 'gray';
   eventCategory?: string;
   eventAction?: string;
};

function FooterLink({
   href,
   children,
   Icon,
   color = 'white',
}: PropsWithChildren<FooterLinkProps>) {
   classNames();
   return (
      <a
         className={classNames(
            'flex flex-row items-center transition-colors duration-300 hover:no-underline hover:text-white  visited:text-white',
            color === 'white' && 'text-white',
            color === 'gray' && 'text-gray-400'
         )}
         href={href}
      >
         {children && (
            <span className="text-sm leading-4 mr-2">{children}</span>
         )}
         {Icon && <Icon className="w-6 h-6" />}
      </a>
   );
}

function SocialMediaSection({
   accounts,
   repairUrl,
}: {
   accounts: SocialMediaAccounts;
   repairUrl?: string;
}) {
   if (!accounts) {
      return null;
   }

   return (
      <div className="flex flex-row gap-6 justify-between sm:justify-center">
         {accounts.tiktok && (
            <FooterLink
               aria-label="TikTok"
               href={accounts.tiktok}
               Icon={TiktokLogo}
               color="gray"
            />
         )}
         {accounts.facebook && (
            <FooterLink
               aria-label="Facebook"
               href={accounts.facebook}
               Icon={FacebookLogo}
               color="gray"
            />
         )}
         {accounts.twitter && (
            <FooterLink
               aria-label="Twitter"
               href={accounts.twitter}
               Icon={TwitterLogo}
               color="gray"
            />
         )}
         {accounts.instagram && (
            <FooterLink
               aria-label="Instagram"
               href={accounts.instagram}
               Icon={InstagramLogo}
               color="gray"
            />
         )}
         {accounts.youtube && (
            <FooterLink
               aria-label="YouTube"
               href={accounts.youtube}
               Icon={YoutubeLogo}
               color="gray"
            />
         )}
         {accounts.repairOrg && (
            <FooterLink
               aria-label="The Repair Association"
               href={accounts.repairOrg}
               Icon={
                  repairUrl && repairUrl.includes('eu')
                     ? RepairEULogo
                     : RepairOrgLogo
               }
               color="gray"
            />
         )}
      </div>
   );
}

function FooterPartners({ children }: PropsWithChildren<{}>) {
   return (
      <div className="flex mt-8 items-center justify-center flex-wrap -ml-3 -mb-3">
         {children}
      </div>
   );
}

function FooterPartnerLink({
   children,
   href,
}: PropsWithChildren<{ href: string }>) {
   return (
      <a
         href={href}
         className="bg-red flex-none order-1 flex-grow-0 bg-gray-800 opacity-50 h-[62px] w-[92px] ml-3 mb-3 p-0 rounded box-border cursor-pointer transition-all duration-400 hover:opacity-70 relative"
      >
         {children}
      </a>
   );
}

function FooterLegalSection({ children }: PropsWithChildren<{}>) {
   return (
      <div className="flex flex-col-reverse md:flex-row gap-5 md:gap-0 mt-6 px-5 sm:px-0 text-gray-400 justify-center items-center font-normal">
         {children}
      </div>
   );
}

export function FooterCopyright() {
   return <div className="text-sm">&copy; iFixit</div>;
}

export function FooterLegalLinkList({ children }: PropsWithChildren<{}>) {
   return (
      <div className="flex text-sm flex-col md:flex-row gap-1.5 md:gap-0">
         <div className="px-1 hidden md:block">—</div>
         {children}
      </div>
   );
}

export function FooterLegalLink({
   children,
   href,
}: PropsWithChildren<{ href: string }>) {
   return (
      <a
         className="items-center text-gray-400 transition-colors duration-300 hover:text-gray-100 hover:no-underline [&:not(:first-child):before:content-[''] md:[&:not(:first-child):before:content-['-']]"
         href={href}
      >
         {children}
      </a>
   );
}
