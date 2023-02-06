import { Box, BoxProps, forwardRef, Flex } from '@chakra-ui/react';
import { useTrackedOnClick } from '../hooks/useTrackedOnClick';

export const FooterPartners = forwardRef<BoxProps, 'div'>(
   ({ children, ...otherProps }, ref) => {
      return (
         <Flex
            ref={ref}
            mt="7"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            paddingLeft="4"
            paddingRight="4"
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
            p="4"
            m="6px"
            borderRadius="4px"
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
