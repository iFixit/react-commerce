import type { ThemeOverride } from '@chakra-ui/react';
import { borderRadius as primitiveBorderRadius } from '@core-ds/primitives';

export const radii: ThemeOverride['radii'] = {
   sm: primitiveBorderRadius.sm,
   md: primitiveBorderRadius.md,
   lg: primitiveBorderRadius.lg,
   xl: primitiveBorderRadius.xl,
   base: primitiveBorderRadius.md,
   full: primitiveBorderRadius.pill,
};
