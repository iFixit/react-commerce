import {
   Box,
   BoxProps,
   forwardRef,
   Link,
   LinkProps,
   Stack,
   StackProps,
} from '@chakra-ui/react';

export const FooterLegalSection = forwardRef<StackProps, 'div'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Stack
            ref={ref}
            direction={{
               base: 'column-reverse',
               md: 'row',
            }}
            spacing={{
               base: 5,
               md: 0,
            }}
            py="6"
            px={{
               base: 5,
               sm: 0,
            }}
            color="gray.400"
            justify="center"
            align="center"
            {...otherProps}
         >
            {children}
         </Stack>
      );
   }
);

export const FooterCopyright = forwardRef<Omit<BoxProps, 'children'>, 'div'>(
   (props, ref) => {
      const year = new Date().getFullYear();
      return (
         <Box ref={ref} fontSize="sm" {...props}>
            &copy; {year} iFixit
         </Box>
      );
   }
);

export const FooterLegalLinkList = forwardRef<StackProps, 'div'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Stack
            ref={ref}
            fontSize="sm"
            direction={{
               base: 'column',
               md: 'row',
            }}
            spacing={{
               base: 1.5,
               md: 0,
            }}
            {...otherProps}
         >
            <Box
               px="1"
               display={{
                  base: 'none',
                  md: 'block',
               }}
            >
               —
            </Box>
            {children}
         </Stack>
      );
   }
);

export const FooterLegalLink = forwardRef<LinkProps, 'a'>((props, ref) => {
   return (
      <Link
         ref={ref}
         as="a"
         align="center"
         color="gray.400"
         transition="color 300ms"
         _hover={{ color: 'gray.100' }}
         sx={{
            _notFirst: {
               _before: {
                  content: { base: '""', md: '"-"' },
                  color: 'gray.400',
                  px: { base: 0, md: 1 },
               },
            },
         }}
         {...props}
      />
   );
});
