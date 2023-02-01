import { ThemeOverride } from '@chakra-ui/react';
import Alert from './components/alert';
import Badge from './components/badge';
import Button from './components/button';
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
      Alert,
      Button,
   },
};
