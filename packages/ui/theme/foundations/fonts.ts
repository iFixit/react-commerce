import type { ThemeOverride } from '@chakra-ui/react';
import { fontFamily as primitiveFontFamily } from '@core-ds/primitives';

export const fonts: ThemeOverride['fonts'] = {
   body: primitiveFontFamily.sansSystem,
   heading: primitiveFontFamily.sansSystem,
   mono: primitiveFontFamily.monoSystem,
};
