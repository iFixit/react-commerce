import type { ThemeOverride } from '@chakra-ui/react';
import primitives from '@core-ds/primitives';

export const fonts: ThemeOverride['fonts'] = {
   body: primitives.fontFamily.lato,
   heading: primitives.fontFamily.lato,
   mono: primitives.fontFamily.monoSystem,
};
