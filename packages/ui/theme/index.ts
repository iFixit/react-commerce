import { ThemeOverride } from '@chakra-ui/react';
import Badge from './components/badge';
import Pagination from './components/pagination';
import { breakpoints } from './foundations/breakpoints';
import { colors } from './foundations/colors';
import { fonts } from './foundations/fonts';
import { styles } from './styles';

export const theme: ThemeOverride = {
   colors,
   breakpoints,
   fonts,
   styles,
   components: {
      Pagination,
      Badge,
   },
};
