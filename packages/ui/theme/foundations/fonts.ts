import type { ThemeOverride } from '@chakra-ui/react';
import primitives from '@core-ds/primitives';

export const fonts: ThemeOverride['fonts'] = {
   body: primitives.fontFamily.sansSystem,
   heading: primitives.fontFamily.sansSystem,
   mono: primitives.fontFamily.monoSystem,
};
