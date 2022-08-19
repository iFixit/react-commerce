import {
   Box,
   BoxProps,
   Flex,
   FlexProps,
   forwardRef,
   HStack,
   Icon,
   List,
   ListIcon,
   ListItem,
   ListItemProps,
   ListProps,
   StackProps,
   Text,
   SimpleGridProps,
   SimpleGrid,
   MenuButtonProps,
   MenuButton,
   MenuItemProps,
   MenuItem,
   Link,
   LinkProps,
   Stack,
   DividerProps,
   Divider,
   TextProps,
   FormControlProps,
   FormLabelProps,
   FormControl,
   FormLabel,
   InputProps,
   Input,
   Menu,
   MenuList,
   Button,
   FormErrorMessage,
} from '@chakra-ui/react';
import React from 'react';
import PageContentWrapper from '../misc/PageContentWrapper';
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
import { GlobalSettings } from '@models/global-settings';
import { MenuItemType } from '@models/menu';
import { Store, StoreListItem } from '@models/store';
import { IfixitImage } from '@components/ifixit-image';
import noImageFixie from '@assets/images/no-image-fixie.jpeg';
import { RiCheckFill } from 'react-icons/ri';
import {
   FooterNavigationSection,
   FooterNavigationList,
   FooterNavigationItem,
   FooterNavigationLink,
} from './Navigation';
import { FooterSettingsSection, FooterSettings } from './Settings';
import {
   FooterCopyright,
   FooterLegalSection,
   FooterLegalLink,
   FooterLegalLinkList,
} from './Legal';
import { FooterPartners, FooterPartnerLink } from './Partners';
import { StoreMenuButton, StoreMenuItem } from './StoreMenu';
import { NewsletterForm } from './Newsletter';


export const Footer = forwardRef<FlexProps, 'footer'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Flex
            ref={ref}
            as="footer"
            direction="column"
            bg="black"
            color="white"
            {...otherProps}
         >
            <PageContentWrapper>{children}</PageContentWrapper>
         </Flex>
      );
   }
);

export type FooterLinkProps = StackProps & {
   icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export const FooterLink = forwardRef<FooterLinkProps, 'a'>(
   ({ children, icon, ...otherProps }, ref) => {
      return (
         <HStack
            ref={ref}
            as="a"
            align="center"
            color="gray.300"
            transition="color 300ms"
            _hover={{ color: 'white' }}
            {...otherProps}
         >
            <Text fontSize="sm" lineHeight="1em" fontWeight="semibold">
               {children}
            </Text>
            {icon && <Icon as={icon} boxSize="6" filter="opacity(0.5)" />}
         </HStack>
      );
   }
);

export const FooterDivider = forwardRef<DividerProps, 'hr'>((props, ref) => {
   return <Divider ref={ref} borderColor="gray.700" {...props} />;
});

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
