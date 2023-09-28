import type { ThemeOverride } from '@chakra-ui/react';
import { shadow as primitiveShadow } from '@core-ds/primitives';

export const shadow: ThemeOverride['shadow'] = {
   sm: primitiveShadow[0],
   md: primitiveShadow[1],
   lg: primitiveShadow[2],
   xl: primitiveShadow[3],
   '2xl': primitiveShadow[4],
};
