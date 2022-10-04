import { ThemeOverride } from '@chakra-ui/react';

export const styles: ThemeOverride['styles'] = {
   global: {
      html: {
         scrollBehavior: 'smooth',
      },
      body: {
         backgroundColor: 'blueGray.50',
      },
   },
};
