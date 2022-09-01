import { Box, BoxProps, forwardRef, SimpleGrid } from '@chakra-ui/react';

export const FooterPartners = forwardRef<BoxProps, 'div'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Box ref={ref} mt={2} p={5} align="center" {...otherProps}>
            <SimpleGrid
               minChildWidth="92px"
               spacing="4"
               // limit to three columns until large breakpoint
               maxW={{ base: '375px', lg: '1024px' }}
            >
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
            h="62px"
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
