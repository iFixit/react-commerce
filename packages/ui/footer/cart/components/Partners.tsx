import { Box, BoxProps, forwardRef, SimpleGrid } from '@chakra-ui/react';

export const FooterPartners = forwardRef<BoxProps, 'div'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Box
            ref={ref}
            mt={{
               base: 2,
               sm: 6,
               lg: 0,
            }}
            gridColumnEnd={{
               sm: 'span 3',
               lg: 'auto',
            }}
            {...otherProps}
         >
            <SimpleGrid columns={3} spacing="4">
               {children}
            </SimpleGrid>
         </Box>
      );
   }
);

export const FooterPartnerLink = forwardRef<BoxProps, 'a'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Box
            ref={ref}
            as="a"
            bg="gray.800"
            opacity="0.5"
            h="48px"
            p="4"
            borderRadius="md"
            cursor="pointer"
            transition="all 400ms"
            _hover={{
               opacity: '0.7',
            }}
            {...otherProps}
         >
            {children}
         </Box>
      );
   }
);
