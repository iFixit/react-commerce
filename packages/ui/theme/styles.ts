import { ThemeOverride } from '@chakra-ui/react';

export const styles: ThemeOverride['styles'] = {
   global: {
      '*, *::before, &::after': {
         borderColor: 'gray.200', // Overwrite chakra global
      },
      html: {
         scrollBehavior: 'smooth',
      },
      body: {
         backgroundColor: 'blueGray.50',
         fontSize: 'md', // set cascading font-size at body, leave html at 16px to preserve rem
      },
   },
};
