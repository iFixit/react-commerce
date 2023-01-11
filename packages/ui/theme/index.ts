import { ThemeOverride } from '@chakra-ui/react';
import Alert from './components/alert';
import Badge from './components/badge';
import Pagination from './components/pagination';
import { breakpoints } from './foundations/breakpoints';
import { colors } from './foundations/colors';
import { fonts } from './foundations/fonts';
import { styles } from './styles';
import { fontSizes } from './foundations/fontSizes';

export const theme: ThemeOverride = {
   colors,
   breakpoints,
   fonts,
   fontSizes,
   styles,
   components: {
      Pagination,
      Badge,
      Alert,
   },
};
