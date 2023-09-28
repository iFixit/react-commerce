import type { ThemeOverride } from '@chakra-ui/react';
import { fontSize as primitiveFontSize } from '@core-ds/primitives';

export const fontSize: ThemeOverride['fontSize'] = {
   sm: primitiveFontSize.sm,
   md: primitiveFontSize.md,
   lg: primitiveFontSize.lg,
   xl: primitiveFontSize.xl,
   '2xl': primitiveFontSize['2xl'],
   '3xl': primitiveFontSize['3xl'],
   '4xl': primitiveFontSize['4xl'],
   '5xl': primitiveFontSize['5xl'],
   '6xl': primitiveFontSize['6xl'],
   '7xl': primitiveFontSize['7xl'],
   '8xl': primitiveFontSize['8xl'],
   '9xl': primitiveFontSize['9xl'],
};
