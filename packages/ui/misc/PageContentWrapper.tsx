import { Box, BoxProps } from '@chakra-ui/react';
import * as React from 'react';

export type PageContentWrapperProps = React.PropsWithChildren<{
   className?: string;
}>;

export function PageContentWrapper(props: BoxProps) {
   return (
      <Box
         w={{ base: 'full', lg: '960px', xl: '1100px' }}
         mx="auto"
         px={{
            base: 0,
            sm: 6,
            lg: 0,
         }}
         {...props}
      />
   );
}
