import { forwardRef, HStack, Stack, StackProps } from '@chakra-ui/react';

export const FooterSettingsSection = forwardRef<StackProps, 'div'>(
   (props, ref) => {
      return (
         <Stack
            ref={ref}
            py={{
               base: 6,
               xl: 5,
            }}
            direction={{
               base: 'column',
               md: 'row',
            }}
            spacing={{
               base: 10,
               xl: 0,
            }}
            justify="space-between"
            align="center"
            {...props}
         />
      );
   }
);

export const FooterSettings = forwardRef<StackProps, 'div'>((props, ref) => {
   return (
      <HStack
         ref={ref}
         spacing={{
            base: 6,
            sm: 12,
         }}
         {...props}
      />
   );
});
