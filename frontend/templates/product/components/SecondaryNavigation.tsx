import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/react';
import { PageContentWrapper } from '@ifixit/ui';

export function SecondaryNavigation({ children, ...other }: BoxProps) {
   return (
      <Box
         bg={{
            base: 'transparent',
            lg: 'white',
         }}
         borderBottomWidth={{
            base: 0,
            lg: 'thin',
         }}
         borderColor="gray.300"
         {...other}
      >
         <PageContentWrapper>{children}</PageContentWrapper>
      </Box>
   );
}

export function SecondaryNavigationRow({ children, ...props }: FlexProps) {
   return (
      <Flex h="full" w="full" boxSizing="border-box" {...props}>
         {children}
      </Flex>
   );
}
