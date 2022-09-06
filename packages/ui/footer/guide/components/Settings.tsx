import { forwardRef, Stack, StackProps, Spacer } from '@chakra-ui/react';
import { FooterSocialMediaSection } from './SocialMedia';
import { StoreMenu } from './StoreMenu';
import { SocialMediaAccounts } from '@models/store';
import { FooterLink } from './Shared';
import { StoreListItem } from '@models/store';
import { Language } from '@ifixit/icons';

type FooterSettingsProps = StackProps & {
   stores: StoreListItem[] | undefined;
   accounts: SocialMediaAccounts;
};

export const FooterSettingsSection = forwardRef<FooterSettingsProps, 'div'>(
   ({ stores, accounts, ...props }, ref) => {
      return (
         <Stack
            ref={ref}
            py="5"
            px={{
               base: 5,
               md: 0,
            }}
            direction={{
               base: 'column',
               lg: 'row',
            }}
            spacing={{
               base: 3,
               xl: 10,
            }}
            justify="space-between"
            {...props}
         >
            <FooterSettings>
               <StoreMenu stores={stores} />
               <FooterTranslateLink />
            </FooterSettings>

            <Spacer />

            <FooterSocialMediaSection accounts={accounts} />
         </Stack>
      );
   }
);

const FooterTranslateLink = () => {
   return (
      <FooterLink href="https://www.ifixit.com/Translate" icon={Language}>
         Help translate
      </FooterLink>
   );
};

export const FooterSettings = forwardRef<StackProps, 'div'>((props, ref) => {
   return (
      <Stack
         ref={ref}
         direction={{
            base: 'column',
            sm: 'row',
         }}
         justify="center"
         spacing={{
            base: 3,
            sm: 12,
         }}
         {...props}
      />
   );
});
