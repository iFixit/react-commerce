import { Box, BoxProps } from '@chakra-ui/react';
import { Wrapper } from '@ifixit/ui';

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
         <Wrapper>{children}</Wrapper>
      </Box>
   );
}
