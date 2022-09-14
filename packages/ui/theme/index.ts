import { ThemeOverride } from '@chakra-ui/react';
import { colors } from './foundations/colors';
import { breakpoints } from './foundations/breakpoints';
import { fonts } from './foundations/fonts';
import { styles } from './styles';
import Pagination from './components/pagination';
import Alert from './components/alert';

export const theme: ThemeOverride = {
   colors,
   breakpoints,
   fonts,
   styles,
   components: {
      Pagination,
      Alert,
   },
};
