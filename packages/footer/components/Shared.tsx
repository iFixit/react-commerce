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
import { useTrackedOnClick } from '../hooks/useTrackedOnClick';
import { PageContentWrapper } from './PageContentWrapper';

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
   eventCategory?: string;
   eventAction?: string;
};

export const FooterLink = forwardRef<FooterLinkProps, 'a'>(
   (
      {
         fontSize = 'sm',
         href,
         children,
         icon,
         onClick,
         eventCategory,
         eventAction,
         ...otherProps
      },
      ref
   ) => {
      const trackedOnClick = useTrackedOnClick({
         href,
         onClick,
         eventCategory,
         eventAction,
      });
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
            onClick={trackedOnClick}
            {...otherProps}
         >
            <Text
               fontSize={fontSize}
               lineHeight="1em"
               color="gray.300"
            >
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
