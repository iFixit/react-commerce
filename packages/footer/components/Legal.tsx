import {
   Box,
   BoxProps,
   forwardRef,
   Link,
   LinkProps,
   Stack,
   StackProps,
} from '@chakra-ui/react';
import { useTrackedOnClick } from '@ifixit/tracking-hooks';

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
            mt="6"
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
      return (
         <Box ref={ref} fontSize="sm" {...props}>
            &copy; iFixit
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
   const trackedOnClick = useTrackedOnClick(props);
   return (
      <Link
         ref={ref}
         as="a"
         onClick={trackedOnClick}
         align="center"
         color="gray.400"
         transition="color 300ms"
         _hover={{ color: 'gray.100', textDecoration: 'none' }}
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
