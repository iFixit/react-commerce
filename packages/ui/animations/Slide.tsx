import { Box } from '@chakra-ui/react';
import * as React from 'react';

interface SlideProps {
   show: boolean | undefined | null;
}

export function Slide({
   show = false,
   children,
}: React.PropsWithChildren<SlideProps>) {
   return (
      <Box
         className={show ? 'show' : ''}
         sx={{
            transition: 'transform 0.2s ease-in-out',
            transform: 'translateY(100%)',
            '&.show': {
               transform: 'translateY(0)',
            },
         }}
      >
         {children}
      </Box>
   );
}
