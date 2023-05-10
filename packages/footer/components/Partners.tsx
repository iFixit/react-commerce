import { Box, forwardRef, Flex } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';
import { useTrackedOnClick } from '@ifixit/tracking-hooks';

export const FooterPartners = forwardRef<BoxProps, 'div'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Flex
            ref={ref}
            mt="8"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            ml="-3"
            mb="-3"
            {...otherProps}
         >
            {children}
         </Flex>
      );
   }
);

export const FooterPartnerLink = forwardRef<BoxProps, 'a'>(
   ({ children, ...otherProps }, ref) => {
      const trackedOnClick = useTrackedOnClick(otherProps);
      return (
         <Box
            ref={ref}
            as="a"
            onClick={trackedOnClick}
            flex="none"
            order="1"
            flexGrow="0"
            bg="gray.800"
            opacity="0.5"
            h="62px"
            w="92px"
            ml="3"
            mb="3"
            p="4"
            borderRadius="base"
            boxSizing="border-box"
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
