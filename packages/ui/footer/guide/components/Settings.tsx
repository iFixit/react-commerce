import { forwardRef, Stack, StackProps } from '@chakra-ui/react';

export const FooterSettingsSection = forwardRef<StackProps, 'div'>(
   (props, ref) => {
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
