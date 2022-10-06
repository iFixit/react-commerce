import {
   Divider,
   DividerProps,
   Flex,
   FlexProps,
   forwardRef,
   HStack,
   Icon,
   StackProps,
   Text,
} from '@chakra-ui/react';
import React from 'react';
import { PageContentWrapper } from '../../../misc/PageContentWrapper';

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
   ({ fontSize = 'sm', href, children, icon, ...otherProps }, ref) => {
      return (
         <HStack
            ref={ref}
            as="a"
            align="center"
            color="gray.300"
            transition="color 300ms"
            _visited={{ color: 'gray.300' }}
            _hover={{ color: 'white', textDecoration: 'none' }}
            href={href}
            {...otherProps}
         >
            <Text fontSize={fontSize} lineHeight="1em" fontWeight="semibold">
               {children}
            </Text>
            {icon && <Icon as={icon} boxSize="8" filter="opacity(0.5)" />}
         </HStack>
      );
   }
);

export const FooterDivider = forwardRef<DividerProps, 'hr'>((props, ref) => {
   return <Divider ref={ref} borderColor="gray.700" {...props} />;
});
