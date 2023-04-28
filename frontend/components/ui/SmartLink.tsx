import { Box, BoxProps as ChakraBoxProps, forwardRef } from '@chakra-ui/react';
import NextLink, { LinkProps } from 'next/link';

type SmartLinkProps = Pick<LinkProps, 'legacyBehavior'> &
   ChakraBoxProps & {
      href: string;
      behaviour?: LinkBehavior;
   };

type LinkBehavior = 'auto' | 'reload' | 'fast';

export const SmartLink = forwardRef<SmartLinkProps, 'a'>(
   ({ href, children, legacyBehavior, behaviour = 'auto', ...props }, ref) => {
      const isAbsoluteURL = /^(?:[a-z]+:)?\/\//i.test(href);
      const shouldReload =
         (isAbsoluteURL && behaviour === 'auto') || behaviour === 'reload';

      if (shouldReload) {
         return (
            <Box ref={ref} as="a" href={href} {...props}>
               {children}
            </Box>
         );
      }

      return (
         <NextLink
            ref={ref}
            href={href}
            passHref
            legacyBehavior={legacyBehavior}
         >
            <Box as="a" {...props}>
               {children}
            </Box>
         </NextLink>
      );
   }
);
