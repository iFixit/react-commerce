import { ThemeOverride } from '@chakra-ui/react';
import Alert from './components/alert';
import Badge from './components/badge';
import Button from './components/button';
import IconBadge from './components/icon-badge';
import Pagination from './components/pagination';
import ProductPrice from './components/product-price';
import { breakpoints } from './foundations/breakpoints';
import { colors } from './foundations/colors';
import { fonts } from './foundations/fonts';
import { radii } from './foundations/radii';
import { shadow } from './foundations/shadow';
import { space } from './foundations/space';
import { zIndices } from './foundations/zIndices';
import { styles } from './styles';

export const theme: ThemeOverride = {
   colors,
   breakpoints,
   fonts,
   radii,
   shadows: shadow,
   space,
   styles,
   zIndices,
   components: {
      Pagination,
      Badge,
      Alert,
      Button,
      IconBadge,
      ProductPrice,
   },
};
