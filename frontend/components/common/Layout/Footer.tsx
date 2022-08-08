import noImageFixie from '@assets/images/no-image-fixie.jpeg';
import {
   Button,
   FormErrorMessage,
   HStack,
   Icon,
   Menu,
   MenuList,
   position,
   Text,
} from '@chakra-ui/react';
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
import {
   SubscriptionStatus,
   useSubscribeToNewsletter,
} from '@ifixit/newsletter-sdk';
import {
   Footer,
   FooterCopyright,
   FooterDivider,
   FooterLegalLink,
   FooterLegalLinkList,
   FooterLegalSection,
   FooterLink,
   FooterNavigationItem,
   FooterNavigationLink,
   FooterNavigationList,
   FooterNavigationSection,
   FooterNewsletter,
   FooterNewsletterCopy,
   FooterNewsletterDescription,
   FooterNewsletterEmailInput,
   FooterNewsletterEmailLabel,
   FooterNewsletterForm,
   FooterNewsletterFormControl,
   FooterNewsletterTitle,
   FooterPartnerLink,
   FooterPartners,
   FooterSettings,
   FooterSettingsSection,
   StoreMenuButton,
   StoreMenuItem,
} from '@ifixit/ui';
import { GlobalSettings } from '@models/global-settings';
import { MenuItemType } from '@models/menu';
import { Store, StoreListItem } from '@models/store';
import { IfixitImage } from '@components/ifixit-image';
import * as React from 'react';
import { RiCheckFill } from 'react-icons/ri';

export interface FooterProps {
   stores: StoreListItem[];
   currentStore: Store;
   globalSettings: GlobalSettings;
}

export function LayoutFooter({
   stores,
   currentStore,
   globalSettings,
}: FooterProps) {
   const { footer, socialMediaAccounts } = currentStore;
   const { menu1, menu2, partners, bottomMenu } = footer;
   const { newsletterForm } = globalSettings;
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

export interface NewsletterFormProps {
   title: string;
   description: string;
   emailPlaceholder?: string;
   subscribeLabel: string;
}

function NewsletterForm({
   title,
   description,
   emailPlaceholder,
   subscribeLabel,
}: NewsletterFormProps) {
   const inputRef = React.useRef<HTMLInputElement>(null);
   const [subscription, subscribe] = useSubscribeToNewsletter();

   const onSubscribe = React.useCallback(
      async (event: React.FormEvent<HTMLDivElement>) => {
         event.preventDefault();
         if (inputRef.current) {
            const email = inputRef.current.value;
            subscribe(email);
         }
      },
      [subscribe]
   );

   const isSubscribed = subscription.status === SubscriptionStatus.Subscribed;

   return (
      <FooterNewsletter>
         <FooterNewsletterCopy>
            <FooterNewsletterTitle>{title}</FooterNewsletterTitle>
            <FooterNewsletterDescription>
               {description}
            </FooterNewsletterDescription>
         </FooterNewsletterCopy>
         <FooterNewsletterForm
            onSubmit={onSubscribe}
            direction={{ base: subscribeDirection, xl: 'row' }}
         >
            <FooterNewsletterFormControl isInvalid={subscription.error != null}>
               <FooterNewsletterEmailLabel>
                  Enter your email
               </FooterNewsletterEmailLabel>
               <FooterNewsletterEmailInput
                  ref={inputRef}
                  disabled={subscription.status !== SubscriptionStatus.Idle}
                  placeholder={emailPlaceholder}
                  hidden={subscription.status === SubscriptionStatus.Subscribed}
               />
               {subscription.status === SubscriptionStatus.Subscribed && (
                  <Text align="center">
                     <Icon as={RiCheckFill} boxSize="5" mb="-5px" />
                     Subscribed!
                  </Text>
               )}
               <FormErrorMessage>{subscription.error}</FormErrorMessage>
            </FooterNewsletterFormControl>
            <Button
               type="submit"
               height={
                  subscription.status === SubscriptionStatus.Subscribed
                     ? 0
                     : '40px'
               }
               isLoading={
                  subscription.status === SubscriptionStatus.Subscribing
               }
               disabled={subscription.status !== SubscriptionStatus.Idle}
               colorScheme="brand"
               visibility={
                  subscription.status === SubscriptionStatus.Subscribed
                     ? 'hidden'
                     : undefined
               }
            >
               {subscription.status !== SubscriptionStatus.Subscribed
                  ? subscribeLabel
                  : 'Subscribe'}
            </Button>
         </FooterNewsletterForm>
      </FooterNewsletter>
   );
}
