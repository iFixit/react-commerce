import {
   Divider,
   DividerProps,
   Flex,
   FlexProps,
   forwardRef,
   HStack,
   Icon,
   Stack,
   StackProps,
   Text,
} from '@chakra-ui/react';
import React from 'react';
import { PageContentWrapper } from '../../../misc/PageContentWrapper';
import { GlobalSettings } from '@models/global-settings';
import { Store, StoreListItem } from '@models/store';
import { IfixitImage } from '@components/ifixit-image';

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

type FooterLinkProps = StackProps & {
   icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export const FooterLink = forwardRef<FooterLinkProps, 'a'>(
   ({ href, children, icon, ...otherProps }, ref) => {
      return (
         <HStack
            ref={ref}
            as="a"
            align="center"
            color="gray.300"
            transition="color 300ms"
            _hover={{ color: 'white' }}
            href={href}
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

export const FooterBottomLogo = forwardRef<StackProps, 'div'>((props, ref) => {
   return (
      <Stack
         ref={ref}
         direction="column"
         spacing={3}
         pt={8}
         pb={5}
         color="white"
         align="center"
         {...props}
      >
         <IfixitImage
            width="74px"
            height="80px"
            src="https://assets.cdn.ifixit.com/static/images/footer/fist-circle-white.png"
         />
         <Text>Repair is noble</Text>
      </Stack>
   );
});

export interface FooterProps {
   stores: StoreListItem[];
   currentStore: Store;
   globalSettings: GlobalSettings;
}
