import { Box, BoxProps as ChakraBoxProps, forwardRef } from '@chakra-ui/react';
import NextLink from 'next/link';

type SmartLinkProps = ChakraBoxProps & {
   href: string;
   behaviour?: LinkBehavior;
};

type LinkBehavior = 'auto' | 'reload' | 'fast';

export const SmartLink = forwardRef<SmartLinkProps, 'a'>(
   ({ href, children, behaviour = 'auto', ...props }, ref) => {
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
         <NextLink ref={ref} href={href} passHref legacyBehavior>
            <Box as="a" {...props}>
               {children}
            </Box>
         </NextLink>
      );
   }
);
