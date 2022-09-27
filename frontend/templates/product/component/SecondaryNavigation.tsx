import { Box, BoxProps } from '@chakra-ui/react';
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
